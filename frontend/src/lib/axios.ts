import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE ==='developement'?"http://localhost:1234/api":'/api',
    withCredentials:true, //send cookies with true
});

export default axiosInstance;