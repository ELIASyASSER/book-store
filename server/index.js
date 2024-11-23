//packages
import express from 'express'
import  'dotenv/config.js'
import cors from 'cors'
//directories
import { errorHandler } from './middleware/errorHandler.js'
import {fileURLToPath } from "url"
import path from "path";
import bookRouter from './routers/book.js'
import ordersRouter from "./routers/orders.js"
import userRouter from "./routers/user.js"
import connection from './db/books.js'
import axios from "axios"
import fs from "fs"
import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

//app middlewares

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))

app.use("/uploads",express.static(path.join(__dirname,"uploads")))


//here we save the photo of profile to 
const downladProfileImg = ()=>{

    app.post("/uploadImg",async(req,res,next)=>{
        const {urlImg} = req.body
        if (!req.body || !req.body.urlImg) {
            next("url of the image not found ")
        }
        const imgHash = generateImgHash(urlImg)
        const fileName = `${imgHash}.png`
        const filePath = path.join(__dirname,'uploads',fileName)
        try {
            const response = await axios({
                url:urlImg,
                method:"GET",
                responseType:"stream"
                
            })
            const writer = fs.createWriteStream(filePath)
            response.data.pipe(writer)
            
            writer.on("finish",()=>{

            res.status(200).json({msg:"Image saved Successfully",url:`/uploads/${fileName}`})

        })
        
        writer.on("error",(err)=>{
            console.log("error downloading the image",err)
            next("Failed to download the image")
            
        })
    } catch (error) {
        console.log(error)
        return next(error)
    }
})
const generateImgHash = function (url) {
    const hash = crypto.createHash("sha256")
    hash.update(url)
    return hash.digest("hex")
}
}

downladProfileImg()

// routes
app.use("/api",bookRouter)
app.use("/orders",ordersRouter)
app.use("/admin",userRouter)

//errors handler middlewares 
app.use(errorHandler)

const start = async()=>{
    
    try {
        await connection(process.env.MONGO_URI)
        console.log('database connected successfully')
        app.listen(4000,console.log("server is listening on port 4000"))
        
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

start()