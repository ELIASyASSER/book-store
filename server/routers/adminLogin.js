import express from "express"
import { isAdminAuth, loginAdmin } from "../controllers/user.js"
import authenticateAdmin from "../middleware/auth.js"
const router = express.Router()

router.route("/logAdmin").post(loginAdmin)
router.route("/is-auth").get(authenticateAdmin,isAdminAuth)


export default router
