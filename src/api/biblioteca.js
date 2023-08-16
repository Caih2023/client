import axios from "./axios";

export const getbibliotecasRequest = () => axios.get("/biblioteca");

export const getbibliotecaRequest = (id) => axios.get(`/biblioteca/${id}`);

export const createbibliotecasRequest = async (biblioteca) => {
  try {
    const response = await axios.post("/biblioteca", biblioteca);
    return response.data; // Puedes devolver los datos si es necesario
  } catch (error) {
    console.error("Error en createbibliotecasRequest:", error);
    throw error; // Relanzar el error para que el componente pueda manejarlo
  }
};

export const updatebibliotecasRequest = async (id, biblioteca) => {
  try {
    const response = await axios.put(`/biblioteca/${id}`, biblioteca);
    return response.data; // Puedes devolver los datos si es necesario
  } catch (error) {
    console.error("Error en updatebibliotecasRequest:", error);
    throw error; // Relanzar el error para que el componente pueda manejarlo
  }
};

export const deletebibliotecasRequest = async (id) => {
  try {
    const response = await axios.delete(`/bibliotecas/${id}`);
    return response.data; // Puedes devolver los datos si es necesario
  } catch (error) {
    console.error("Error en deletebibliotecasRequest:", error);
    throw error; // Relanzar el error para que el componente pueda manejarlo
  }
};
