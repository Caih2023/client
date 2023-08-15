import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";

function compareStatus(a, b) {
  const statusOrder = { activo: 1, inactivo: 2, rechazado: 3 };
  return statusOrder[a.status] - statusOrder[b.status];
}

function ValidarUsuarios() {
  const { getUsersPublic, usuarios } = useAuth();

  useEffect(() => {
    getUsersPublic();
  }, []);

  const usuariosOrdenados =
    usuarios.length > 0 ? [...usuarios].sort(compareStatus) : [];

  if (usuariosOrdenados.length === 0) {
    return <h1>No se encontró ningún usuario</h1>;
  }

  const activos = usuariosOrdenados.filter(
    (usuario) => usuario.status === "activo"
  );
  const inactivos = usuariosOrdenados.filter(
    (usuario) => usuario.status === "inactivo"
  );
  const rechazados = usuariosOrdenados.filter(
    (usuario) => usuario.status === "rechazado"
  );

  return (
    <div>
      {/* activos */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 border-r pr-4">
          <h3 className="font-semibold mb-2">Usuarios Activos</h3>
          {activos.map((usuario) => (
            <div
              key={usuario._id}
              className="mb-6 bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex-auto mt-4">
                <p className="font-semibold text-lg mb-1 text-gray-900">
                  {usuario.nombre} {usuario.apellidoP} {usuario.apellidoM}
                </p>
                <p className="text-gray-600 mb-2">Estado: {usuario.status}</p>
                <Link to={`/dashboard/usuario/${usuario._id}`}>
                  <button className="m-1 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300">
                    Ver más informacion
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* inactivos */}
        <div className="col-span-1 border-r pr-4">
          <h3 className="font-semibold mb-2">Usuarios Inactivos</h3>
          {inactivos.map((usuario) => (
            <div
              key={usuario._id}
              className="mb-6 bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex-auto mt-4">
                <p className="font-semibold text-lg mb-1 text-gray-900">
                  {usuario.nombre} {usuario.apellidoP} {usuario.apellidoM}
                </p>
                <p className="text-gray-600 mb-2">Estado: {usuario.status}</p>
                <Link to={`/dashboard/usuario/${usuario._id}`}>
                  <button className="m-1 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300">
                    Ver más informacion
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* Rechazados */}
        <div className="col-span-1 border-r pr-4">
          <h3 className="font-semibold mb-2">Usuarios Rechazados</h3>
          {rechazados.map((usuario) => (
            <div
              key={usuario._id}
              className="mb-6 bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex-auto mt-4">
                <p className="font-semibold text-lg mb-1 text-gray-900">
                  {usuario.nombre} {usuario.apellidoP} {usuario.apellidoM}
                </p>
                <p className="text-gray-600 mb-2">Estado: {usuario.status}</p>
                <Link to={`/dashboard/usuario/${usuario._id}`}>
                  <button className="m-1 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300">
                    Ver más informacion
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster reverseOrder={true} />
    </div>
  );
}

export default ValidarUsuarios;
