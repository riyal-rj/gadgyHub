import Coupon from "../models/coupon.models.js";

export const getCoupons = async (req, res) => {
    try {
        const userId = req.user._id;
        const coupons = await Coupon.find({
            $or: [
                { userId: userId, isActive: true },  // Personalized coupons
                { userId: null, isActive: true }     // Global coupons
            ]
        });
        if (coupons.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Sorry No coupons found. Better luck next time"
            })
        }
        res.status(200).json({
            status: "success",
            message: "Coupons fetched successfully",
            noOfCoupons: coupons.length,
            data: coupons
        })
    } catch (error) {
        console.log('Error in getCoupons controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}

export const validateCoupon = async (req, res) => {
    try {
        const userId = req.user._id;
        const { code } = req.body;

        const coupon = await Coupon.findOne({
            code: code,
            $or: [
                { userId: userId, isActive: true },  // Personalized coupons
                { userId: null, isActive: true }     // Global coupons
            ]
            , isActive: true
        });

        if (!coupon) {
            return res.status(404).json({
                status: "failed",
                message: "Invalid coupon code"
            })
        }

        if (coupon.expiryDate < new Date()) {
            coupon.isActive = false;
            await coupon.save();
            return res.status(404).json({
                status: "failed",
                message: "You are unlucky! Coupon expired!"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Coupon validated successfully",
            name: coupon.name,
            code: coupon.code,
            discountPercentage: coupon.discountPercentage,
            expiryDate: coupon.expiryDate
        })
    } catch (error) {
        console.log('Error in validateCoupon controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
}

export const createCoupon = async (req, res) => {
    try {
        const { name, code, discountPercentage, expiryDate, userId } = req.body;
        if (!name || !code || !discountPercentage || !expiryDate) {
            return res.status(404).json({
                status: "failed",
                message: "All fields are required"
            })
        }

        const newCoupon = new Coupon({
            name,
            code,
            discountPercentage,
            expiryDate,
            userId
        });

        await newCoupon.save();

        res.status(200).json({
            status: "success",
            message: "Coupon created successfully",
            data: newCoupon
        })
    } catch (error) {
        console.log('Error in createCoupon controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}

export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCoupon = await Coupon.findByIdAndDelete(id);
        res.status(200).json({
            status: "success",
            message: "Coupon deleted successfully",
            data: deletedCoupon
        })
    } catch (error) {
        console.log('Error in deleteCoupon controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}