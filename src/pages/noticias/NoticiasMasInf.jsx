import React from "react";
import { useFetch } from "../useFetch";
import Loading from "../loaders/Loading";
import { useEffect } from "react";

import { Error404 } from "../errors";
import { useParams } from "react-router-dom";

import { useNoticias } from "../../context/NoticiasContext";

function NoticiasMasInf() {
  const params = useParams();

  const { getNoticiasPublicas, noticias } = useNoticias();

  useEffect(() => {
    getNoticiasPublicas(params.id);
  }, []);
  console.log(params);
  if (noticias.length == 0) return <h1>No se encontro ninguna noticia</h1>;

  // const { data, loading, error } = getNoticiasPublicas(id);

  // if (loading) {
  //   return <Loading />;
  // }
  // if (error) {
  //   return <Error404 />;
  // }
  // if (noticias) {
  return (
    <div className="bg-gray-200">
      <div className="grid grid-cols-1 gap-5 sm:gap-10 p-5 sm:p-10 text-justify">
        <div className="Antes de esto iba el map">
          <div className="scroll-smooth">
            <div className="px-6 py-4">
              <div className="text-xl lg:text-3xl font-bold mb-2 uppercase text-center pb-6">
                {noticias.titulo}
              </div>
              <p className="text-gray-900 text-base lg:text-lg">
                {noticias.descripcion}
              </p>
            </div>

            <div>
              {/* <Imagenes galeria={noticias.foto} tamañoImagen={440} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // }
}

export default NoticiasMasInf;