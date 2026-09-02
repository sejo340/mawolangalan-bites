const axios = require('axios');
const moment = require('moment');
const Order = require('../models/Order');

// Get OAuth Token
const getAccessToken = async (req, res, next) => {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`
        }
      }
    );

    req.token = response.data.access_token;
    next();
  } catch (error) {
    console.error('Error getting access token:', error.message);
    res.status(500).json({ error: 'Failed to authenticate with M-Pesa' });
  }
};

// Initiate STK Push
const initiateStkPush = async (req, res) => {
  try {
    const { phoneNumber, amount, orderId } = req.body;

    const timestamp = moment().format('YYYYMMDDHHmmss');
    const passkey = process.env.MPESA_PASSKEY;
    const shortCode = process.env.MPESA_SHORTCODE;

    // Generate password
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    const stkPushData = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: `Mawolangalan-${orderId}`,
      TransactionDesc: 'Payment for Baked Goods'
    };

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      stkPushData,
      {
        headers: {
          Authorization: `Bearer ${req.token}`
        }
      }
    );

    // Update order with payment info
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'pending',
      mpesaResponse: response.data
    });

    res.status(200).json({
      success: true,
      message: 'STK Push initiated successfully',
      data: response.data
    });
  } catch (error) {
    console.error('STK Push Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to initiate payment',
      details: error.response?.data
    });
  }
};

// M-Pesa Callback
const mpesaCallback = async (req, res) => {
  try {
    const callbackData = req.body;
    console.log('M-Pesa Callback:', JSON.stringify(callbackData, null, 2));

    const { Body } = callbackData;
    const { stkCallback } = Body;
    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } = stkCallback;

    if (ResultCode === 0) {
      // Payment successful
      const resultParams = stkCallback.CallbackMetadata.Item;
      const mpesaReceiptNumber = resultParams.find(item => item.Name === 'MpesaReceiptNumber').Value;
      const amount = resultParams.find(item => item.Name === 'Amount').Value;

      // Find order by CheckoutRequestID
      const order = await Order.findOne({ 'mpesaResponse.CheckoutRequestID': CheckoutRequestID });

      if (order) {
        await Order.findByIdAndUpdate(order._id, {
          paymentStatus: 'paid',
          mpesaReceiptNumber: mpesaReceiptNumber,
          orderStatus: 'baking'
        });

        console.log(`✅ Payment confirmed for order ${order._id}. Receipt: ${mpesaReceiptNumber}`);
      }
    } else {
      // Payment failed
      console.log(`❌ Payment failed: ${ResultDesc}`);
    }

    res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (error) {
    console.error('Callback Error:', error);
    res.status(500).json({ error: 'Callback processing failed' });
  }
};

// Check Payment Status
const checkPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      mpesaReceiptNumber: order.mpesaReceiptNumber
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAccessToken,
  initiateStkPush,
  mpesaCallback,
  checkPaymentStatus
};