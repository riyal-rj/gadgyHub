import Product from "../models/product.models.js";
import User from "../models/user.models.js";


export const getAllProdsFromCart = async (req, res) => {
    try {
        const products = await Product.find({ _id: { $in: req.user.cartItems } });

        const cartItems = products.map((product) => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            quantity: req.user.cartItems.find((item) => item.equals(product._id)).quantity,
            image: product.image
        }));
        console.log(cartItems);
        res.status(200).json({
            status: "success",
            message: "Products fetched successfully from cart",
            data: cartItems
        })

    } catch (error) {
        console.log('Error in getAllProdsFromCart controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
}


export const addToCart = async (req, res) => {
    try {
        const user = req.user;
        const { productId } = req.body;

        const checkValidProduct = await Product.findById(productId);
        if (!checkValidProduct) {
            return res.status(404).json({
                status: "failed",
                message: "Inavlid product id or Product not found!"
            })
        }

        const existingItem = await user.cartItems.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        }
        else {
            user.cartItems.push(productId);
        }

        await user.save();

        res.status(200).json({
            status: "success",
            message: "Product added to cart successfully",
            carts: user.cartItems
        })
    } catch (error) {
        console.log('Error in addToCart controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
}


export const removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;
        if (!productId) {
            user.cartItems = [];
        }
        else {
            user.cartItems = user.cartItems.filter(item => item.id !== productId);
        }
        await user.save();
        res.status(200).json({
            status: "success",
            message: "Cart cleared successfully",
            carts: user.cartItems
        });
    } catch (error) {
        console.log('Error in removeAllFromCart controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
}


export const updateQuantity = async (req, res) => {
    try {
        const user = req.user;
        const { id: productId } = req.params;
        const { quantity } = req.body;

        const existingItem = await user.cartItems.find(item => item.id === productId);
        if (existingItem) {
            if (quantity === 0) {
                user.cartItems = user.cartItems.filter(item => item.id !== productId);
                await user.save();
                return res.status(200).json({
                    status: "success",
                    message: "Product removed from cart successfully",
                    carts: user.cartItems
                })
            }
            else {
                existingItem.quantity = quantity;
                await user.save();
                res.status(200).json({
                    status: "success",
                    message: "Product quantity updated successfully in cart",
                    carts: user.cartItems
                })
            }
        }
        else {
            return res.status(404).json({
                status: "failed",
                message: "Product not found in cart!"
            })
        }
    } catch (error) {
        console.log('Error in updateQuantity controller : ' + error.message);
        return res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
}

export const clearCartItems = async (req, res) => {
    try {
        console.log(req.user._id);
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found",
            });
        }
            user.cartItems = [];
            await user.save();
            res.status(200).json({
                status: "success",
                message: "Cart cleared successfully",
                carts: user.cartItems
            })
        } catch (error) {
            console.log('Error in clearCart controller : ' + error.message);
            return res.status(500).json({
                status: "failed",
                message: error.message
            });
        }
    }

