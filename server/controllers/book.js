import bookModel from "../models/bookModel.js"

import userModel from "../models/userModel.js"

const sendBook =async (req,res,next)=>{

    try {
        const {uid} = req.firebaseUser;

        const seller = await userModel.findOne({fireBaseUid:uid})
        
        if(!seller.subscription || seller.expiration<new Date()){
            return res.status(403).json({ message: "You must subscribe to publish a book." });
        }

        const imageUrl = req.file.path
        const data = {
            ...req.body,
            coverImage:imageUrl,
            author:seller._id
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
        const theBook = await bookModel.findById(id).populate("author",["username"])
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
        const {uid} = req.firebaseUser;

        const book = await bookModel.findById(id).populate("author",["fireBaseUid"]);
            // Check if the book exists
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }   

        const authorId = book?.author?.fireBaseUid;

        if(authorId != uid){
            return res.status(403).json({message:"You Can't Delete this Book Subscribe first to manage your books"})
        }

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
    const {uid} = req.firebaseUser;

    
    try {
        const books = await bookModel.aggregate([
  // 1. Join the User collection based on the author ID
  {

      $lookup: {
          
          from: "users",           // Collection name for User (usually lowercase plural of model)
          localField: "author",    // The field in Book
          foreignField: "_id",     // The field in User to match
          as: "author"             // Output array field (temporarily replaces `author`)
        
        },
    },
        {  $unwind: "$author"},
        {

            $match:{"author.fireBaseUid":uid}
        }
            

    ])
    


        res.status(200).send(books)
    } catch (error) {
        console.log(error.message)
        next(error)

    }

}

const getWholeBooks = async(req,res,next)=>{
    
    try {
    const allBooks = await bookModel.find({}).populate("author",["username"]);

        res.status(200).send(allBooks)
    } catch (error) {
        console.log(error.message)
        next(error)

    }

}

const deleteBook = async (req,res,next)=>{
    const {id} = req.params
    try {
        const {uid} = req.firebaseUser;
        const book = await bookModel.findById(id).populate("author",["fireBaseUid"]);
            // Check if the book exists
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }   

        const authorId = book?.author?.fireBaseUid;

        if(authorId != uid){
            return res.status(403).json({message:"You Can't Delete this Book Subscribe first to manage your books"})
        }
        
        
        const deletedBook = await bookModel.findByIdAndDelete(id)
        if(!deletedBook){
        return next()
    }
        res.status(200).send({msg:"done",book:deletedBook})
        
    } catch (error) {
        console.log(error.message)
        next(error)
    }

}

export {
    sendBook,getSingleBook,
    updateBook,getAllBooks
    ,deleteBook,getWholeBooks
}
