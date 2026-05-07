import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create a Nodemailer transporter using Gmail
    // To make this work, you need to generate an App Password in your Google Account:
    // https://myaccount.google.com/apppasswords
    // Add GMAIL_USER and GMAIL_APP_PASSWORD to your .env.local file
    const gmailUser = process.env.GMAIL_USER || 'recodeyy@gmail.com';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: gmailUser,
      to: gmailUser,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF3D00;">New Message from Recodey.com</h2>
          <hr style="border: 1px solid #eee;" />
          <p><strong>Name:</strong> ${name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'Not provided'}</p>
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${message || 'No message provided'}</p>
          <hr style="border: 1px solid #eee;" />
          <p style="color: #999; font-size: 12px;">Sent from the Recodey website contact form</p>
        </div>
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