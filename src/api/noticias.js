import axios from "./axios";

export const getNoticiasRequest = async () => {
  try {
    const response = await axios.get("/noticias");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las noticias:", error);
    throw error;
  }
};

export const getNoticiaRequest = async (id) => {
  try {
    const response = await axios.get(`/noticias/`);
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error(`Error al obtener la noticia con ID :`, error);
    throw error;
  }
};

export const createNoticiasRequest = async (noticia) => {
  try {
    const response = await axios.post("/noticias", noticia);
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error("Error al crear la noticia:", error);
    throw error;
  }
};

export const updateNoticiasRequest = async (id, noticia) => {
  try {
    const response = await axios.put(`/noticias/`, noticia);
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error(`Error al actualizar la noticia con ID :`, error);
    throw error;
  }
};

export const deleteNoticiasRequest = async (id) => {
  try {
    const response = await axios.delete(`/noticias/`);
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error(`Error al eliminar la noticia con ID :`, error);
    throw error;
  }
};

export const getNoticiasFull = async () => {
  try {
    const response = await axios.get("noticias-publicas");
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error("Error al obtener las noticias completas:", error);
    throw error;
  }
};
