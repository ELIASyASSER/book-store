import "dotenv/config.js"
import mongoose from "mongoose"
import userModel from "./models/userModel.js"
import connectDb from "./db/books.js"
import bcrypt from "bcrypt"
const MONGO_URI = process.env.MONGO_URI

const createAdmin = async ()=>{
    try {
        await connectDb(MONGO_URI)
        // const salt =  await bcrypt.genSalt(10)
        // const password =  await bcrypt.hash(process.env.ADMIN_PASSWORD,salt);
        const existingAdmin = await userModel.findOne({ username: process.env.ADMIN_USER_NAME });
            if (existingAdmin) {
                console.log("Admin already exists.");
                return;
            }
            
         await userModel.create({
            username:process.env.ADMIN_USER_NAME,
            password:process.env.ADMIN_PASSWORD,
            role:"admin",
            subscription:true,
    })
    console.log("admin created successfully");
    
    } catch (error) {
        console.log(error.message)

    }finally{
        mongoose.disconnect();
    }
}

createAdmin()