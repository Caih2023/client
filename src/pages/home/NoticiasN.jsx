import { useFetch } from "../useFetch";
import { useState, useEffect } from "react";
import Loading from "../loaders/Loading";
import { Error404 } from "../errors";
import { Link } from "react-router-dom";
import Imagenes from "./ImgInicio";

function NoticiasN() {
  const urlocal = `http://localhost:3000/api/noticias`;
  const url = "http://localhost:4000/api/noticias-publicas";

  const { data, loading, error } = useFetch(url);

  const [textLongitude, setTextLongitude] = useState(getTextLongitude);

  function getTextLongitude() {
    const windowWidth = window.innerWidth;
    // TODAVIA FALTA CHECAR BIEN
    if (windowWidth < 380) {
      // Dispositivos móviles
      return 196;
    } else if (windowWidth < 640) {
      // Dispositivos móviles
      return 198;
    } else if (windowWidth < 768) {
      // sm
      return 403;
    } else if (windowWidth < 1024) {
      // md
      return 497;
    } else if (windowWidth < 1280) {
      // lg
      return 242;
    } else if (windowWidth < 1536) {
      // Tabletas xl
      return 283;
    } else {
      // Escritorio 2xl
      return 376;
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

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error404 />;
  }
  if (data) {
    // Ordenar las noticias por fecha de forma descendente
    const noticiasOrdenadas = data.sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );

    // Limitar el número de noticias a 5
    const primerasNoticias = noticiasOrdenadas.slice(0, 3);

    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-10 p-5 sm:p-10 text-justify">
          {primerasNoticias.map((noticia) => (
            <div
              className="flex flex-col bg-gray-200 rounded-xl overflow-hidden shadow-lg mb-5 md:flex-row"
              key={noticia._id}
            >
              <div className="w-full">
                <div className="px-8 py-6">
                  <div className="text-black text-xl lg:text-xl text-center font-bold mb-2 uppercase">
                    {noticia.titulo}
                  </div>
                  <div className="w-full">
                    <img
                      className="w-full h-52 sm:h-72 lg:h-52 rounded-2xl"
                      src={noticia.foto[0]}
                      alt={noticia.titulo}
                    />
                  </div>
                  <p className="text-black text-base py-4 relative overflow-hidden">
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

                  <div className="flex justify-between pb-3">
                    <span className="text-black text-base font-medium">
                      <strong>Fecha de publicación: </strong>{" "}
                      {formatFecha(noticia.fecha)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

function truncateText(text, maxLength, textNoticia) {
  if (text.length <= maxLength) {
    return text;
  }
  return (
    text.substr(0, maxLength) + (textNoticia.length > maxLength ? "..." : "")
  );
}

export default NoticiasN;
