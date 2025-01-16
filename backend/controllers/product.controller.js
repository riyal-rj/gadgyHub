import cloudinary from "../cloud/cloudinary.config.js";
import Product from "../models/product.models.js";
import { redis } from "./../cache/redis.config.js";
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            status: "success",
            noOfProducts: products.length,
            data: products
        });
    } catch (error) {
        console.log('Error in getAllProducts controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
}


export const getAllFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get('featuredProducts');
        if (featuredProducts) {
            const featuredProds = JSON.parse(featuredProducts);
            return res.status(200).json({
                status: "success",
                noOfFeaturedProducts: featuredProds.length,
                data: featuredProds
            });
        }
        else {
            featuredProducts = await Product.find({ isFeatured: true });
            await redis.set('featuredProducts', JSON.stringify(featuredProducts), 'EX', 60 * 60 * 24 * 7);
            return res.status(200).json({
                status: "success",
                noOfFeaturedProducts: featuredProducts.length,
                data: featuredProducts
            });
        }
    } catch (error) {
        console.log('Error in getAllFeaturedProducts controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
}

export const getAllRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $sample: { size: 5 } },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    price: 1,
                    images: 1,
                    avgRatings: 1
                }
            }
        ]);

        res.status(200).json({
            status: "success",
            noOfProducts: products.length,
            data: products
        });
    }
    catch (error) {
        console.log('Error in getAllRecommendedProducts controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
}

export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        if (!Product.schema.path('category').enumValues.includes(category)) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid category entered"
            });
        }

        const products = await Product.find({ category });
        if (products.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Sorry No products found below this category"
            });
        }
        res.status(200).json({
            status: "success",
            noOfProducts: products.length,
            category: category,
            data: products
        });
    } catch (error) {
        console.log('Error in getProductsByCategory controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
}

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, avgRatings } = req.body;
        const { images } = req.body;
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                status: "failed",
                message: "Please fill all the required fields"
            });
        }
        if (!Product.schema.path('category').enumValues.includes(category)) {
            return res.status(400).json({
                status: "failed",
                message: "Invalid category entered"
            });
        }
        console.log(images);
        let cloudinaryResposne = null;
        if (images && images.url) {
            cloudinaryResposne = await cloudinary.uploader.upload(images.url,{
                resource_type: "auto",
            });
        }
        console.log(cloudinaryResposne);
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            images: {
                public_id: cloudinaryResposne?.public_id,
                url: cloudinaryResposne?.secure_url
            },
            avgRatings
        });

        await newProduct.save();

        res.status(201).json({
            status: "success",
            message: "Product added successfully",
            data: newProduct,
        })

    } catch (error) {
        console.log('Error in addProduct controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                status: "failed",
                message: "No product found "
            });
        }

        if(product.images)
        {
            const publicid=product.images.public_id;
            try {
                await cloudinary.uploader.destroy(`products/${publicid}`);
                console.log(`Deleted image with public_id from cloudinary: ${publicid}`);
            } catch (error) {
                console.log('Error in deleting image from cloudinary : ' + error.message);
            }
        }

        await Product.findByIdAndDelete(productId);

        res.status(200).json({
            status: "success",
            message: "Product deleted successfully"
        })
    } catch (error) {
        console.log('Error in deleteProduct controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
}

export const toggleFeaturedProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                status: "failed",
                message: "No product found "
            });
        }
        else
        {
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updateFeaturedProductCache();
            res.status(200).json({
                status: "success",
                message: "Product updated successfully",
                data: updatedProduct
            })
        }
    } catch (error) {
        console.log('Error in toggleFeaturedProduct controller : ' + error.message);
        return res.status(500).json({   
            status: "failed",
            message: error.message
        });
    }
}

const updateFeaturedProductCache = async () => {
    try {
        const products = await Product.find({ isFeatured: true });
        if (products.length === 0) {
            return;
        }
        await redis.set('featuredProducts', JSON.stringify(products));
    } catch (error) {   
        console.log('Error in updateFeaturedProductCache controller : ' + error.message);
    }
}