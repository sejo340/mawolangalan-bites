const express = require('express');
const router = express.Router();
const axios = require('axios');

// 1. Middleware to get OAuth Token from Safaricom
const getAccessToken = async (req, res, next) => {
  const consumerKey = process.env.DARAJA_CONSUMER_KEY;
  const consumerSecret = process.env.DARAJA_CONSUMER_SECRET;
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

  try {
    // Use sandbox URL for testing. Change to 'https://api.safaricom.co.ke' for LIVE
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', 
      { headers: { Authorization: `Basic ${auth}` } }
    );
    req.token = response.data.access_token;
    next();
  } catch (error) {
    console.error("Token Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to authenticate with M-Pesa' });
  }
};

// 2. STK Push Route
router.post('/stkpush', getAccessToken, async (req, res) => {
  const { phoneNumber, amount } = req.body;
  
  // Sandbox Credentials (Change to your real ones when going LIVE)
  const shortCode = process.env.DARAJA_SHORTCODE || '174379'; 
  const passkey = process.env.DARAJA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
  
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
  const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');
  
  // This URL must be your live Render backend URL so Safaricom can send the confirmation back
  const callbackUrl = "https://mawolangalan-backend.onrender.com/api/payments/callback"; 

  const data = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline", // Use "CustomerBuyGoodsOnline" if using a real Till Number in LIVE
    Amount: amount,
    PartyA: phoneNumber, // Customer phone number (2547...)
    PartyB: shortCode,
    PhoneNumber: phoneNumber,
    CallBackURL: callbackUrl,
    AccountReference: "Mawolangalan Bites",
    TransactionDesc: "Payment for order"
  };

  try {
    // Use sandbox URL for testing. Change to 'https://api.safaricom.co.ke' for LIVE
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', 
      data, 
      { headers: { Authorization: `Bearer ${req.token}` } }
    );
    res.json(response.data);
  } catch (error) {
    console.error("STK Push Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to send STK Push' });
  }
});

// 3. Callback Route (Safaricom sends the payment result here)
router.post('/callback', (req, res) => {
  console.log("✅ M-Pesa Callback received:", JSON.stringify(req.body, null, 2));
  
  // In a real app, you would check req.body.Body.stkCallback.ResultCode 
  // and update the order status in your MongoDB database to "Paid"
  
  res.json({ message: "Callback received successfully" });
});

module.exports = router;