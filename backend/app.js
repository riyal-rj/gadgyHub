import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/mongo.db.config.js';
import authRoutes from './routes/auth.routes.js'
const app=express();

app.use(express.json());

app.use(cookieParser());


app.use('/api/auth',authRoutes);


connectDB();
export default app;