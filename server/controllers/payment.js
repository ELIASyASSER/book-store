
// backend/paymob.js
import {v4 as uuidv4} from "uuid"
import axios from "axios";
import  User from "../models/userModel.js"

const API_KEY = process.env.PAYMENT_API_KEY;
const INTEGRATION_ID = process.env.PAYMENT_INTEGRATION_ID;


//plans subscription payment
export const createVisaPayment = async (req, res) => {
  try {
    const {price} = req.body
    const {uid,email,name} = req.firebaseUser
    const amountCents = price; // 100 EGP in cents

    let user = await User.findOne({fireBaseUid:uid})
    if(!user){
      user = await User.create({fireBaseUid:uid,username:name||"no name",email:email})
    }
   // ✅ Prevent duplicate payment if user has active subscription
    if (user.subscription && user.expiration && user.expiration > new Date()) {
      return res.status(400).json({
        message: "You already have an active subscription until " + user.expiration.toDateString(),
      });

    }


    // Step 1: Get Auth Token
    const authRes = await axios.post(process.env.TOKEN_URL, {
      api_key: API_KEY,
    });
    const token = authRes.data.token;

    // Step 2: Create Order
    const merchantOrderId = `${uuidv4()}_${price}_${uid}`

    const orderRes = await axios.post("https://accept.paymob.com/api/ecommerce/orders", {
      auth_token: token,
      delivery_needed: false,
      amount_cents: amountCents,
      currency: "EGP",
      items: [],
      
      merchant_order_id:merchantOrderId,
    });
    const orderId = orderRes.data.id;
    
    // Step 3: Create Payment Key
    const paymentKeyRes = await axios.post("https://accept.paymob.com/api/acceptance/payment_keys", {
      auth_token: token,
      amount_cents: amountCents,
      expiration: 3600,
      order_id: orderId,
      billing_data: {
        apartment: "NA",
        email: email,
        floor: "NA",
        first_name: name,
        last_name: "...",
        street: "NA",
        building: "NA",
        phone_number: "01123456789",
        shipping_method: "NA",
        postal_code: "NA",
        city: "Cairo",
        country: "EG",
        state: "Cairo",
      },
      currency: "EGP",
      integration_id: INTEGRATION_ID,
      redirect_url:"http://localhost:5173/payment-result"
    });
    
    const paymentToken = paymentKeyRes.data.token;
    
    // Return full iframe URL
    const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/922322?payment_token=${paymentToken}`;
    return res.json({ iframeUrl });

  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({ error: "Payment initialization failed" });
  }
};

export const verifyPayment=async(req,res)=>{



const PAYMOB_API_KEY = process.env.PAYMENT_API_KEY;


  const txn = req.query.txn; // ✅ Fix


  try {
    const authRes = await axios.post(process.env.TOKEN_URL, {
      api_key: PAYMOB_API_KEY
    });

    const token = authRes.data.token;

    const txnRes = await axios.get(`https://accept.paymob.com/api/acceptance/transactions/${txn}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const transaction = txnRes.data;
    const orderId =transaction.order.id
    const orderData = await axios.get(`https://accept.paymob.com/api/ecommerce/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const priceFromMerchantId = orderData.data.merchant_order_id
    const expectedPrice = parseInt(priceFromMerchantId.split("_")[1])
    const id = orderData.data.merchant_order_id.split("_")[2]

    if (transaction.success && transaction.amount_cents >= expectedPrice) {

  
  const now = new Date()
  const expiration = new Date(now.setMonth(now.getMonth()+1))
  // const expiration = new Date().getTime()+60000 for testing
  await User.findOneAndUpdate({fireBaseUid:id},{$set:{subscription:true,expiration:expiration}},{new:true})
      return res.status(200).json({ success: true });
    }



    return res.json({ success: false });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, error: "Server error" });
  }
                                                                                                                                                             
}