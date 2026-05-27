import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, mobile, position, currentLocation, preferredLocation } = req.body;

  try {
    // Switched back to Gmail for the secure Mailer Bot
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // The new bot @gmail.com address
        pass: process.env.EMAIL_PASS, // The bot's App Password
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'hr@kairosglobalsolutions.com', // Your actual corporate inbox!
      replyTo: email,
      subject: `Application Profile: ${position} - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nPosition Applying For: ${position}\nCurrent Location: ${currentLocation}\nPreferred Location: ${preferredLocation}`,
    });

    console.log("Email sent successfully:", info.messageId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    res.status(500).json({ error: 'System pipeline distribution fault', details: error.message });
  }
}
