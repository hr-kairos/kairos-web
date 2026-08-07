import nodemailer from 'nodemailer';
import path from 'path';

// ─── In-Memory Rate Limiter ───
// Tracks submissions per IP. Resets every 15 minutes.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  return false;
}

// Periodically clean up stale entries to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// ─── Input Sanitization ───
// Escapes HTML special characters to prevent XSS injection in email bodies
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ─── Validation Helpers ───
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[+\d\s\-()]{7,20}$/;
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024; // 4MB
const MAX_FIELD_LENGTH = 500; // Max characters per text field

export default async function handler(req, res) {
  // ─── Method Check ───
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ─── Origin Validation ───
  const allowedOrigins = [
    'https://kairosglobalsolutions.vercel.app',
    'https://www.kairosglobalsolutions.com',
    'http://localhost:3000',
  ];
  const origin = req.headers.origin || req.headers.referer || '';
  const isAllowedOrigin = allowedOrigins.some((allowed) => origin.startsWith(allowed));

  if (!isAllowedOrigin && process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Forbidden: Invalid origin.' });
  }

  // ─── Rate Limiting ───
  const clientIp =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: 'Too many submissions. Please try again in 15 minutes.',
    });
  }

  const { name, email, mobile, position, currentLocation, preferredLocation, resume, _honeypot } =
    req.body;

  // ─── Honeypot Check (Anti-Bot) ───
  // If the hidden honeypot field is filled, it's a bot — silently reject
  if (_honeypot) {
    // Return 200 to not reveal detection to the bot
    return res.status(200).json({ success: true, message: 'Inquiries sent successfully.' });
  }

  // ─── Required Fields Validation ───
  if (!name || !email || !mobile || !position || !currentLocation || !preferredLocation) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // ─── Field Length Validation ───
  const textFields = { name, email, mobile, position, currentLocation, preferredLocation };
  for (const [fieldName, value] of Object.entries(textFields)) {
    if (typeof value !== 'string' || value.length > MAX_FIELD_LENGTH) {
      return res.status(400).json({ error: `${fieldName} exceeds maximum length.` });
    }
  }

  // ─── Email Format Validation ───
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Invalid email address format.' });
  }

  // ─── Phone Format Validation ───
  if (!PHONE_REGEX.test(mobile)) {
    return res.status(400).json({ error: 'Invalid mobile number format.' });
  }

  // ─── Resume Validation ───
  if (resume && resume.data) {
    if (!ALLOWED_FILE_TYPES.includes(resume.type)) {
      return res.status(400).json({ error: 'Only PDF, DOC, and DOCX files are allowed.' });
    }
    // Check base64 size (base64 is ~33% larger than raw binary)
    const estimatedBytes = (resume.data.length * 3) / 4;
    if (estimatedBytes > MAX_FILE_SIZE_BYTES) {
      return res.status(400).json({ error: 'File size must be under 4MB.' });
    }
    if (typeof resume.name !== 'string' || resume.name.length > 255) {
      return res.status(400).json({ error: 'Invalid file name.' });
    }
  }

  // ─── Sanitize all user inputs for HTML email rendering ───
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMobile = escapeHtml(mobile);
  const safePosition = escapeHtml(position);
  const safeCurrentLocation = escapeHtml(currentLocation);
  const safePreferredLocation = escapeHtml(preferredLocation);
  const safeResumeName = resume && resume.name ? escapeHtml(resume.name) : '';

  try {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const adminEmail = process.env.EMAIL_TO || 'hr@kairosglobalsolutions.com';

    if (!emailUser || !emailPass) {
      console.error('[API Error] Missing EMAIL_USER or EMAIL_PASS in environment variables.');
      return res.status(500).json({ error: 'Mail transport configuration missing.' });
    }

    // Configure Nodemailer for Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Define attachments array and embed company logo using Content-ID (CID) for Gmail offline rendering
    const attachments = [];

    // Embed the transparent company logo
    const logoPath = path.join(process.cwd(), 'public', 'logo-transparentbg.png');
    attachments.push({
      filename: 'logo-transparentbg.png',
      path: logoPath,
      cid: 'companylogo',
    });

    // Handle resume attachment if present
    if (resume && resume.data) {
      attachments.push({
        filename: safeResumeName || 'resume',
        content: Buffer.from(resume.data, 'base64'),
        contentType: resume.type,
      });
    }

    // 1. Dispatch Notification Email to Kairos Admin Team (HR)
    const adminEmailHtml = `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif; background-color: #F9F7F4; padding: 40px 20px; color: #0F0F0F;">
        <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 20px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 12px 30px rgba(0,0,0,0.06);">
          <!-- Header with Logo -->
          <div style="background: #0F0F0F; padding: 32px 28px; text-align: center;">
            <img src="cid:companylogo" alt="Kairos Logo" style="height: 48px; object-fit: contain; margin-bottom: 12px;" />
            <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 800; margin: 0; letter-spacing: -0.02em;">
              Kairos Global <span style="color: #0891b2;">Solutions</span>
            </h1>
            <p style="color: #9CA3AF; font-size: 13px; margin: 6px 0 0 0; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;">Corporate Talent & Inquiry Alert</p>
          </div>

          <!-- Body -->
          <div style="padding: 36px 32px;">
            <h2 style="font-size: 18px; font-weight: 800; color: #0F0F0F; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #0891b2; padding-bottom: 8px; display: inline-block;">
              Applicant Submission Details
            </h2>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 10px;">
              <tr>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-weight: 600; width: 40%;">Candidate Name</td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #0F0F0F; font-weight: 700;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-weight: 600;">Email Address</td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #0891b2; font-weight: 700;">
                  <a href="mailto:${safeEmail}" style="color: #0891b2; text-decoration: none;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-weight: 600;">Mobile Number</td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #0F0F0F; font-weight: 700;">${safeMobile}</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-weight: 600;">Position Applying For</td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #0F0F0F; font-weight: 700;">${safePosition}</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-weight: 600;">Current Location</td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #0F0F0F;">${safeCurrentLocation}</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-weight: 600;">Preferred Location</td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #0F0F0F; font-weight: 600;">${safePreferredLocation}</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; color: #6B7280; font-weight: 600;">Resume Attached</td>
                <td style="padding: 12px 8px; color: #0F0F0F; font-weight: 700;">${resume && resume.data ? `Yes (${safeResumeName})` : 'No'}</td>
              </tr>
            </table>
          </div>

          <!-- Footer Signature -->
          <div style="background: #F9FAFB; padding: 20px; text-align: center; border-top: 1px solid #F3F4F6; font-size: 12px; color: #9CA3AF;">
            Official Portal Submission • Kairos Global Solutions • Kerala (HQ) • Branches: Chennai, Bangalore, Pune
          </div>
        </div>
      </div>
    `;

    // 2. Dispatch Automatic Executive Confirmation / Auto-Reply Email To Applicant
    const userAutoReplyHtml = `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif; background-color: #F9F7F4; padding: 40px 20px; color: #0F0F0F;">
        <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 20px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 12px 30px rgba(0,0,0,0.06);">
          <!-- Header with Logo -->
          <div style="background: #0F0F0F; padding: 32px 28px; text-align: center;">
            <img src="cid:companylogo" alt="Kairos Logo" style="height: 48px; object-fit: contain; margin-bottom: 12px;" />
            <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 800; margin: 0; letter-spacing: -0.02em;">
              Kairos Global <span style="color: #0891b2;">Solutions</span>
            </h1>
            <p style="color: #9CA3AF; font-size: 13px; margin: 6px 0 0 0; font-weight: 500; letter-spacing: 0.05em;">Enterprise Consulting & Human Capital</p>
          </div>

          <!-- Body -->
          <div style="padding: 36px 32px;">
            <h2 style="font-size: 20px; font-weight: 800; color: #0F0F0F; margin-top: 0; margin-bottom: 16px;">
              Application Received — Thank You, ${safeName}.
            </h2>
            <p style="color: #4B5563; font-size: 15px; line-height: 1.65; margin: 0 0 20px 0;">
              We have successfully received your submission for the position of <strong>${safePosition}</strong>.
            </p>
            <p style="color: #4B5563; font-size: 15px; line-height: 1.65; margin: 0 0 24px 0;">
              Our talent acquisition and executive team is reviewing your profile and will connect with you within <strong>24 business hours</strong>.
            </p>

            <!-- Summary Card -->
            <div style="background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 14px; padding: 20px 24px; margin-bottom: 28px;">
              <h3 style="font-size: 12px; font-weight: 800; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 14px 0;">Submission Receipt</h3>
              <p style="margin: 6px 0; font-size: 14px; color: #1F2937;"><strong>Position Applying For:</strong> ${safePosition}</p>
              <p style="margin: 6px 0; font-size: 14px; color: #1F2937;"><strong>Contact Phone:</strong> ${safeMobile}</p>
              <p style="margin: 6px 0; font-size: 14px; color: #1F2937;"><strong>Current Location:</strong> ${safeCurrentLocation}</p>
              <p style="margin: 6px 0; font-size: 14px; color: #1F2937;"><strong>Preferred Location:</strong> ${safePreferredLocation}</p>
            </div>

            <!-- Follow us on LinkedIn Card -->
            <div style="background: rgba(10, 102, 194, 0.05); border: 1px solid rgba(10, 102, 194, 0.15); border-radius: 14px; padding: 20px; text-align: center; margin-bottom: 28px;">
              <h4 style="margin: 0 0 6px 0; font-size: 15px; color: #0A66C2; font-weight: 800; display: flex; alignItems: center; justifyContent: center; gap: 0.4rem;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn Logo" style="height: 16px; width: 16px; object-fit: contain; vertical-align: middle;" />
                <span>Join Our Professional Network</span>
              </h4>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #4B5563; line-height: 1.55;">
                Follow Kairos Global Solutions on LinkedIn to receive real-time placement alerts, consulting frameworks, and enterprise updates.
              </p>
              <a href="https://www.linkedin.com/company/kairos-global-solutions-official/" target="_blank" style="display: inline-block; background: #0A66C2; color: #FFFFFF; font-weight: 700; font-size: 13px; text-decoration: none; padding: 10px 24px; border-radius: 8px;">
                Follow Us on LinkedIn →
              </a>
            </div>

            <p style="color: #6B7280; font-size: 14px; line-height: 1.6; margin: 0;">
              If you need to update any information, please reply directly to this email or reach us at <a href="mailto:hr@kairosglobalsolutions.com" style="color: #0891b2; font-weight: 600; text-decoration: none;">hr@kairosglobalsolutions.com</a>.
            </p>
          </div>

          <!-- Footer Signature -->
          <div style="background: #F9FAFB; padding: 24px 32px; border-top: 1px solid #F3F4F6; font-size: 13px; color: #6B7280; text-align: center;">
            <p style="margin: 0 0 4px 0; font-weight: 700; color: #0F0F0F;">Kairos Global Solutions</p>
            <p style="margin: 0; color: #9CA3AF;">Headquartered in Kerala, India • Branches: Chennai, Bangalore, Pune</p>
          </div>
        </div>
      </div>
    `;

    // Send Admin Notification (HR)
    await transporter.sendMail({
      from: `"Kairos Portal" <${emailUser}>`,
      to: adminEmail,
      replyTo: email,
      subject: `Application Profile: ${safePosition} - ${safeName}`,
      html: adminEmailHtml,
      attachments: attachments,
    });

    // Send Auto-Reply to Applicant
    await transporter.sendMail({
      from: `"Kairos Global Solutions" <${emailUser}>`,
      to: email,
      subject: `Application Received — Kairos Global Solutions`,
      html: userAutoReplyHtml,
      attachments: attachments, // Include the logo attachment so it renders locally in candidate inbox
    });

    return res.status(200).json({ success: true, message: 'Inquiries sent successfully.' });
  } catch (err) {
    console.error('[API Error] Email dispatch failed:', err.message);
    return res.status(500).json({ error: 'System pipeline distribution fault' });
  }
}
