import express from 'express';
import { getAllFeaturedProducts, getAllProducts, getAllRecommendedProducts, getProductsByCategory } from '../controllers/product.controller.js';
import { adminRoute, protectedRoute } from '../middleware/auth.middleware.js';
const router=express.Router();

router.get('/featured',getAllFeaturedProducts);
router.get('/recommended',getAllRecommendedProducts);
router.get('/category/:category',getProductsByCategory);

router.get('/',protectedRoute,adminRoute,getAllProducts);

export default router;