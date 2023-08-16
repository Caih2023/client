import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-caih2023.vercel.app/api",
  withCredentials: true,
});

export default instance;
