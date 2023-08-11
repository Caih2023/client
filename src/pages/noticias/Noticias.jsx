import { useFetch } from "../useFetch";
import { useState, useEffect } from "react";
import { Loading } from "../loaders";
import { Error404 } from "../errors";
import { Link } from "react-router-dom";

function Noticias() {
  const { data, loading, error } = useFetch(
    "https://caih-estadia.vercel.app/api/noticias"
  );

  const [textLongitude, setTextLongitude] = useState(getTextLongitude);

  function getTextLongitude() {
    const windowWidth = window.innerWidth;
    // TODAVIA FALTA CHECAR BIEN
    if (windowWidth < 640) {
      // Dispositivos móviles
      return 319;
    } else if (windowWidth < 768) {
      // sm
      return 471;
    } else if (windowWidth < 1024) {
      // md
      return 376;
    } else if (windowWidth < 1280) {
      // lg
      return 410;
    } else if (windowWidth < 1536) {
      // Tabletas xl
      return 265;
    } else {
      // Escritorio 2xl
      return 337;
    }
  }

  function formatFecha(fecha) {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate() + 1;
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
    return (
      <div className="card-cols">
        {data.map((noticia, index) => (
          <div key={index} className="card1">
            <div className="w-full md:w-2/3 lg:w-full xl:w-2/3 flex items-center">
              <img
                className="w-full h-64 sm:h-80 md:h-64 lg:h-56 rounded-2xl"
                src={noticia.galeria[0]}
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
                      noticia.informacion,
                      textLongitude,
                      noticia.informacion
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
                </div>
              </>
            </div>
          </div>
        ))}
      </div>
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

export default Noticias;
