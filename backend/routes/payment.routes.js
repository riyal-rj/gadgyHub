import express from 'express';
import { checkoutSession } from '../controllers/payment.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router=express.Router();

router.post('/checkout',protectedRoute,checkoutSession);

export default router;