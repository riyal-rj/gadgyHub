import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/mongo.db.config.js';
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import couponRoutes from './routes/coupon.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'
import morgan from 'morgan';
const app=express();

app.use(express.json({limit:'50mb'}));

app.use(cookieParser());

app.use(morgan('dev'));

app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/coupons',couponRoutes);
app.use('/api/payments',paymentRoutes);
app.use('/api/analytics',analyticsRoutes);

connectDB();
export default app;