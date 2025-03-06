import express from "express"
import { loginAdmin } from "../controllers/user.js"
const router = express.Router()

router.route("/logAdmin").post(loginAdmin)


export default router
