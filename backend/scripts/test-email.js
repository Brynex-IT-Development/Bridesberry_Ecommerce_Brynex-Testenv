#!/usr/bin/env node
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Load environment variables from backend/.env
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx > -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  });
}

const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = Number(process.env.SMTP_PORT) || 465;
const secure = process.env.SMTP_SECURE !== 'false';
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const fromEmail = process.env.SMTP_FROM_EMAIL || user;
const fromName = process.env.SMTP_FROM_NAME || 'Brides Berry';

console.log('====================================================');
console.log('            SMTP EMAIL CONFIGURATION TEST           ');
console.log('====================================================');
console.log(`Host     : ${host}`);
console.log(`Port     : ${port}`);
console.log(`Secure   : ${secure}`);
console.log(`User     : ${user || '(NOT CONFIGURED IN .env)'}`);
console.log(`From     : "${fromName}" <${fromEmail || '(NONE)'}>`);
console.log('----------------------------------------------------');

if (!user || !pass) {
  console.log('⚠️  SMTP_USER or SMTP_PASS is missing in backend/.env.');
  console.log('Please set SMTP_USER and SMTP_PASS to your email and 16-character App Password.');
  process.exit(1);
}

const targetEmail = process.argv[2] || user;
console.log(`Attempting to send a test email to: ${targetEmail}...`);

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
});

transporter.verify()
  .then(() => {
    console.log('✅ Connection to SMTP server verified successfully!');
    return transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: targetEmail,
      subject: 'Test Verification Code - Brides Berry',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f5;">
          <h2>Brides Berry Email Verification Test</h2>
          <p>Your SMTP App Password is working correctly!</p>
          <p>Sample OTP: <b style="font-size: 24px; color: #7A0424;">849201</b></p>
        </div>
      `,
    });
  })
  .then((info) => {
    console.log('✅ Email successfully sent!');
    console.log(`Message ID: ${info.messageId}`);
    console.log('Check your inbox (or spam folder) for the test message.');
    console.log('====================================================\n');
  })
  .catch((err) => {
    console.error('❌ Failed to send email:');
    console.error(err.message);
    console.log('\nCommon causes:');
    console.log('1. Make sure 2-Step Verification is enabled on your Google account.');
    console.log('2. Make sure you use a 16-character "App Password" (NOT your regular Gmail password).');
    console.log('3. If using Zoho / Outlook / custom domain, verify SMTP_HOST and SMTP_PORT.');
    console.log('====================================================\n');
  });

