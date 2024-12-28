import dotenv from 'dotenv';
dotenv.config();

//primary database
const DB_URI = process.env.MONGO_URI.replace('<db_password>', process.env.MONGO_PASSCODE);

//cache database
const REDIS_DB_URI = process.env.REDIS_URI.replace('<PASSWORD>', process.env.REDIS_PASSCODE)
    .replace('<PORT>', process.env.REDIS_SERVER_PORT);

export const ENV_VARS = {
    MONGO_URI: DB_URI,
    PORT: process.env.PORT || 1234,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
    REDIS_URI: REDIS_DB_URI,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET_KEY: process.env.CLOUDINARY_API_SECRET_KEY
}