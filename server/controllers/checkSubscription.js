import userModel from "../models/userModel.js"

export const checkSubscription = async(req,res,next)=>{
    const {uid} = req.firebaseUser
    try {
        const user = await userModel.findOne({fireBaseUid:uid})
        if(!user || !user.subscription||!user.expiration||new Date(user.expiration) < new Date()){
            return res.status(403).json({success:false,message:"subscription is expired or not found please subscribe first "})
        }
        return res.status(200).json({success:true,user})
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}