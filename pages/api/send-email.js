import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: process.env.EMAIL_TO || 'hr@kairosglobalsolutions.com',
      replyTo: email,
      subject: `Application Profile: ${position} - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nPosition Applying For: ${position}\nCurrent Location: ${currentLocation}\nPreferred Location: ${preferredLocation}`,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return res.status(500).json({ error: 'Resend API failed to dispatch email.', details: error.message });
    }

    console.log("Email sent successfully via Resend:", data.id);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("System Error during transmission:", err);
    return res.status(500).json({ error: 'System pipeline distribution fault', details: err.message });
  }
}
