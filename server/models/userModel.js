import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcrypt"
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        requird:[true,"please enter the username"],
        minLength:[6,"Min Charachters must be more than 6 "],
        maxLength:[25,"the username is too long please enter less charachters"],
        unique:[true,"Username must be unique"]
    },
    password:{
        type:String,
        required:[true,"please enter your password "],
        minLength:[6,"please enter more than 6 characters"]
    },
    role:{
        type:String,
        enum:["admin","user"],
        required:[true,"please enter the role "],

    },
    subscribe:{
        type:Boolean,
        default:false

    }
})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        return next()
    }
    try {

        const salt = await genSalt(10)
        this.password =  await bcrypt.hash(this.password,salt)
        

        next()
    } catch (error) {
        next(error)
    }
})

const userModel = mongoose.model("user",userSchema)

export default userModel