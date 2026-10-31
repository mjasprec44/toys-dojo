// lib/email.ts
import nodemailer from "nodemailer";

// Setup the transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: SendEmailOptions) {
  try {
    await transporter.sendMail({
      from: `"Toys Dojo" <${process.env.SMTP_FROM_EMAIL}>`, // e.g., "My App <noreply@myapp.com>"
      to,
      subject,
      text,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Failed to send email:", error);
    // Depending on your app's requirements, you might want to throw the error
    // or handle it gracefully. For auth flows, logging is often sufficient.
  }
}
