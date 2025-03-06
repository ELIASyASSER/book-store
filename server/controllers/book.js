
import bookModel from "../models/bookModel.js"

const sendBook =async (req,res,next)=>{

    try {

        const imageUrl = req.file.path
        const data = {
            ...req.body,
            coverImage:imageUrl
        }
        
        const books =  new bookModel(data);
        await books.save()

        res.status(201).send(books)

    } catch (error) {
        console.log(error.message)
        next(error)
    }


}

const getSingleBook = async (req,res,next)=>{
    try {
        const {id} = req.params
        const theBook = await bookModel.findById(id)
        if(!theBook){
            return next()
        }
        res.status(200).send({book:theBook})
        
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}

const updateBook = async(req,res,next)=>{
    try {
        const {id} = req.params
        const updatedData = {
            ...req.body,
        }
        if(req.file){
            updatedData.coverImage = req.file.path
        }
        const updatedBook = await bookModel.findOneAndUpdate({_id:id},updatedData,{
            new:true,
            runValidators:true
        })
        // {id:id,updatedData},{}
        
        if(!updatedBook){
            return next()
        }
        res.status(200).send({message:"book Updated ",book:updatedBook})

    } catch (err) {
        // console.log(err.message,'debugger')
        next(err)
    }
}

const getAllBooks = async(req,res,next)=>{
    
    try {
        const books = await bookModel.find({})
        res.status(200).send(books)
    } catch (error) {
        console.log(error.message)
        next(error)

    }

}
const deleteBook = async (req,res,next)=>{
    const {id} = req.params
    try {
        const deletedBook = await bookModel.findByIdAndDelete(id)
    if(!deleteBook){
        return next()
    }
    res.status(200).send({msg:"done",book:deletedBook})

    } catch (error) {
        console.log(error.message)
        next(error)
    }

}

export {sendBook,getSingleBook,updateBook,getAllBooks,deleteBook}