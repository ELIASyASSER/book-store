import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const loginAdmin = async(req,res,next)=>{

    try {
        const {username,password} = req.body;

        if(!username || !password){
            return res.status(400).json({success:false,message:"please enter username and password "})
        }
        const user = await userModel.findOne({username:username});
        if(!user){
            return res.status(403).json({success:false,message:"only admin can access this page"})
        }
        
        const comparedPassword = await bcrypt.compare(password,user.password)
        if(process.env.ADMIN_USER_NAME == username && comparedPassword){
            const sellerToken =  jwt.sign({username},process.env.JWT_SECRET_ADMIN,{expiresIn:'7d'})

            res.status(201).cookie("sellerToken",sellerToken,{
            httpOnly:true,//prevent js to access cookie
            secure:process.env.NODE_ENV =="production"?true:false,//https secure protocol on production
            sameSite:process.env.NODE_ENV =="production"?"none":"strict",//csrf protection
            // maxAge:7*24*60*60*1000, //cookie expiration
            maxAge:7*24*60*60*1000 //cookie expiration
            }).json({success:true,message:"admin log in successfully"})

        }else {

                    
            return res.status(400).json({success:false,message:"wrong email or password"})
        }

        //after finshing dev and deploy it set true to secure

    } catch (error) {
        console.log(error.message)
        next(error)
    }
}
const isAdminAuth = async(req,res,next)=>{
    try {
        res.status(200).json({success:true})

    } catch (error) {
        console.log(error.message)
        next(error)
    }
}
export {
    loginAdmin,
    isAdminAuth

}