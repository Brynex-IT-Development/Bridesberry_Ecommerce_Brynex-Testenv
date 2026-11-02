#!/usr/bin/env node
const crypto = require('crypto');
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

const merchantId = process.env.PHONEPE_MERCHANT_ID || 'YOUR_MERCHANT_ID';
const saltKey = process.env.PHONEPE_SALT_KEY || 'YOUR_SALT_KEY';
const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';
let baseUrl = process.env.PHONEPE_BASE_URL || 'https://api-preprod.phonepe.com/apis/pg-sandbox';

if (baseUrl.includes('api-preprod.phonepe.com') && !baseUrl.includes('/apis/pg-sandbox')) {
  baseUrl = baseUrl.replace(/\/+$/, '') + '/apis/pg-sandbox';
} else if (baseUrl.includes('api.phonepe.com') && !baseUrl.includes('/apis/hermes')) {
  baseUrl = baseUrl.replace(/\/+$/, '') + '/apis/hermes';
}
baseUrl = baseUrl.replace(/\/+$/, '');

console.log('====================================================');
console.log('       PHONEPE PAYMENT GATEWAY HEALTH CHECK         ');
console.log('====================================================');
console.log(`Merchant ID : ${merchantId}`);
console.log(`Salt Index  : ${saltIndex}`);
console.log(`Base URL    : ${baseUrl}`);
console.log(`Environment : ${baseUrl.includes('api-preprod') ? 'UAT / Sandbox' : 'Production'}`);
console.log('----------------------------------------------------');

if (merchantId === 'YOUR_MERCHANT_ID' || saltKey === 'YOUR_SALT_KEY') {
  console.error('❌ ERROR: PhonePe credentials are not configured in backend/.env');
  process.exit(1);
}

// Construct a test payment payload
const testTxnId = `TEST-${Date.now()}`;
const payload = {
  merchantId,
  merchantTransactionId: testTxnId,
  merchantUserId: 'TEST-USER-1',
  amount: 100, // 100 paise = 1 INR
  redirectUrl: 'http://localhost:3000/payment/success',
  redirectMode: 'REDIRECT',
  callbackUrl: 'http://localhost:7001/api/payments/phonepe/callback',
  paymentInstrument: {
    type: 'PAY_PAGE',
  },
};

const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
const apiEndpoint = '/pg/v1/pay';
const dataToHash = base64Payload + apiEndpoint + saltKey;
const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
const checksum = `${hash}###${saltIndex}`;

console.log('📡 Sending test payment request to PhonePe...');

fetch(`${baseUrl}${apiEndpoint}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'X-VERIFY': checksum,
  },
  body: JSON.stringify({ request: base64Payload }),
})
  .then(async (res) => {
    const text = await res.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }

    console.log(`HTTP Status : ${res.status} ${res.statusText}`);
    if (json && json.success) {
      console.log('✅ SUCCESS! PhonePe is working perfectly!');
      console.log('Payment URL generated:');
      console.log(json.data?.instrumentResponse?.redirectInfo?.url);
    } else {
      console.log('Response Body:');
      console.log(json || text);
      if (res.status === 200 || res.status === 400 || res.status === 401) {
        console.log('\n⚠️ Gateway responded, but verify your Merchant ID and Salt Key match.');
      }
    }
    console.log('====================================================\n');
  })
  .catch((err) => {
    console.error('❌ Network / Connection Error:', err.message);
    console.log('====================================================\n');
  });

