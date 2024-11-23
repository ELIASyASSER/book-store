import mongoose from "mongoose";

const connection = (url)=>{
    return mongoose.connect(url)
}

export default connection