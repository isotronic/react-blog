import nodemailer from "nodemailer";
import "dotenv/config";

const {
  FROM_ADDRESS,
  EMAIL_PASSWORD,
  SMTP_HOST,
  FRONTEND_URL = "http://localhost:3000/",
} = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: FROM_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
});

export async function sendEmail(resetToken, email) {
  const htmlBody = `<h2>Password reset link</h2><p>Click the password reset link and choose a new password: <a href='${FRONTEND_URL}passwordreset?token=${resetToken}'>Reset your password</a></p>`;
  const plainTextBody = `Your password reset link: ${FRONTEND_URL}password/reset?token=${resetToken}`;

  const mail = await transporter.sendMail({
    from: `'React Blog' <${FROM_ADDRESS}>`,
    to: email,
    subject: "Password Reset Token (Expires in 10 minutes)",
    text: plainTextBody,
    html: htmlBody,
  });
}
