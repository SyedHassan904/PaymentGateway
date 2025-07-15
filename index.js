const express = require('express');
const serverless = require('serverless-http');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/hi', (req, res) => {
  res.send('Hello World');
});

app.get('/payment-success', (req, res) => {
  const { pp_ResponseCode, pp_TxnRefNo } = req.query;

  if (pp_ResponseCode === '000') {
    res.send(`✅ Payment Successful! Transaction Ref: ${pp_TxnRefNo}`);
  } else {
    res.send(`❌ Payment Failed. Code: ${pp_ResponseCode}`);
  }
});

// ❌ DO NOT USE app.listen(...) on Vercel!

module.exports = app;
module.exports.handler = serverless(app); // ✅ This is what Vercel calls
