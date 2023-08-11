import { useNoticias } from "../context/NoticiasContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NoticiaCard({ noticia }) {
  const { deleteNoticia } = useNoticias();
  const [textLongitude, setTextLongitude] = useState(getTextLongitude);

  function getTextLongitude() {
    const windowWidth = window.innerWidth;
    if (windowWidth < 370) {
      // Dispositivos móviles
      return 216;
    } else if (windowWidth < 420) {
      // Tabletas
      return 236;
    } else if (windowWidth < 640) {
      // Tabletas
      return 274;
    } else if (windowWidth < 768) {
      // Tabletas
      return 420;
    } else if (windowWidth < 900) {
      // Tabletas
      return 296;
    } else if (windowWidth < 1024) {
      // Tabletas
      return 360;
    } else if (windowWidth < 1080) {
      // Tabletas
      return 167;
    } else if (windowWidth < 1226) {
      // Tabletas
      return 188;
    } else if (windowWidth < 1652) {
      // Tabletas
      return 200;
    } else {
      // Escritorio
      return 405;
    }
  }

  function formatFecha(fecha) {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1;
    const anio = fechaObj.getFullYear();

    const diaStr = dia < 10 ? `0${dia}` : dia;
    const mesStr = mes < 10 ? `0${mes}` : mes;

    return `${diaStr}/${mesStr}/${anio}`;
  }

  useEffect(() => {
    function handleResize() {
      setTextLongitude(getTextLongitude());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="card1">
      <div className="w-full  md:w-2/5 p-4 flex items-center">
        <img
          className="w-full h-full object-cover rounded-2xl"
          src={noticia.foto[0]}
          alt=""
          // className="max-w-full h-auto"
        />
      </div>
      <div className="w-full md:w-3/5 flex flex-col justify-between p-4">
        <>
          <div className="mb-4 relative">
            <div className="text-black text-xl font-bold mb-2 uppercase">
              {noticia.titulo}
            </div>
            <p className="text-black text-base h-40 pr-2 py-2 overflow-hidden">
              {truncateText(
                noticia.descripcion,
                textLongitude,
                noticia.descripcion
              )}
              {
                <span>
                  {" "}
                  <Link
                    className="text-blue-700 hover:underline"
                    to={`/noticias-mas-inf/${noticia._id}`}
                  >
                    Ver más
                  </Link>
                </span>
              }
            </p>
          </div>
        </>
        <div className="flex flex-wrap">
          <span className="text-base font-medium">
            <strong>Fecha de publicación: </strong>
            {formatFecha(noticia.fecha)}
          </span>
          <div className="flex flex-wrap items-center">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1"
              onClick={() => {
                deleteNoticia(noticia._id);
              }}
            >
              Eliminar
            </button>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
              to={`/mi-noticia/${noticia._id}`}
            >
              Editar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function truncateText(text, maxLength, textNoticia) {
  if (text.length <= maxLength) {
    return text;
  }
  return (
    text.substr(0, maxLength) + (textNoticia.length > maxLength ? "..." : "")
  );
}

export default NoticiaCard;
