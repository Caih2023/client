import axios from "./axios";

export const getNoticiasRequest = () => axios.get("/noticias");

export const getNoticiaRequest = (id) => axios.get(`/noticias/${id}`);

export const createNoticiasRequest = (noticia) =>
  axios.post("/noticias", noticia);

export const updateNoticiasRequest = (id, noticia) =>
  axios.put(`/noticias/${id}`, noticia);

export const deleteNoticiasRequest = (id) => axios.delete(`/noticias/${id}`);

export const getNoticiasFull = () => axios.get("noticias-publicas");
