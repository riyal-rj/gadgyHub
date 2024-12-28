import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import { ENV_VARS } from "../env/envVars.js";

export const protectedRoute = async (req, res, next) => {
        try {
            const accessToken = req.cookies['access-token'];
            if (!accessToken) {
                return res.status(401).json({
                    status: 'failed',
                    message: 'Unauthorized! No acces token is provided'
                });
            }

            try {
                const decoded = jwt.verify(accessToken, ENV_VARS.ACCESS_TOKEN);
                const user = await User.findById(decoded.id).select("-password");

                if (!user) {
                    return res.status(401).json({
                        status: 'failed',
                        message: 'Unauthorized! User not found'
                    });
                }

                req.user = user;
                next();
            } catch (error) {
                if(error.name === 'TokenExpiredError')
                {
                    return res.status(401).json({
                        status: 'failed',
                        message: 'Unauthorized! Access token is expired'
                    });
                }
                throw error;
            }
        } catch (error) {
            console.log('Error in protectedRoute middleware : ' + error.message);
            return res.status(500).json({
                status: 'failed',
                message: error.message,
            });
        }
}

export const adminRoute=async(req,res,next)=>{
        if(req.user && req.user.role === 'admin')
        {
            next();
        }
        else
        {
            res.status(403).json({
            status:'failed',
            message:'Forbidden! Only admin can access this route'
            })
        }
}