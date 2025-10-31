import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // your NestJS backend
    withCredentials: true,
});

export default API;
