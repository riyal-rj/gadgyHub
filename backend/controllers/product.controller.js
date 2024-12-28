import Product from "../models/product.model.js";
import {redis} from "./../cache/redis.config.js";
export const getAllProducts=async(req,res)=>{
    try {
        const products=await Product.find({});
        res.status(200).json({
            status:"success",
            noOfProducts:products.length,
            data:products
        });
    } catch (error) {
        console.log('Error in getAllProducts controller : '+error.message);
        return res.status(500).json({
            status:"failed",
            message:error.message
        })
    }
}


export const getAllFeaturedProducts=async(req,res)=>{
    try {
        let featuredProducts=await redis.get('featuredProducts');
        if(featuredProducts)
        {
            const featuredProds=JSON.parse(featuredProducts);
            return res.status(200).json({
                status:"success",
                noOfFeaturedProducts:featuredProds.length,
                data:featuredProds
            });
        }
        else
        {
            featuredProducts=await Product.find({isFeatured:true});
            await redis.set('featuredProducts',JSON.stringify(featuredProducts),'EX',60*60*24*7);
            return res.status(200).json({
                status:"success",
                noOfFeaturedProducts:featuredProducts.length,
                data:featuredProducts
            });
        }
    } catch (error) {
        console.log('Error in getAllFeaturedProducts controller : '+error.message);
        return res.status(500).json({
            status:"failed",
            message:error.message
        });
    }
}

export const getAllRecommendedProducts=async(req,res)=>{
    try {
        const products=await Product.aggregate([
            {$sample:{size:5}},
            {
                $project:{
                    _id:1,
                    name:1,
                    description:1,
                    price:1,
                    images:1,
                    avgRatings:1
                }
            }
        ]);

        res.status(200).json({
            status:"success",
            noOfProducts:products.length,
            data:products
        });
    }
     catch (error) {
        console.log('Error in getAllRecommendedProducts controller : '+error.message);
        return res.status(500).json({
            status:"failed",
            message:error.message
        });
    }
}

export const getProductsByCategory=async(req,res)=>{
    try {
        const {category}=req.params;

        if (!Product.schema.path('category').enumValues.includes(category)) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid category entered"
            });
        }

        const products=await Product.find({category});
        if(products.length===0)
        {
            return res.status(404).json({
                status:"failed",
                message:"Sorry No products found below this category"
            });
        }
        res.status(200).json({
            status:"success",
            noOfProducts:products.length,
            category:category,
            data:products
        });
    } catch (error) {
        console.log('Error in getProductsByCategory controller : '+error.message);
        return res.status(500).json({
            status:"failed",
            message:error.message
        });
    }
}

export const addProduct=async(req,res)=>{
    try {
        const {name,description,price,category,images}=req.body;

        if(!name || !description || !price || !category || !images)
        {
            return res.status(400).json({
                status:"failed",
                message:"Please fill all the required fields"
            });
        }
        if (!Product.schema.path('category').enumValues.includes(category)) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid category entered"
            });
        }
        
    } catch (error) {
        console.log('Error in addProduct controller : '+error.message);
        return res.status(500).json({
            status:"failed",
            message:error.message
        });
    }
}