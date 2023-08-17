import axios from "axios";

const instance = axios.create({
  // baseURL: "https://backend-caih.vercel.app/api",
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default instance;
