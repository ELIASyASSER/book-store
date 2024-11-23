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

    trending:{
        type:Boolean
    },

    coverImage:{
        type:String,
        required:[true,"please enter book photo"]
    },

    oldPrice:{
        type:Number,
        required:[true,"please enter the old price"]
    },

    newPrice:{
        type:Number,
        required:[true,"please enter the new price"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }


},{timestamps:true})

const bookModel = mongoose.model("Book",bookSchema)
export default bookModel