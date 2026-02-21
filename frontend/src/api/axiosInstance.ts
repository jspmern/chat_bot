import axios from "axios";
const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8000',
    headers:{}})
    export default axiosInstance