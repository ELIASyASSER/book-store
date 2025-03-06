import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'please enter book name'],
        minLength:[4,"The Book Name Is Too short please enter valid name"],
        maxLength:[65,"The Book Name Is Too Long maxLength 65 charachters"]
    },

    description:{
        type:String,
        required:[true,"please enter book description"],
        minLength:[100,"Please enter 100 characters At Least The Book Description Is Too short"],
        maxLength:[1000,"The Book Name Is Too Long maxLength 1000 charachters"]

    },

    category:{
        type:String,
        required:[true,"please enter book category"]
    },

    offer:{
        type:Boolean,
        default:false
    },

    coverImage:{
        type:String,
        required:[true,"please enter book photo"]
    },

    oldPrice:{
        type:Number,
        default:0

    },

    newPrice:{
        type:Number,
        required:[true,"please enter the  price"]
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
    ,
    count:{
        type:Number,
        default:1
    }


},{timestamps:true})

bookSchema.pre("findOneAndUpdate",function (next) {
    if(!this.offer){
        this.oldPrice = 0;
    }
    next()
    
})

const bookModel = mongoose.model("Book",bookSchema)
export default bookModel