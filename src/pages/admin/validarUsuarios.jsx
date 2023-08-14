import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function compareStatus(a, b) {
  // Definimos el orden de estados (activo < inactivo < rechazado)
  const statusOrder = { activo: 1, inactivo: 2, rechazado: 3 };

  // Comparamos los usuarios según el orden de sus estados
  return statusOrder[a.status] - statusOrder[b.status];
}

function ValidarUsuarios() {
  const { getUsersPublic, usuarios } = useAuth();
  console.log(usuarios);
  useEffect(() => {
    getUsersPublic();
  }, []);

  // Ordenamos los usuarios según el estado
  const usuariosOrdenados = [...usuarios].sort(compareStatus);

  if (usuariosOrdenados.length === 0) {
    return <h1>No se encontró ningún usuario</h1>;
  }
  if (usuariosOrdenados.length > 0) {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">Lista de Usuarios</h2>
        <div className="card-cols">
          {usuariosOrdenados.map((usuario) => (
            <div
              key={usuario._id}
              className="flex-1 bg-black rounded-lg shadow p-4 mb-4"
            >
              <p>
                {usuario.nombre} {usuario.apellidoP} {usuario.apellidoM}
              </p>
              <p>Estado: {usuario.status}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Lista de Usuarios</h2>
      <div className="card-cols">
        {usuariosOrdenados.map((usuario) => (
          <div
            key={usuario._id}
            className="flex-1 bg-black rounded-lg shadow p-4 mb-4"
          >
            <p>
              {usuario.nombre} {usuario.apellidoP} {usuario.apellidoM}
            </p>
            <p>Estado: {usuario.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ValidarUsuarios;
