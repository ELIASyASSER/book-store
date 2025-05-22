import "dotenv/config.js"
import mongoose from "mongoose"
import connectDb from "./db/books.js"
import ordersModel from "./models/ordersModel.js"

const MONGO_URI = process.env.MONGO_URI


const deleteOrders = async()=>{
    try {
        await connectDb(MONGO_URI);
        await ordersModel.deleteMany()
        console.log('orderes deleted successfully')
        

    } catch (error) {
        console.log(error)

    } finally{
        mongoose.disconnect()

    }

}



deleteOrders()