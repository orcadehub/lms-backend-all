const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'orcadehub.llp@gmail.com',
    pass: process.env.EMAIL_PASS || 'tdbntufiquosmakm'
  }
});

const sendOTPEmail = async (email, otp, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'orcadehub.llp@gmail.com',
      to: email,
      subject: 'Password Reset OTP - Orcadehub LMS',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">Password Reset Request</h2>
          <p>Hi ${name},</p>
          <p>You requested to reset your password. Use the OTP below to reset your password:</p>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h1 style="color: #6a0dad; margin: 0; font-size: 32px; letter-spacing: 4px;">${otp}</h1>
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="color: #64748b; font-size: 12px;">© ${new Date().getFullYear()} Orcadehub Innovations LLP. All rights reserved.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};

module.exports = { sendOTPEmail };
