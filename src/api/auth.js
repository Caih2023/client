import axios from "./axios";

export const registerRequest = async (usuario) => {
  try {
    const response = await axios.post(`/register`, usuario);
    return response.data;
  } catch (error) {
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
    // console.error(error.response.data); // Imprimir el arreglo de errores
    throw error;
  }
};

export const verityTokenRequet = async () => {
  try {
    const response = await axios.get("/verify");
    return response.data;
  } catch (error) {
    console.error("Error de solicitud:", error.message);
    console.error("Respuesta del servidor:", error.response.data.error); // Imprimir el arreglo de errores
    throw error;
  }
};
