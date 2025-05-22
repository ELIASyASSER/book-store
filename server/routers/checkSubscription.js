import express from "express"
import { verifyFirebaseUser } from "../middleware/firebaseAuth.js";
import { checkSubscription } from "../controllers/checkSubscription.js";
const router = express.Router();

router.get("/dashboard-data",verifyFirebaseUser,checkSubscription)



export default router