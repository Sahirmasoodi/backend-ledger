require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"backend-ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendWelcomeEmail = async (email, name) => {
  const subject = "Welcome to Our Platform!";

  const text = `
    Hi ${name},

    Welcome aboard! We're excited to have you join our community.

    Your account has been successfully created, and you're all set to get started. We look forward to being part of your journey.

    If you have any questions or need assistance, feel free to reach out to our support team.

    Thank you for joining us!

    Best regards,
    The Team
    `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #333; line-height: 1.6;">
      <h2 style="color: #2563eb;">Welcome aboard, ${name}!</h2>

      <p>Hi ${name},</p>

      <p>We're excited to have you join our community.</p>

      <p>Your account has been successfully created, and you're all set to get started. We look forward to being part of your journey.</p>

      <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>

      <p>Thank you for joining us!</p>

      <p style="margin-top: 32px;">
        Best regards,<br />
        <strong>The Team</strong>
      </p>
    </div>
  `;

  await sendEmail(email, subject, text, html);
};

module.exports = sendWelcomeEmail;
