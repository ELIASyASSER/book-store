import express from "express"
import { booksCount, getWholeBooksCount } from "../controllers/dashboard.js"
import { verifyFirebaseUser } from "../middleware/firebaseAuth.js"
import authenticateAdmin from "../middleware/auth.js"
const router = express.Router()

router.route("/booksCount").get(verifyFirebaseUser,booksCount)
router.route("/wholeBooksCount").get(authenticateAdmin,getWholeBooksCount)


export default router