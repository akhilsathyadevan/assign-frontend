import axios from "axios";
import CONSTANTS from "../constants";
const axiosInstance = axios.create({
  baseURL: CONSTANTS.BASE_URL
});
axiosInstance.interceptors.request.use(
  config => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.gw7m0eu3gxSoavEQa4aIt48YZVQz_EsuZ0nJDrjXKuI';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;