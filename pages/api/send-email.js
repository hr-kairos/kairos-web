import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, mobile, position, address } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, 
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'hr@kairosglobalsolutions.com',
      replyTo: email,
      subject: `Inquiry: ${position} - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nPosition: ${position}\n\nAddress:\n${address}`,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal pipeline fault' });
  }
}