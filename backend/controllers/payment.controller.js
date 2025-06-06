import { ENV_VARS } from "../env/envVars.js";
import Coupon from "../models/coupon.models.js";
import { stripe } from "../payments/stripe.config.js";
import Order from "../models/order.models.js";
export const checkoutSession = async (req, res) => {
    try {
        const {listOfProducts,code} = req.body;
        if(!listOfProducts) 
        {
            return res.status(404).json({
                status: "failed",
                message: "No products to checkout"
            });
        }

        if(!Array.isArray(listOfProducts)||listOfProducts.length===0)
        {
            return res.status(404).json({
                status: "failed",
                message: "Invalid products to checkout"
            });
        }

        let totalAmount = 0;

        const lineItems = listOfProducts.map((product) => {
            totalAmount += product.price * product.quantity;
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.name,
                        description: product.description,
                        images: [product.image]
                    },
                    unit_amount: product.price * 100
                },
                quantity: product.quantity
            };
        });

        let coupon=null;
        if(code)
        {
            coupon=await Coupon.findOne({
                code:code,
                $or:[{userId:req.user._id},
                    {userId:null}],
                isActive:true
            });

            if(!coupon)
            {
                return res.status(404).json({
                    status: "failed",
                    message: "Invalid coupon code"
                });
            }
            if(coupon.expiryDate<new Date())
            {
                coupon.isActive=false;
                await coupon.save();
                return res.status(404).json({
                    status: "failed",
                    message: "Coupon expired"
                });
            }
            totalAmount=totalAmount-(totalAmount*coupon.discountPercentage)/100;
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${ENV_VARS.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${ENV_VARS.CLIENT_URL}/purchase-cancel`,
            discounts: coupon?[{coupon:await createStripeCoupon(coupon.discountPercentage)}]:[],
            metadata: {
                userId: req.user._id.toString(),
                products: JSON.stringify(
                    listOfProducts.map((product) => ({
                        id: product._id.toString(),
                        quantity: product.quantity ,
                        price: product.price 
                    }))
                ),
                coupon: coupon?coupon.code.toString():null
            }
        });

        if(totalAmount>=30000)
        {
            await createCoupon(req.user._id);
        }

        res.status(200).json({
            status: "success",
            message: "Checkout session created successfully",
            sessionId: session.id,
            totalAmount: totalAmount
        });
    } catch (error) {
        console.log('Error in checkoutSession controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}


async function createStripeCoupon(discountPercentage) {
    const coupon = await stripe.coupons.create({
        duration: "once",
        percent_off: discountPercentage,
    });
    return coupon.id;
}


async function createCoupon(userId)
{
    const coupon = await Coupon.create({
        name:'GIFTY'+Math.floor(Math.random() * 10000),
        code:'GIFTY'+Math.floor(Math.random() * 10000),
        discountPercentage:10,
        expiryDate:new Date(Date.now()+6*30*24*60*60*1000),
        userId
    });
    return coupon;
}


export const checkoutSuccess = async (req, res) => {
    try {
        const {sessionId} = req.body;
        
        console.log(sessionId,sessionId.length);
        if(!sessionId)
        {
            return res.status(404).json({
                status: "failed",
                message: "Session id required"
            });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if(session.payment_status==="paid")
        {
            if(session.metadata.coupon)
            {
                await Coupon.findOneAndUpdate({code:session.metadata.coupon},{isActive:false});
            }
            let products=null;
            console.log(session.metadata.userId);
            products = JSON.parse(session.metadata.products);
            const newOrder = new Order({
                user: session.metadata.userId,
                products:products.map((product) => ({
                    product: product.id,
                    quantity: product.quantity,
                    price: product.price
                })),
                totalAmount: session.amount_total,
                stripeSessionId: sessionId
            });
            await newOrder.save();
            return res.status(200).json({
                status: "success",
                message: "Payment successful",
                orderId: newOrder._id
            });
        }
        else
        {
            return res.status(400).json({
                status: "failed",
                message: "Payment failed"
            })
        }
    } catch (error) {
        console.log('Error in checkoutSuccess controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}