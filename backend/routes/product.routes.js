import express from 'express';
import { addProduct, deleteProduct, getAllFeaturedProducts, getAllProducts, getAllRecommendedProducts, getProductsByCategory, toggleFeaturedProduct } from '../controllers/product.controller.js';
import { adminRoute, protectedRoute } from '../middleware/auth.middleware.js';
;
const router=express.Router();

router.get('/featured',getAllFeaturedProducts);
router.get('/recommended',getAllRecommendedProducts);
router.get('/category/:category',getProductsByCategory);

//admin only routes
router.get('/',protectedRoute,adminRoute,getAllProducts);
router.post('/',protectedRoute,adminRoute,addProduct);

router.patch('/:id',protectedRoute,adminRoute,toggleFeaturedProduct);
router.delete('/:id',protectedRoute,adminRoute,deleteProduct);

export default router;