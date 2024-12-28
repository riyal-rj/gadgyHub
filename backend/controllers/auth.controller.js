import { generateToken } from "../authenticate/generateToken.js";
import { storeRefreshToken } from "../cache/storeToken.js";
import { setCookies } from "../cookies/setCookie.js";
import User from "../models/user.models.js";
import { redis } from "../cache/redis.config.js";
import { ENV_VARS } from "../env/envVars.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { username, email, password, confirmPassword,role } = req.body;
    try {
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({
                status: 'failed',
                message: "Please fill all the fields"
            });
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(409).json({
                status: 'failed',
                message: "User already exists with the same username"
            });
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(409).json({
                status: 'failed',
                message: "User already exists with the same email id"
            });
        }

        const newUser = new User({
            username,
            email,
            password,
            confirmPassword,
            role
        });

        await newUser.save();

        const { accessToken, refreshToken } = await generateToken(newUser._id);

        await storeRefreshToken(newUser._id, refreshToken);

        setCookies(res, accessToken, refreshToken);

        return res.status(201).json({
            status: 'success',
            message: "User registered successfully",
            data: {
                ...newUser._doc,
                password: undefined,
            }
        })
    } catch (error) {
        console.log('Error in registerUser controller: ' + error.message);
        if (error.name == 'ValidationError') {
            return res.status(400).json({
                status: 'failed',
                message: error.message
            });
        }
        else {
            return res.status(500).json({
                status: 'failed',
                message: error.message,
            });
        }
    }
}

export const loginUser = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        if (!emailOrUsername || !password) {
            return res.status(400).json({
                status: 'failed',
                message: "Please fill all the fields"
            });
        }

        const userExists = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] }).select('+password');
        if (!userExists) {
            return res.status(404).json({
                status: 'failed',
                message: "User not found"
            });
        }

        const isMatch = await userExists.comparePassword(password, userExists.password);
        if (!isMatch) {
            return res.status(401).json({
                status: 'failed',
                message: "Invalid Credentials"
            });
        }

        const { accessToken, refreshToken } = await generateToken(userExists._id);

        await storeRefreshToken(userExists._id, refreshToken);

        setCookies(res, accessToken, refreshToken);

        return res.status(200).json({
            status: 'success',
            message: "User logged in successfully",
            data: {
                ...userExists._doc,
                password: undefined,
            }
        });
    } catch (error) {
        console.log('Error in loginUser controller : ' + error.message);
        return res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
}

export const logoutUser = async (req, res) => {
    try {
        const refreshToken = req.cookies['refresh-token'];
        if (refreshToken) {
            const decoded = await jwt.verify(refreshToken, ENV_VARS.REFRESH_TOKEN);
            await redis.del(`refreshToken:${decoded.id}`);
        }

        res.clearCookie('access-token');
        res.clearCookie('refresh-token');
        return res.status(200).json({
            status: 'success',
            message: "User logged out successfully"
        });
    } catch (error) {
        console.log('Error in logoutUser controller : ' + error.message);
        return res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
}

export const refreshToken = async (req, res) => {

}

export const getUserProfile = async (req, res) => {
    try {
        const user = req.user;
        return res.status(200).json({
            status: 'success',
            data: {
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        console.log('Error in getUserProfile controller : ' + error.message);
        return res.status(500).json({
            status: 'failed',
            message: error.message,
        });
    }
}