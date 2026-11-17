#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

// 1. Load environment variables from backend/.env if available
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

// Read API Key from argument, env variable ROOTFIN_API_KEY or PUBLIC_API_KEY
const apiKeyArg = process.argv[2];
const apiKey = apiKeyArg || process.env.ROOTFIN_API_KEY || process.env.PUBLIC_API_KEY;

const baseUrl = (process.env.ROOTFIN_API_URL || 'https://jewels.brynexapparels.in/api/public').replace(/\/+$/, '');
const endpoint = `${baseUrl}/orders`;

console.log('====================================================');
console.log('       ROOTFIN ERP / PUBLIC ORDERS TEST RUNNER      ');
console.log('====================================================');
console.log(`Endpoint URL : ${endpoint}`);
console.log(`API Key      : ${apiKey ? apiKey.substring(0, 4) + '...' + apiKey.slice(-4) : '(NOT SET)'}`);
console.log('----------------------------------------------------');

if (!apiKey) {
  console.log('⚠️  No API key provided.');
  console.log('   Usage: node backend/scripts/test-rootfin-order.js <YOUR_API_KEY>');
  console.log('   Or set ROOTFIN_API_KEY=your_key in backend/.env\n');
}

const sampleOrderRef = `TEST-WEB-${Date.now().toString().slice(-6)}`;
const testPayload = {
  orderRef: sampleOrderRef,
  customer: 'Test Customer',
  customerPhone: '9876543210',
  paymentReference: `T${Date.now()}`,
  items: [
    {
      sku: 'BRL8/1410',
      quantity: 1,
    },
  ],
};

console.log('Sending Test Payload:');
console.log(JSON.stringify(testPayload, null, 2));
console.log('----------------------------------------------------');

async function runTest() {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey || '',
      },
      body: JSON.stringify(testPayload),
    });

    const status = res.status;
    const text = await res.text();
    let json = null;
    try {
      json = JSON.parse(text);
    } catch {}

    console.log(`HTTP Status: ${status}`);
    console.log('Response:');
    if (json) {
      console.log(JSON.stringify(json, null, 2));
    } else {
      console.log(text);
    }
    console.log('----------------------------------------------------');

    if (status === 201) {
      console.log('✅ SUCCESS (201): Order created in Rootfin!');
      console.log('   - Sales invoice generated');
      console.log('   - Warehouse stock reduced for SKU BRL8/1410');
      console.log('   - Financial transaction posted');
    } else if (status === 200) {
      console.log('ℹ️  DUPLICATE (200): Invoice already exists for this orderRef (Idempotent).');
    } else if (status === 409) {
      console.log('⚠️  STOCK CONFLICT (409): SKU stock is insufficient or inactive in Rootfin.');
    } else if (status === 503) {
      console.log('❌ 503 SERVICE UNAVAILABLE: PUBLIC_API_KEY is not configured on the Rootfin server or refused.');
    } else {
      console.log(`⚠️  Received unexpected response code: ${status}`);
    }
  } catch (err) {
    console.error(`❌ Network error connecting to ${endpoint}:`, err.message);
  }
}

runTest();
