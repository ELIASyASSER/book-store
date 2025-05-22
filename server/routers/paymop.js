import express from "express"
import { createVisaPayment, verifyPayment } from "../controllers/payment.js";
import { verifyFirebaseUser } from "../middleware/firebaseAuth.js";
import { checkExpiration } from "../middleware/checkExpiration.js";

const router = express.Router();

router.route("/paymob/planPay").post(verifyFirebaseUser,checkExpiration,createVisaPayment)
router.route("/verify-payment").get(verifyPayment)


export default router