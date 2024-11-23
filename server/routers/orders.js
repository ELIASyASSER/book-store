import express from "express"
import { placeOrder ,getOrder} from "../controllers/orders.js"

const router = express.Router()


router.route("/postOrder").post(placeOrder)
router.route("/getOrder/:email").get(getOrder)


export default router