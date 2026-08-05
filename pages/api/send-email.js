import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, mobile, position, currentLocation, preferredLocation } = req.body;

  // Basic validation
  if (!name || !email || !mobile || !position || !currentLocation || !preferredLocation) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const adminEmail = process.env.EMAIL_TO || 'hr@kairosglobalsolutions.com';

    if (!emailUser || !emailPass) {
      console.error("Missing Gmail credentials in environment variables.");
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

    // 1. Dispatch Notification Email to Kairos Admin Team (HR)
    const adminEmailHtml = `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif; background-color: #F9F7F4; padding: 40px 20px; color: #0F0F0F;">
        <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 20px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 12px 30px rgba(0,0,0,0.06);">
          <!-- Header with Logo -->
          <div style="background: #0F0F0F; padding: 32px 28px; text-align: center;">
            <img src="https://kairosglobalsolutions.vercel.app/logo-transparentbg.png" alt="Kairos Logo" style="height: 48px; object-fit: contain; margin-bottom: 12px;" />
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
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #0F0F0F; font-weight: 700;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-weight: 600;">Email Address</td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #0891b2; font-weight: 700;">
                  <a href="mailto:${email}" style="color: #0891b2; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-weight: 600;">Mobile Number</td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #0F0F0F; font-weight: 700;">${mobile}</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-weight: 600;">Position Applying For</td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #0F0F0F; font-weight: 700;">${position}</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-weight: 600;">Current Location</td>
                <td style="padding: 12px 8px; border-bottom: 1px solid #F3F4F6; color: #0F0F0F;">${currentLocation}</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; color: #6B7280; font-weight: 600;">Preferred Location</td>
                <td style="padding: 12px 8px; color: #0F0F0F; font-weight: 600;">${preferredLocation}</td>
              </tr>
            </table>
          </div>

          <!-- Footer Signature -->
          <div style="background: #F9FAFB; padding: 20px; text-align: center; border-top: 1px solid #F3F4F6; font-size: 12px; color: #9CA3AF;">
            Official Portal Submission • Kairos Global Solutions • Kerala & Chennai, India
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
            <img src="https://kairosglobalsolutions.vercel.app/logo-transparentbg.png" alt="Kairos Logo" style="height: 48px; object-fit: contain; margin-bottom: 12px;" />
            <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 800; margin: 0; letter-spacing: -0.02em;">
              Kairos Global <span style="color: #0891b2;">Solutions</span>
            </h1>
            <p style="color: #9CA3AF; font-size: 13px; margin: 6px 0 0 0; font-weight: 500; letter-spacing: 0.05em;">Enterprise Consulting & Human Capital</p>
          </div>

          <!-- Body -->
          <div style="padding: 36px 32px;">
            <h2 style="font-size: 20px; font-weight: 800; color: #0F0F0F; margin-top: 0; margin-bottom: 16px;">
              Application Received — Thank You, ${name}.
            </h2>
            <p style="color: #4B5563; font-size: 15px; line-height: 1.65; margin: 0 0 20px 0;">
              We have successfully received your submission for the position of <strong>${position}</strong>.
            </p>
            <p style="color: #4B5563; font-size: 15px; line-height: 1.65; margin: 0 0 24px 0;">
              Our talent acquisition and executive team is reviewing your profile and will connect with you within <strong>24 business hours</strong>.
            </p>

            <!-- Summary Card -->
            <div style="background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 14px; padding: 20px 24px; margin-bottom: 28px;">
              <h3 style="font-size: 12px; font-weight: 800; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 14px 0;">Submission Receipt</h3>
              <p style="margin: 6px 0; font-size: 14px; color: #1F2937;"><strong>Position Applying For:</strong> ${position}</p>
              <p style="margin: 6px 0; font-size: 14px; color: #1F2937;"><strong>Contact Phone:</strong> ${mobile}</p>
              <p style="margin: 6px 0; font-size: 14px; color: #1F2937;"><strong>Current Location:</strong> ${currentLocation}</p>
              <p style="margin: 6px 0; font-size: 14px; color: #1F2937;"><strong>Preferred Location:</strong> ${preferredLocation}</p>
            </div>

            <p style="color: #6B7280; font-size: 14px; line-height: 1.6; margin: 0;">
              If you need to update any information, please reply directly to this email or reach us at <a href="mailto:hr@kairosglobalsolutions.com" style="color: #0891b2; font-weight: 600; text-decoration: none;">hr@kairosglobalsolutions.com</a>.
            </p>
          </div>

          <!-- Footer Signature -->
          <div style="background: #F9FAFB; padding: 24px 32px; border-top: 1px solid #F3F4F6; font-size: 13px; color: #6B7280; text-align: center;">
            <p style="margin: 0 0 4px 0; font-weight: 700; color: #0F0F0F;">Kairos Global Solutions</p>
            <p style="margin: 0; color: #9CA3AF;">Headquartered in Kerala, India with a branch office in Chennai • Enterprise Global Solutions</p>
          </div>
        </div>
      </div>
    `;

    // Send Admin Notification (HR)
    await transporter.sendMail({
      from: `"Kairos Portal" <${emailUser}>`,
      to: adminEmail,
      replyTo: email,
      subject: `Application Profile: ${position} - ${name}`,
      html: adminEmailHtml,
    });

    // Send Auto-Reply to Applicant
    await transporter.sendMail({
      from: `"Kairos Global Solutions" <${emailUser}>`,
      to: email,
      subject: `Application Received — Kairos Global Solutions`,
      html: userAutoReplyHtml,
    });

    return res.status(200).json({ success: true, message: 'Inquiries sent successfully.' });
  } catch (err) {
    console.error("Gmail Nodemailer Error:", err);
    return res.status(500).json({ error: 'System pipeline distribution fault', details: err.message });
  }
}
