import React, { useEffect } from "react";
// import Portada from "./extraerPortada";
import DescargarLibro from "./descargarLibro";
import { useBibliotecas } from "../../context/bibliotecaContext";

const Biblioteca = () => {
  const {
    Bibliotecas,
    getBibliotecas,
    deleteBiblioteca,
    // Otras funciones que necesitas del contexto
  } = useBibliotecas();

  useEffect(() => {
    // Llama a la función para obtener la lista de bibliotecas
    getBibliotecas();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {Bibliotecas.map((libro, index) => (
        <div
          key={index}
          className="flex flex-wrap justify-center bg-gray-200 rounded-lg p-4 shadow text-black"
        >
          <div className="text-center">
            <img
              src={libro.portada}
              alt="Portada del libro"
              className="mb-4 rounded-lg"
            />
            <img url={libro.portada}/>
            <div className="text-base lg:text-lg font-semibold mb-2 uppercase">
              {libro.titulo}
            </div>
            <div className="text-base lg:text-lg mb-2">
              <strong>Autor: </strong> {libro.autor}
            </div>
            <DescargarLibro
              url={libro.libro}
              nombreArchivo={libro.titulo}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Biblioteca;
