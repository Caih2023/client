import axios from "./axios";

export const getreportesRequest = () => axios.get("/reportes");

export const getreporteRequest = (id) => axios.get(`/reportes/${id}`);

export const createreportesRequest = (reporte) =>
  axios.post("/reportes", reporte);

export const updatereportesRequest = (id, reporte) =>
  axios.put(`/reportes/${id}`, reporte);

export const deletereportesRequest = (id) => axios.delete(`/reportes/${id}`);

export const getreportesFull = () => axios.get("reportes-publicas");
