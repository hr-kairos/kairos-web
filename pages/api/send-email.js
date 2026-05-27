import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, mobile, position, location } = req.body;

  try {
    // Switched to 'service: gmail' for reliable Vercel deployment
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'hr@kairosglobalsolutions.com',
      replyTo: email,
      subject: `Application Profile: ${position} - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nPosition Applying For: ${position}\nLocation: ${location}`,
    });

    console.log("Email sent successfully:", info.messageId);
    res.status(200).json({ success: true });
  } catch (error) {
    // This prints the exact error to your Vercel Runtime Logs for debugging
    console.error("Nodemailer Error:", error);
    res.status(500).json({ error: 'System pipeline distribution fault', details: error.message });
  }
}
