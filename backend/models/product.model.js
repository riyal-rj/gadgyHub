import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter product name'],
        trim:true,
        maxLength:[100,'Product name cannot exceed 100 characters'],
    },
    description:{
        type:String,
        required:[true,'Please enter product description'],
        trim:true,
        maxLength:[1000,'Product description cannot exceed 1000 characters'],
    },
    price:{
        type:Number,
        required:[true,'Please enter product price'],
        maxLength:[8,'Product price cannot exceed 8 characters'],
        default:0.0
    },
    avgRatings:{
        type:Number,
        default:2,
        max:[5,'Ratings cannot exceed 5'],
        min:[1,'Ratings cannot be less than 1']
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true,'Please select category for this product'],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Phones'],
            message: 'Please select correct category for product'
        }
    },
    isFeatured:{
        type:Boolean,
        default:false,
    }
},{timestamps:true});


const Product = mongoose.model('Product',productSchema);

export default Product;