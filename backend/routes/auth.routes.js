import express from 'express';

import { getUserProfile, loginUser, logoutUser, refreshToken, registerUser } from './../controllers/auth.controller.js';

const router =express.Router();

router.post('/login',loginUser);
router.post('/register',registerUser);
router.post('/logout',logoutUser);
router.post('/refresh',refreshToken);

router.get('/profile',getUserProfile);


export default router;
