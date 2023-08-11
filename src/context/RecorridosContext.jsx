import { createContext, useContext, useState } from "react";
import {
  createrecorridosRequest,
  getrecorridosRequest,
  getrecorridoRequest,
  updaterecorridosRequest,
  deleterecorridosRequest,
  getrecorridosFull,
} from "../api/recorridos";
import toast from "react-hot-toast";

const RecorridosContext = createContext();

export const useRecorridos = () => {
  const context = useContext(RecorridosContext);

  if (!context) {
    throw new Error(
      "los Recorridos deben ser usadas dentro de Recorridosprovider"
    );
  }
  return context;
};

export const RecorridosProvider = ({ children }) => {
  const [Recorridos, setRecorridos] = useState([]);

  const getRecorridos = async () => {
    const res = await getrecorridosRequest();
    try {
      setRecorridos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createRecorrido = async (recorrido) => {
    //si el reporte se creo que envie un mensaje
    const res = await createrecorridosRequest(recorrido);
    try {
      toast.success("Reporte enviado con exito");
    } catch (error) {
      console.log(error);
      if (Array.isArray(error.response.data)) {
        error.response.data.forEach((error) => toast.error(error));
      } else {
        toast.error(error.response.data.message);
      }
    }
    // console.log(res);
  };

  const deleteRecorrido = async (id) => {
    try {
      const res = await deleterecorridosRequest(id);
      if (res.status === 204)
        setRecorridos(Recorridos.filter((Recorrido) => Recorrido._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getRecorrido = async (id) => {
    try {
      const res = await getrecorridoRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateRecorrido = async (id, Recorrido) => {
    try {
      await updaterecorridosRequest(id, Recorrido);
    } catch (error) {
      console.log(error);
    }
  };

  const getRecorridosPublicas = async () => {
    const res = await getrecorridosFull();
    try {
      setRecorridos(res.data);
    } catch (error) {}
  };

  return (
    <RecorridosContext.Provider
      value={{
        Recorridos,
        getRecorridos,
        createRecorrido,
        deleteRecorrido,
        getRecorrido,
        updateRecorrido,
        getRecorridosPublicas,
      }}
    >
      {children}
    </RecorridosContext.Provider>
  );
};
