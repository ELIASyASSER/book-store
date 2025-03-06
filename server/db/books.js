import mongoose from "mongoose";

const connection = (url)=>{
    return mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
}

export default connection