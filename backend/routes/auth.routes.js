import express from 'express';

import { getUserProfile, loginUser, logoutUser, refreshToken, registerUser } from './../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router =express.Router();

router.post('/login',loginUser);
router.post('/register',registerUser);
router.post('/logout',logoutUser);
router.post('/refresh',refreshToken);

router.get('/profile',protectedRoute,getUserProfile);


export default router;
