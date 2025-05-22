// middleware/verifyFirebaseUser.js
import userModel from "../models/userModel.js";
export const checkExpiration = async (req, res, next) => {

  try {
    const {uid} = req.firebaseUser;
    const now = new Date()
    const user = await userModel.findOne({fireBaseUid:uid})
    if(user){

      if(user.subscription && user.expiration<now){
          
        user.subscription = false;
        user.expiration = null;
        await user.save();
        
      }
      req.user = user
      next();
    }else{
      next();
    } 
  } catch (err) {
    next(err)
  }
};
