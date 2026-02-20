const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'orcadehub.llp@gmail.com',
    pass: process.env.EMAIL_PASS || 'tdbntufiquosmakm'
  }
});

const sendOTPEmail = async (email, otp, name) => {
  const mailOptions = {
    from: '"Orcadehub LMS" <orcadehub.llp@gmail.com>',
    to: email,
    subject: 'Password Reset OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Password Reset Request</h1>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #333;">Hi ${name || 'User'},</p>
          <p style="font-size: 16px; color: #333;">You requested to reset your password. Use the OTP below to proceed:</p>
          <div style="background-color: #f0f0f0; padding: 20px; text-align: center; margin: 30px 0; border-radius: 8px;">
            <h2 style="color: #667eea; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h2>
          </div>
          <p style="font-size: 14px; color: #666;">This OTP is valid for 10 minutes.</p>
          <p style="font-size: 14px; color: #666;">If you didn't request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">© ${new Date().getFullYear()} Orcadehub Innovations LLP. All rights reserved.</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail };
