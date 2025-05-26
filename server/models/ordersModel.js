import mongoose from "mongoose";
import  validator from "validator"
import addressDetails from "./address.js";

const orders_Schema = new mongoose.Schema({
    price:Number,
    addressDetails:addressDetails,
    orderdEmail:{
        type:String,
        validate:{
            validator:validator.isEmail,
            message:"please enter correct email"
        }
        

    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    orderData:[{type:mongoose.Schema.Types.ObjectId,ref:"Book"}],
    paymentType:{type:String,required:false,default:"COD"},
    isPaid:{type:Boolean,required:true,default:false},
    count:{type:Array,required:true},
    walletPayId:{
        type:String,
        unique:true,
    }


},{timestamps:true})



const ordersModel =mongoose.models.Order|| mongoose.model("Order",orders_Schema)


export default ordersModel