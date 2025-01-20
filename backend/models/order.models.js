import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:[true,'Please enter user']
        },
        products:[
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product",
                    required:[true,'Please enter product']
                },
                quantity:{
                    type:Number,
                    required:[true,'Please enter product quantity'],
                    min:[1,'Quantity cannot be less than 1'],
                },
                price:{
                    type:Number,
                    required:[true,'Please enter product price'],
                    min:[1,'Price cannot be less than 1'],
                },
            },
        ],
        totalAmount:{
            type:Number,
            required:[true,'Please enter total amount'],
            min:[1,'Total amount cannot be less than 1'],
        },
        stripeSessionId:{
            type:String,
            required:[true,'Please enter stripe payment id'],
        },
    },
    {
        timestamps:true,
    }
);

const Order = mongoose.model("Order",orderSchema);

export default Order;