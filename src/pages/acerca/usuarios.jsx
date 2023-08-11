import { useFetch } from "../useFetch";
import {Loading} from "../loaders";
import {Error404} from "../errors";
import { Link } from "react-router-dom";

function usuarios() {
  const { data, loading, error } = useFetch(
    "https://caih-estadia-2i4svck5t-caih2023.vercel.app/api/usuarios"
  );

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error404 />;
  }
  if (data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5 sm:gap-10 p-5 sm:p-10 text-justify">
        {data &&
          data.map((usuario) => (
            <div
              key={usuario.id}
              className="flex flex-col text-black items-center bg-gray-200 rounded-xl overflow-hidden shadow-lg mb-5 py-3"
            >
              <img
                className="w-auto h-40 lg:h-44 m-5 rounded-full shadow-lg shadow-gray-700"
                src={usuario.imagen}
                alt={usuario.nombre}
              />
              <div className="flex flex-col justify-center">
                <div className="px-6 py-1 text-center">
                  <div className="text-xl lg:text-2xl font-bold mb-2 uppercase">
                    {usuario.nombre} {usuario.apellidoP} {usuario.apellidoM}
                  </div>
                </div>

                <div className="flex flex-col justify-center px-4 pt-1 pb-5 text-center">
                  <span className="span m-2">
                    <strong>Título:</strong> {usuario.tituloMEstudios}
                  </span>
                  <span className="span m-2">
                    <strong>Trabajo Actual:</strong> {usuario.trabajoA}
                  </span>
                  <span className="span m-2">
                    <strong>Proyectos:</strong>{" "}
                    <Link className="hover:text-blue-700 hover:underline" to="">
                      {usuario.proyectoP}
                    </Link>
                  </span>
                  <span className="span m-2">
                    <strong>Publicaciones:</strong>{" "}
                    <Link className="hover:text-blue-700 hover:underline" to="">
                      {usuario.publicaciones}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default usuarios;
