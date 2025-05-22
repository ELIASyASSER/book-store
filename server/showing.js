import "dotenv/config.js"
import connectDb from "./db/books.js"
import userModel from "./models/userModel.js"
import mongoose, { now } from "mongoose"
const url = process.env.MONGO_URI

const showAll = async()=>{
    try {
        
        const date =new Date(new Date().setMonth(new Date().getMonth()+1))
        console.log(date)
        await connectDb(url)
        const users = await userModel.find({});
        console.log(users)
    } catch (error) {
        console.log(error)
        return;
    }finally{
        mongoose.disconnect()
    }
}

showAll()