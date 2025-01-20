import express from 'express';
import { createCoupon, deleteCoupon, getCoupons, validateCoupon } from '../controllers/coupon.controller.js';
import { adminRoute, protectedRoute } from '../middleware/auth.middleware.js';

const router=express.Router();

router.get('/', protectedRoute,getCoupons);
router.post('/validate',protectedRoute,validateCoupon);

//admin only operations
router.post('/create',protectedRoute,adminRoute,createCoupon);
router.delete('/del/:id',protectedRoute,adminRoute,deleteCoupon);


export default router;