import axios from "axios";

const instance = axios.create({
  baseURL: "https://site-caih.vercel.app/api",
  withCredentials: true,
});

export default instance;
