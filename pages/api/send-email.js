import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, mobile, position, currentLocation, preferredLocation } = req.body;

  try {
    // Switched to Microsoft Office 365 SMTP Servers
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // Must be false for port 587
      requireTLS: true,
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
      text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nPosition Applying For: ${position}\nCurrent Location: ${currentLocation}\nPreferred Location: ${preferredLocation}`,
    });

    console.log("Email sent successfully:", info.messageId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Nodemailer Microsoft Error:", error);
    res.status(500).json({ error: 'System pipeline distribution fault', details: error.message });
  }
}
