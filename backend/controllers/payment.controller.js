import { ENV_VARS } from "../env/envVars.js";
import Coupon from "../models/coupon.models.js";
import { stripe } from "../payments/stripe.config.js";

export const checkoutSession = async (req, res) => {
    try {
        const {listOfProducts,couponCode} = req.body;
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
                        images: [product.images.url]
                    },
                    unit_amount: product.price * 100
                },
                quantity: product.quantity
            };
        });

        let coupon=null;
        if(couponCode)
        {
            coupon=await Coupon.findOne({code:couponCode,isActive:true});
            if(!coupon)
            {
                return res.status(404).json({
                    status: "failed",
                    message: "Invalid coupon code"
                });
            }
            if(coupon.expiryDate<new Date())
            {
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
            success_url: `${ENV_VARS.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${ENV_VARS.CLIENT_URL}/cancel`,
            discounts: [
                {
                    coupon: coupon?coupon.code:null
                }
            ],
            metadata: {
                userId: req.user._id,
                products: JSON.stringify(listOfProducts),
                coupon: coupon?coupon.code:null
            }
        });

        if(totalAmount>30000)
        {
            
        }
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
        duration_in_months: null,
        id: null,
        max_redemptions: null,
        name: null,
        percent_off: discountPercentage,
        redeem_by: null,
        times_redeemed: null,
    });
    return coupon.id;
}


async function createCoupon(userId)
{
    const coupon = await Coupon.create({
        name:'GIFT',
        code:'GIFT'+Math.floor(Math.random() * 10000),
        discountPercentage:10,
        expiryDate:new Date(Date.now()+30*24*60*60*1000),
        userId
    });
    return coupon;
}
