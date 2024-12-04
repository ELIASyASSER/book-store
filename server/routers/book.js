import express from "express"

import { sendBook, getSingleBook, updateBook, getAllBooks,deleteBook} from "../controllers/book.js"

import authenticateAdmin from "../middleware/auth.js"

import multer from 'multer'

import cloudinary from '../utils/cloudinary.config.js'

import {CloudinaryStorage} from "multer-storage-cloudinary"

const router = express.Router()

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"photos",
        allowed_formats: ['jpeg', 'png', 'jpg'],
    }
})
const upload = multer({storage:storage})

router.route("/createBook").post(authenticateAdmin,upload.single("cover"),sendBook)


router.route("/editBook/:id").put(authenticateAdmin,upload.single("cover"),updateBook)


router.route("/getBooks").get(getAllBooks)


router.route("/deleteBook/:id").delete(authenticateAdmin,
deleteBook)


router.get("/singleBook/:id",getSingleBook)

export default router