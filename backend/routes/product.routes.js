import express from 'express';
import { getAllFeaturedProducts, getAllProducts, getAllRecommendedProducts, getProductsByCategory } from '../controllers/product.controller.js';
import { adminRoute, protectedRoute } from '../middleware/auth.middleware.js';
const router=express.Router();

router.get('/featured',getAllFeaturedProducts);
router.get('/recommended',getAllRecommendedProducts);
router.get('/category/:category',getProductsByCategory);

//admin only routes
router.get('/',protectedRoute,adminRoute,getAllProducts);
router.post('/',protectedRoute,adminRoute,addProduct);

export default router;