import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"

const loginAdmin = async(req,res,next)=>{
    try {
        const {username,password,subscribe} = req.body
        if(!subscribe){
            res.status(400).json("please subscribe first to publish your books")
        }

        const admin = await  userModel.findOne({username:username})
        if(!admin){
            return res.status(404).json("Admin Not Found")
        }


        if(admin.password !== password){
            return res.status(400).json("Wrong Password")
        }


        const token = jwt.sign({id:admin._id,username:admin.username,role:admin.role},process.env.JWT_SECRET,{expiresIn:"1h"})

        res.status(200).json({success:"Authentication Successfully",token:token})

        //after finshing dev and deploy it set true to secure

    } catch (error) {
        console.log(error.message)
        next(error)
    }
}

export {
    loginAdmin,

}