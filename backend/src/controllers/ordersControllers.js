import Orders from "../models/OrdersModel.js"
import User from "../models/UserModel.js"

export const createOrders = async(req , res)=>{

    const {user_id , total_mrp , total_price , extra_discounts , delivery_charges , total_selling_price , product_details } = req.body

    if(!user_id || !total_mrp || !total_price || !extra_discounts || !delivery_charges || !total_selling_price || !product_details){
        return res.status(404).send({message : "required all fields"})
    }

    try {
        const user = await User.findOne({_id : user_id})

        if(!user){
            return res.status(404).send({error : 'user not found' })
        }

        const newOrder = new Orders({user_id , total_mrp , total_price , extra_discounts , delivery_charges , total_selling_price , product_details})
        await newOrder.save()
    
        user.orderDetails.orders.push(newOrder._id) 
        user.save()

        return res.status(200).send({data : newOrder , message: "order created sucessfully"})
    } catch (error) {
        console.log(error)
        return res.status(400).send({error : error.message})
    }
}

export const getOrders = async(req , res)=>{

    const {id : user_id} = req.params
    try {
        const userOrders = await Orders.find({user_id})   

        if(!userOrders.length){
            return res.status(400).send({message : "no Orders placed yet"})
        }

        return res.status(200).send({data : userOrders , message : "userOrders found sucessfully" })

    } catch (error) {
        return res.status(400).send({message : error.message})
    }
}

export const getAllOrders = async(req , res)=>{

    try {
        const userOrders = await Orders.find()   

        if(!userOrders.length){
            return res.status(400).send({message : "no orders placed yet"})
        }

        return res.status(200).send({data : userOrders , message : "userOrders found sucessfully" })

    } catch (error) {
        return res.status(400).send({error : error.message})
    }
}