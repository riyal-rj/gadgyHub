import express from 'express';
import { createCoupon, deleteCoupon, fetchAllCoupons, getCoupons, toggleCouponStatus, validateCoupon } from '../controllers/coupon.controller.js';
import { adminRoute, protectedRoute } from '../middleware/auth.middleware.js';

const router=express.Router();

router.get('/', protectedRoute,getCoupons);
router.post('/validate',protectedRoute,validateCoupon);

//admin only operations
router.post('/create',protectedRoute,adminRoute,createCoupon);
router.delete('/del/:id',protectedRoute,adminRoute,deleteCoupon);
router.get('/all',protectedRoute,adminRoute,fetchAllCoupons);
router.patch('/:id',protectedRoute,adminRoute,toggleCouponStatus);


export default router;