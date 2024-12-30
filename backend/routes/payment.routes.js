import express from 'express';
import { checkoutSession } from '../controllers/payment.controller.js';

const router=express.Router();

router.post('/checkout',checkoutSession);

export default router;