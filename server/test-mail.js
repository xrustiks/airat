require('dotenv').config();
const nodemailer = require('nodemailer');

async function testMail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    const info = await transporter.sendMail({
      from: `"Test NodeMailer" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,   // отправляем себе
      subject: 'Test Email',
      text: 'If you receive this, App Password works!'
    });

    console.log('Email sent:', info.response);
  } catch (err) {
    console.error('Error sending email:', err);
  }
}

testMail();
