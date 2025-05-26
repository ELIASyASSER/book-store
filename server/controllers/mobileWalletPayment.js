import axios from "axios";
import ordersModel from "../models/ordersModel.js";

const PAYMOB_API_KEY = process.env.PAYMENT_API_KEY;
const WALLET_INTEGRATION_ID = process.env.PAYMENT_WALLET_INTEGRATION_ID;
const TOKEN_URL = process.env.TOKEN_URL || "https://accept.paymob.com/api/auth/tokens";

// Get Auth Token
async function getAuthToken() {
  const res = await axios.post(TOKEN_URL, { api_key: PAYMOB_API_KEY });
  return res.data.token;
}

// Create Order
async function createOrder(token, amountCents) {
  const res = await axios.post(
    "https://accept.paymob.com/api/ecommerce/orders",
    {
      auth_token: token,
      delivery_needed: false,
      amount_cents: amountCents.toString(),
      currency: "EGP",
      items: [],
    }
  );
  return res.data.id;
}

// Generate Payment Key
async function getPaymentKey(token, orderId, amountCents, phoneNumber, addressDetails,orderdEmail) {
  const res = await axios.post("https://accept.paymob.com/api/acceptance/payment_keys", {
    auth_token: token,
    amount_cents: amountCents.toString(),
    order_id: orderId,
    billing_data: {
    first_name:  'john' ,
    last_name:  'doe' ,
    street: 'test.' ,
    building:  'test.' ,
    floor:  'testing.' ,
    apartment: 'example.' ,
    country:  'eg.', 
      ...addressDetails, // spread the addressDetails object here
      phone_number: phoneNumber,
      orderdEmail:orderdEmail
    },
    currency: "EGP",
    integration_id: WALLET_INTEGRATION_ID,
    expiration: 3600,
    items: [],
    redirect_url: "http://localhost:5173/book-payment-result",
  });
  return res.data.token;
}

// Initiate Wallet Payment
async function payWithWallet(paymentToken, walletNumber) {
  const res = await axios.post("https://accept.paymob.com/api/acceptance/payments/pay", {
    source: {
      identifier: walletNumber,
      subtype: "WALLET",
    },
    payment_token: paymentToken,
  });
  return res.data;
}

// Wallet Payment Endpoint
export const walletPay = async (req, res) => {
  try {
    const { amount, addressDetails ,phone,count,orderData,orderdEmail} = req.body;
    // console.log(amount,addressDetails,phone,count,orderData,'test')
    console.log(phone)
    const token = await getAuthToken();
    const orderId = await createOrder(token, amount * 100);
    await ordersModel.create({
      price:Number(amount),
      addressDetails:addressDetails,
      orderData:orderData,
      paymentType:'ONLINE',
      count:count,
      orderdEmail:orderdEmail
      ,
      walletPayId:orderId.toString(),


    })
    const paymentToken = await getPaymentKey(token, orderId, amount * 100, phone, addressDetails);
    const paymentResult = await payWithWallet(paymentToken, phone);
    // console.log(paymentResult,'result')
    // Payment initiated, return redirect_url or payment details
    res.json({ success: true, paymentLink: paymentResult.redirect_url });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Payment failed", details: err.response?.data });
  }
};

// Verify Payment and Save Order
export const verifyBookPayment = async (req, res) => {
  const txn = req.query.txn;
  try {
    // Get auth token
    const token = await getAuthToken();

    // Get transaction details
    const txnRes = await axios.get(`https://accept.paymob.com/api/acceptance/transactions/${txn}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const transaction = txnRes.data;

    if (!transaction.success) {
      return res.status(400).json({ success: false, error: "Payment not successful" });
    }

    // Get order details using order id from transaction
    const orderId = transaction.order.id;
    const orderRes = await axios.get(`https://accept.paymob.com/api/ecommerce/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });



    // Save order info to your DB
    const savedOrder = await ordersModel.updateOne({walletPayId:orderId.toString()},{paymentType:"ONLINE",isPaid:true},{new:true});

    res.json({ success: true, orderId: savedOrder._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
