import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, mobile, position, location } = await request.json();

    // Switched to 'service: gmail' which is much more reliable on Vercel
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: { 
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
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
    return NextResponse.json({ success: true });
  } catch (error) {
    // This will print the EXACT error to your Vercel Runtime Logs
    console.error("Nodemailer Error:", error); 
    return NextResponse.json({ error: 'System pipeline distribution fault', details: error.message }, { status: 500 });
  }
}
