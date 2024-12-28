import Redis from "ioredis"
import { ENV_VARS } from "../env/envVars.js";

export const redis = new Redis(ENV_VARS.REDIS_URI);
