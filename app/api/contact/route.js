import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Create a Nodemailer transporter using Gmail
    // To make this work, you need to generate an App Password in your Google Account:
    // https://myaccount.google.com/apppasswords
    // Add GMAIL_APP_PASSWORD to your .env.local file
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'recodeyy@gmail.com', // Your official email
        pass: process.env.GMAIL_APP_PASSWORD, // Your App Password
      },
    });

    const mailOptions = {
      from: 'recodeyy@gmail.com',
      to: 'recodeyy@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      text: `
        You have received a new message from your website contact form:
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}