const errorHandler = (err,req,res,next)=>{

    const stausCode = err.statusCode || 500
    const msg = err.message ||err

    res.status(stausCode).json(msg)
}




export {errorHandler}