import ordersModel from "../models/ordersModel.js"

const placeOrder = async(req,res,next)=>{

    try {
        
        
        console.log(req.body)
        const order = await ordersModel.create(req.body)
        res.status(201).json(order)

    } catch (error) {
        console.log(error.message)
        next(error)
    }

}

const getOrder = async(req,res,next)=>{
    const {email} = req.params
    
    try {
        const orders = await ordersModel.find({orderdEmail:email}).populate("orderData").sort({createdAt:-1});
        
            res.status(200).json(orders)

    } catch (error) {
        console.log(error)
        next(error)
    }

}

export {placeOrder,getOrder}