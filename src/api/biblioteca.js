import axios from "./axios";

export const getrecorridosRequest = () => axios.get("/recorridos");

export const getrecorridoRequest = (id) => axios.get(`/recorridos/${id}`);

export const createrecorridosRequest = async (recorrido) => {
  try {
    const response = await axios.post("/recorrido", recorrido);
    return response.data; // Puedes devolver los datos si es necesario
  } catch (error) {
    console.error("Error en createrecorridosRequest:", error);
    throw error; // Relanzar el error para que el componente pueda manejarlo
  }
};

export const updaterecorridosRequest = async (id, recorrido) => {
  try {
    const response = await axios.put(`/recorridos/${id}`, recorrido);
    return response.data; // Puedes devolver los datos si es necesario
  } catch (error) {
    console.error("Error en updaterecorridosRequest:", error);
    throw error; // Relanzar el error para que el componente pueda manejarlo
  }
};

export const deleterecorridosRequest = async (id) => {
  try {
    const response = await axios.delete(`/recorridos/${id}`);
    return response.data; // Puedes devolver los datos si es necesario
  } catch (error) {
    console.error("Error en deleterecorridosRequest:", error);
    throw error; // Relanzar el error para que el componente pueda manejarlo
  }
};

export const getrecorridosFull = () => axios.get("recorridos-publicas");
