const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/payment-success', (req, res) => {
  const { pp_ResponseCode, pp_TxnRefNo } = req.query;

  if (pp_ResponseCode === '000') {
    res.send(`✅ Payment Successful! Transaction Ref: ${pp_TxnRefNo}`);
  } else {
    res.send(`❌ Payment Failed. Code: ${pp_ResponseCode}`);
  }
});

app.get("/",(req,res)=>{
  res.send("Hello")
}
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
