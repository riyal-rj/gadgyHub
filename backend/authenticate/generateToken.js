import jwt from "jsonwebtoken";
import { ENV_VARS } from "../env/envVars.js";

export const generateToken = (id) => {
    const accessToken = jwt.sign({ id }, ENV_VARS.ACCESS_TOKEN, {
        expiresIn:'15m'
    })
    const refreshToken = jwt.sign({ id }, ENV_VARS.REFRESH_TOKEN, {
        expiresIn:'7d'
    })
    return {accessToken,refreshToken};
}


