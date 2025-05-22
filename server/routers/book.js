import express from "express"

import { sendBook, getSingleBook, updateBook, getAllBooks,deleteBook, getWholeBooks} from "../controllers/book.js"


import multer from 'multer'

import cloudinary from '../utils/cloudinary.config.js'

import {CloudinaryStorage} from "multer-storage-cloudinary"
import { verifyFirebaseUser } from "../middleware/firebaseAuth.js"

const router = express.Router()

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"photos",
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'ico', 'svg', 'heif', 'heic', 'avif']
    }
})
const upload = multer({storage:storage})

router.route("/createBook").post(verifyFirebaseUser,upload.single("cover"),sendBook)


router.route("/editBook/:id").put(verifyFirebaseUser,upload.single("cover"),updateBook)


router.route("/getBooks").get(verifyFirebaseUser,getAllBooks)
router.route("/getWholeBooks").get(getWholeBooks)

router.route("/deleteBook/:id").delete(verifyFirebaseUser,
deleteBook)


router.get("/singleBook/:id",getSingleBook)

export default router