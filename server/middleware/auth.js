import jwt from "jsonwebtoken"
const authenticateAdmin = (req,res,next)=>{
    const {sellerToken} = req.cookies

    try {
            if(!sellerToken){
            return res.status(403).json({success:false,message:"you can't access this admin page "})
        }
        const decodedToken = jwt.verify(sellerToken,process.env.JWT_SECRET_ADMIN)
        if(decodedToken.username == process.env.ADMIN_USER_NAME){

            
            next()
        }else{
            return res.status(403).json({success:false,message:"you can't access admin page "})
        }
    } catch (error) {
        console.log(error.message)
        if(error instanceof jwt.TokenExpiredError){
            return res.status(403).json({success:false,message:"Your session has been expired please log admin again"})
        }
        next(error)
        
    }

}
export default authenticateAdmin