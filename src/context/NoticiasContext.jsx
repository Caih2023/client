import { createContext, useContext, useState } from "react";
import {
  createNoticiasRequest,
  getNoticiasRequest,
  deleteNoticiasRequest,
  getNoticiaRequest,
  updateNoticiasRequest,
  getNoticiasFull,
} from "../api/noticias";

const NoticiasContext = createContext();

export const useNoticias = () => {
  const context = useContext(NoticiasContext);

  if (!context) {
    throw new Error("las noticias deben ser usadas dentro de noticiasprovider");
  }
  return context;
};

export const NoticiasProvider = ({ children }) => {
  const [noticias, setNoticias] = useState([]);

  const getNoticias = async () => {
    const res = await getNoticiasRequest();
    try {
      setNoticias(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createNoticia = async (noticia) => {
    const res = await createNoticiasRequest(noticia);
    console.log(res);
  };

  const deleteNoticia = async (id) => {
    try {
      const res = await deleteNoticiasRequest(id);
      if (res.status === 204)
        setNoticias(noticias.filter((noticia) => noticia._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getNoticia = async (id) => {
    try {
      const res = await getNoticiaRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateNoticia = async (id, noticia) => {
    try {
      await updateNoticiasRequest(id, noticia);
    } catch (error) {
      console.log(error);
    }
  };

  const getNoticiasPublicas = async () => {
    const res = await getNoticiasFull();
    try {
      setNoticias(res.data);
    } catch (error) {}
  };

  return (
    <NoticiasContext.Provider
      value={{
        noticias,
        getNoticias,
        createNoticia,
        deleteNoticia,
        getNoticia,
        updateNoticia,
        getNoticiasPublicas
      }}
    >
      {children}
    </NoticiasContext.Provider>
  );
};
