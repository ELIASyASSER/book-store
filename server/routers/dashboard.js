import express from "express"
import { booksCount } from "../controllers/dashboard.js"
const router = express.Router()

router.route("/booksCount").get(booksCount)


export default router