const express = require('express');
const router = express.Router();
const {
  getAccessToken,
  initiateStkPush,
  mpesaCallback,
  checkPaymentStatus
} = require('../controllers/mpesaController');

router.post('/stkpush', getAccessToken, initiateStkPush);
router.post('/callback', mpesaCallback);
router.get('/status/:orderId', checkPaymentStatus);

module.exports = router;