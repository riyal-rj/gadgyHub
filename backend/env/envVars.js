import dotenv from 'dotenv';
dotenv.config();

const DB_URI=process.env.MONGO_URI.replace('<db_password>',process.env.MONGO_PASSCODE);
export const ENV_VARS= {
    MONGO_URI:DB_URI,
    PORT:process.env.PORT ||1234,
    JWT_SECRET:process.env.JWT_SECRET,
    NODE_ENV:process.env.NODE_ENV,
}