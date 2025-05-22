import bookModel from "../models/bookModel.js"
import userModel from "../models/userModel.js"

const booksCount = async(req,res,next)=>{
    try {

        const {uid} = req.firebaseUser
        const seller = await userModel.findOne({fireBaseUid:uid})

        if (!seller) {
            return res.status(404).json({ message: "Author not found"})
        }

        const booksCount = await bookModel.countDocuments({author:seller._id})

        res.status(200).json(booksCount) 

    } catch (error) {
        console.log(error)
        next(error)
    }
} 
const getWholeBooksCount = async(req,res,next)=>{
    try {
        const counting = await bookModel.countDocuments({})
        res.status(200).json(counting)
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}

// const ordersCount = async(req,res,next)=>{
    
//     try {

//         const {uid} = req.firebaseUser
//         const seller = await userModel.findOne({fireBaseUid:uid})

//         if (!seller) {
//             return res.status(404).json({ message: "Author not found"})
//         }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
//         const ordersCount = await bookModel.countDocuments({author:seller._id})

//         res.status(200).json(booksCount) 

//     } catch (error) {
//         console.log(error)
//         next(error)
//     }
// } 


export {booksCount,getWholeBooksCount}