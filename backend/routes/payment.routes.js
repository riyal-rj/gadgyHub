import express from 'express';
import { checkoutSession, checkoutSuccess } from '../controllers/payment.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router=express.Router();

router.post('/checkout',protectedRoute,checkoutSession);
router.post('/checkout-success',protectedRoute,checkoutSuccess);

export default router;