import { createContext, useContext, useState } from "react";
import {
  createbibliotecasRequest,
  updatebibliotecasRequest,
  getbibliotecaRequest,
  getbibliotecasRequest,
  deletebibliotecasRequest,
} from "../api/biblioteca";

const BibliotecasContext = createContext();

export const useBibliotecas = () => {
  const context = useContext(BibliotecasContext);

  if (!context) {
    throw new Error(
      "las Bibliotecas deben ser usadas dentro de Bibliotecasprovider"
    );
  }
  return context;
};

export const BibliotecasProvider = ({ children }) => {
  const [Bibliotecas, setBibliotecas] = useState([]);

  const getBibliotecas = async () => {
    const res = await getbibliotecasRequest();
    try {
      setBibliotecas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createBiblioteca = async (Biblioteca) => {
    const res = await createbibliotecasRequest(Biblioteca);
    console.log(res);
  };

  const deleteBiblioteca = async (id) => {
    try {
      const res = await deletebibliotecasRequest(id);
      if (res.status === 204)
        setBibliotecas(
          Bibliotecas.filter((Biblioteca) => Biblioteca._id !== id)
        );
    } catch (error) {
      console.log(error);
    }
  };

  const getBiblioteca = async (id) => {
    try {
      const res = await getbibliotecaRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateBiblioteca = async (id, Biblioteca) => {
    try {
      await updatebibliotecasRequest(id, Biblioteca);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BibliotecasContext.Provider
      value={{
        Bibliotecas,
        getBibliotecas,
        createBiblioteca,
        deleteBiblioteca,
        getBiblioteca,
        updateBiblioteca,
      }}
    >
      {children}
    </BibliotecasContext.Provider>
  );
};
