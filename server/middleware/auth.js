import jwt from "jsonwebtoken"

const authenticateAdmin = (req,res,next)=>{
    const token = req.headers.authorization
    if(!token || !token.startsWith("Bearer")){
        return next(new Error("Invalid token"))
    }
    const tokenCode = token.split(" ")[1]

    jwt.verify(tokenCode,process.env.JWT_SECRET,(err,data)=>{
        if(err) return next(new Error("Invalid Credentials error with the token"))
        req.user = data
        next()
    })
    
    //here i use callBack you can use try catch block err in catch data in try  
    // here use this middleware before the routes you wnat them authenticated in our expamle i will use them when creating updating deleting a book as admin only can do this operations





}
export default authenticateAdmin