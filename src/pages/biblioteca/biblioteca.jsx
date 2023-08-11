import React from "react";
import data from "./data.json";
import Portada from "./extraerPortada";
import DescargarLibro from "./descargarLibro";

const Biblioteca = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {data.Biblioteca.map((Biblioteca, index) => (
        <div
          key={index}
          className=" flex flex-wrap justify-center bg-gray-200 rounded-lg p-4 shadow"
        >
          <div className="text-center">
            <img
              src={Biblioteca.portada}
              alt="Portada del libro"
              className="mb-4"
            />
            <Portada url={Biblioteca.portada} nomLibro={Biblioteca.titulo} />
            <div className="text-base lg:text-lg font-semibold mb-2 uppercase">
              {Biblioteca.titulo}
            </div>
            <div className="text-base lg:text-lg mb-2">
              <strong>Autor: </strong> {Biblioteca.autor}
            </div>
            <DescargarLibro
              url={Biblioteca.libro}
              nombreArchivo={Biblioteca.titulo}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Biblioteca;
