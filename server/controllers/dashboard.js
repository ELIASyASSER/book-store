import bookModel from "../models/bookModel.js"

const booksCount = (req,res,next)=>{
    try {

        res.status(200).json(bookModel.countDocuments())

    } catch (error) {
        console.log(error)
        next(error)
    }
}

export {booksCount}