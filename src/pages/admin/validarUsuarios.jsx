import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function compareStatus(a, b) {
  // Definimos el orden de estados (activo < inactivo < rechazado)
  const statusOrder = { activo: 1, inactivo: 2, rechazado: 3 };

  // Comparamos los usuarios según el orden de sus estados
  return statusOrder[a.status] - statusOrder[b.status];
}

function ValidarUsuarios() {
  const { getUsersPublic, usuarios, validarUsers } = useAuth();

  useEffect(() => {
    getUsersPublic();
  }, []);

  // Ordenamos los usuarios según el estado
  const usuariosOrdenados = [...usuarios].sort(compareStatus);

  if (usuariosOrdenados.length === 0) {
    return <h1>No se encontró ningún usuario</h1>;
  }
  const handleStatusChange = async (userId, newStatus) => {
    try {
      await validarUsers(userId, newStatus); // Llamar a la función de contexto
      getUsersPublic(); // Actualizar la lista de usuarios después del cambio
    } catch (error) {
      // Manejar el error si es necesario
    }
  };

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
      <h2 className="text-lg font-semibold mb-4">Lista de Usuarios</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 border-r pr-4">
          <h3 className="font-semibold mb-2">Usuarios Activos</h3>
          {activos.map((usuario) => (
            <div key={usuario._id} className="mb-4">
              <p>
                {usuario.nombre} {usuario.apellidoP} {usuario.apellidoM}
              </p>
              <p>Estado: {usuario.status}</p>
              <button
                onClick={() => handleStatusChange(usuario._id, "inactivo")}
              >
                Desactivar
              </button>
              <button
                onClick={() => handleStatusChange(usuario._id, "rechazado")}
              >
                Rechazar
              </button>
            </div>
          ))}
        </div>
        <div className="col-span-1 border-r pr-4">
          <h3 className="font-semibold mb-2">Usuarios Inactivos</h3>
          {inactivos.map((usuario) => (
            <div key={usuario._id} className="mb-4">
              <p>
                {usuario.nombre} {usuario.apellidoP} {usuario.apellidoM}
              </p>
              <p>Estado: {usuario.status}</p>
            </div>
          ))}
        </div>
        <div className="col-span-1">
          <h3 className="font-semibold mb-2">Usuarios Rechazados</h3>
          {rechazados.map((usuario) => (
            <div key={usuario._id} className="mb-4">
              <p>
                {usuario.nombre} {usuario.apellidoP} {usuario.apellidoM}
              </p>
              <p>Estado: {usuario.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ValidarUsuarios;
