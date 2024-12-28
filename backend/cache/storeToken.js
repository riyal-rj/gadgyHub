import { redis } from "./redis.config.js";

export const storeRefreshToken = async(id,refreshToken) => {
    await redis.set(`refreshToken:${id}`,refreshToken,'EX',7*24*60*60);
}
