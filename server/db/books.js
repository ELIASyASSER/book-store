import mongoose from "mongoose";
let connection = {};
const connectDb =async(url)=>{
    try {
        mongoose.connection.on("connected",()=>{
            console.log("you are already connected to db")
        })
        if(connection.isConnected){
            console.log("you are already connected to db")
            return
        }
        else{
            const db = await mongoose.connect(url);
            connection.isConnected = db.connections[0].readyState;


        }

            mongoose.connection.on("disconnected", () => {
            console.log("MongoDB disconnected.");
    });

    } catch (error) {
        console.log(error)
    }
}

export default connectDb