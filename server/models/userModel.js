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
    fireBaseUid:{
        type:String,
        unique:true,
        required:function(){
            return this.role =="user"
        }// only required if it is a normal user 
    }
    ,
    email:{
        type:String,

    },
    password:{
        type:String,
        required:[true,"please enter your password "],
        minLength:[6,"please enter more than 6 characters"]
        
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"

    },
    subscription:{
        type:Boolean,
        required:[true,'please subscribe first to sell your books'],
        default:false
    },
    expiration:{
        type:Date,
        default:null
    }
    

    // plans:{
    //     type:String,
    //     enum:["standard","premium","professional"]

    // }
  
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

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel