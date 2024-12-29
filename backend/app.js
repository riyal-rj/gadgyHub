import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/mongo.db.config.js';
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import couponRoutes from './routes/coupon.routes.js'
import morgan from 'morgan';
const app=express();

app.use(express.json());

app.use(cookieParser());

app.use(morgan('dev'));

app.use('/api/auth',authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/coupons',couponRoutes);

connectDB();
export default app;