import { useNoticias } from "../context/NoticiasContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NoticiasCardPublic({ noticia }) {
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
      <div className="w-full h-64 md:w-2/3 lg:w-full xl:w-2/3 flex items-center">
        <img
          className="w-full h-full object-cover rounded-2xl"
          src={noticia.foto[0]}
          alt={noticia.titulo}
        />
      </div>
      <div className="w-full justify-between mt-4 md:mt-0 md:ms-4 lg:ms-0 xl:ms-4">
        <>
          <div className="md:ps-3 lg:ps-0 xl:ps-3 lg:pt-4 xl:pt-0">
            <div className="text-black text-xl text-center font-bold uppercase mb-2 md:mb-0">
              {noticia.titulo}
            </div>
            <p className="text-black text-base pb-5 overflow-hidden">
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

            <div className="flex justify-between">
              <span className="text-black text-base font-medium">
                <strong>Fecha de publicación: </strong>
                {formatFecha(noticia.fecha)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-black text-base font-medium">
                <strong>Autor: </strong>
                {noticia.usuario &&
                noticia.usuario.nombre &&
                noticia.usuario.apellidoP
                  ? noticia.usuario.nombre + " " + noticia.usuario.apellidoP
                  : "Autor desconocido"}
              </span>
            </div>
          </div>
        </>
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

export default NoticiasCardPublic;
