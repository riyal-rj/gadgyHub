import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter coupon name'],
        unique: true
    },
    code: {
        type: String,
        required: [true, 'Please enter coupon code'],
        unique: true
    },
    discountPercentage: {
        type: Number,
        required: [true, 'Please enter discount percentage'],
        min: [0, 'Discount percentage cannot be less than 1'],
        max: [100, 'Discount percentage cannot be more than 100']
    },
    expiryDate: {
        type: Date,
        required: [true, 'Please enter expiry date'],
        validate: {
            validator: function (value) {
                return value > Date.now();
            },
            message: 'Expiry date must be in the future'
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},
    {
        timestamps: true,
    });

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
