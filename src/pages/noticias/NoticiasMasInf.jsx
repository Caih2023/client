import React from "react";
import { useFetch } from "../useFetch";
import Loading from "../loaders/Loading";
import { Error404 } from "../errors";
import { useParams } from "react-router-dom";

function NoticiasMasInf() {
  const { id } = useParams();

  const url = `https://caih-estadia.vercel.app/api/noticias/${id}`;

  const { data, loading, error } = useFetch(url);

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

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error404 />;
  }
  if (data) {
    const imageCount = data.galeria.length;

    return (
      <div className="text-black bg-gray-200">
        <div className="mx-auto py-12 px-6 lg:px-40 text-justify">
          <div className="max-w-7xl mx-auto">
            <div className="text-black text-base md:text-xl font-medium pb-10">
              <strong>Fecha de publicación: </strong>
              {formatFecha(data.fecha)}
            </div>
            <div className="text-xl lg:text-4xl font-bold mb-2 uppercase text-center pb-6">
              {data.titulo}
            </div>
            <div className="text-black text-xl">
              {data.informacion.split("\n").map((paragraph, index) => (
                <React.Fragment key={index}>
                  {index < imageCount && (
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
                        src={data.galeria[index]}
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
      </div>
    );
  }
}

export default NoticiasMasInf;