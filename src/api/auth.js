import axios from "./axios";
import toast from "react-hot-toast";

export const registerRequest = async (usuario) => {
  try {
    const response = await axios.post(`/register`, usuario);
    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error de solicitud:", error.message);
    console.error("Respuesta del servidor:", error.response.data.error); // Imprimir el arreglo de errores
    throw error;
  }
};

export const loginRequest = async (usuario) => {
  try {
    const response = await axios.post(`/login`, usuario);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message); // Imprimir el arreglo de errores
    throw error;
  }
};

export const verityTokenRequet = async () => {
  try {
    const response = await axios.get("/verify");
    return response.data;
  } catch (error) {
    if (Array.isArray(error.response.data)) {
      error.response.data.forEach((error) => toast.error(error));
    } else {
      toast.error(error.response.data.message);
    }
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get("/getallusers");
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateStatusRequest = async (userId, newStatus) => {
  try {
    const response = await axios.put(`/updatestatus/${userId}`, { newStatus });
    return response;
  } catch (error) {
    console.error("Error en la solicitud de actualización de estado:", error);
    throw error;
  }
};

export const perfil = async (id) => {
  try {
    const res = await axios.get(`/profile/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
