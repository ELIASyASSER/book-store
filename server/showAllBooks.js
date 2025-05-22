import "dotenv/config.js"
import connectDb from "./db/books.js"
import bookModel from "./models/bookModel.js"
import mongoose, { now } from "mongoose"
import ordersModel from "./models/ordersModel.js"
const url = process.env.MONGO_URI

const showAll = async()=>{
    try {
        
        await connectDb(url)
        const users = await ordersModel.find({});
        console.log(users)
    } catch (error) {
        console.log(error)
        return;
    }finally{
        mongoose.disconnect()
    }
}

showAll()