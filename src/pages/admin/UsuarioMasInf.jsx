import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Asegúrate de importar el contexto correctamente

function UsuarioMasInf() {
  const { id } = useParams();
  const { getUserProfile } = useAuth();
  const [userData, setUserData] = useState(null);
  const { getUsersPublic, usuarios, updateStatus } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const userProfile = await getUserProfile(id);
        setUserData(userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }

    fetchUserProfile();
  }, [id, getUserProfile]);

  const handleSelectAndUpdateStatus = async (userId, newStatus) => {
    setSelectedUserId(userId);
    await updateStatus(userId, newStatus); // Llama a la función de actualización directamente
    // toast.success("Estado actualizado exitosamente");

    getUsersPublic();
    // console.log("Estado actualizado exitosamente");
  };

  return (
    <div>
      <h2>Detalles del Usuario</h2>
      {userData ? (
        <div>
          <p>Nombre: {userData.nombre}</p>
          <p>Apellido Paterno: {userData.apellidoP}</p>
          <p>Apellido Materno: {userData.apellidoM}</p>
          <p>Estado: {userData.status}</p>
          <button
            onClick={() => handleSelectAndUpdateStatus(id, "inactivo")}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          >
            Desactivar
          </button>
          <button
            onClick={() => handleSelectAndUpdateStatus(id, "activo")}
            className="m-1 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          >
            Activar
          </button>
          <button
            onClick={() => handleSelectAndUpdateStatus(id, "rechazado")}
            className="m-1 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          >
            Rechazar
          </button>
        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}

      <Link to="/dashboard/validacionusuarios" className="mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
          Regresar a Usuarios
        </button>
      </Link>
    </div>
  );
}

export default UsuarioMasInf;
