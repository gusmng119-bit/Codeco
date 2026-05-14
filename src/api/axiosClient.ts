import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/",
  timeout: 5000,
});

export default axiosClient;
