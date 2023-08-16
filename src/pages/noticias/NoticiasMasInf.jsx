import React from "react";
import { useFetch } from "../useFetch";
import Loading from "../loaders/Loading";
import { useEffect } from "react";

import { Error404 } from "../errors";
import { useParams } from "react-router-dom";

import { useNoticias } from "../../context/NoticiasContext";

function NoticiasMasInf() {
  const { id } = useParams();

  const { getNoticiasPublicas, noticias } = useNoticias();
  function formatFecha(fecha) {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate() + 1;
    const mes = fechaObj.getMonth();
    const anio = fechaObj.getFullYear();

    const diaStr = dia < 10 ? `0${dia}` : dia;
    const mesStr = meses[mes];

    return `${diaStr} de ${mesStr} del ${anio}`;
  }
  useEffect(() => {
    getNoticiasPublicas(id);
  }, []); // Include id and getNoticiasPublicas in the dependency array

  if (noticias.length === 0) return <h1>No se encontró ninguna noticia</h1>;

  const newsArticle = noticias.find((article) => article._id === id);
  if (!newsArticle) return <h1>No se encontró la noticia especificada</h1>;

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
    <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl">
      <div className="text-black text-base md:text-xl font-medium pb-6">
        <strong>Fecha de publicación: </strong>
        {formatFecha(newsArticle.fecha)}
      </div>
      <div className="text-xl lg:text-4xl font-bold mb-4 uppercase">
        {newsArticle.titulo}
      </div>
      <div className="text-black text-xl">
        {newsArticle.descripcion.split("\n").map((paragraph, index) => (
          <React.Fragment key={index}>
            {index < newsArticle.foto.length && (
              <div
                className={`${
                  index % 2 === 1
                    ? "mx-auto text-center"
                    : "float-left mr-4 mb-4 md:mb-1 mt-3"
                }`}
                style={{
                  maxWidth: index % 2 === 0 ? "20rem" : "36rem",
                  maxHeight: index % 2 === 0 ? "16rem" : "28rem",
                }}
              >
                <img
                  src={newsArticle.foto[index]}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
            )}
            <div>{paragraph}</div>
            <br style={{ clear: "both" }} />
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
  
  );
}

export default NoticiasMasInf;
