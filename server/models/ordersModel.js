import mongoose from "mongoose";
import  validator from "validator"

const addressDetails = new mongoose.Schema({
    fullAddress:{
        type:String,
        required:[true,"please enter your full address"],
        minLength:[60,"please descripe full address min charachters 60"],
        maxLength:[220,"You should enter less than 220 charachters"]
    },
    city:{
        type:String,
        required:[true,'please enter name of your city'],
        maxLength:[14,"city name is too long "]
    },

})

const orders_Schema = new mongoose.Schema({
    price:Number,
    fullName:{
        type:String,
        required:[true,"please enter Your Full Name"],
        minLength:[10,"min characters must be more than 10"],
        maxLength:[40,"please type less than 40 characters"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        validate:{
            validator:validator.isEmail,
            message:"please enter correct email"
        }

    },
    phone:{
            type:String,
            required:[true,"Please Enter Your Phone Number"],

            validate:{
                validator:function (v) {
                    return /^01[0-2|5][0-9]{8}$/.test(v);
                },

                message:(props)=>`${props.value} is not valid phone number`
            }

    },
    addressDetails:{
        type:addressDetails,
        required:true

    },
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
    
    countofItems:{
        type:Number
    }


},{timestamps:true})

const ordersModel = mongoose.model("Order",orders_Schema)


export default ordersModel