const express = require('express');
const serverless = require('serverless-http');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/hi', (req, res) => {
  res.send('Hello World');
});

app.all('/payment-success', (req, res) => {
  const data = req.method === 'POST' ? req.body : req.query;

  const { pp_ResponseCode, pp_TxnRefNo } = data;

  if (pp_ResponseCode === '000') {
    res.send(`Payment Successful! Transaction Ref: ${pp_TxnRefNo}`);
  } else {
    res.send(` Payment Failed. Code: ${pp_ResponseCode}`);
  }
});



module.exports = app;
module.exports.handler = serverless(app); //  This is what Vercel calls
