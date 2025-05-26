import express from "express"
import {  walletPay, verifyBookPayment } from "../controllers/mobileWalletPayment.js";

const router = express.Router();

router.route("/paymob/wallet").post(walletPay)
router.route("/verify-payment").get(verifyBookPayment)

export default router