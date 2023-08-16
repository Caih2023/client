import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Asegúrate de importar el contexto correctamente

function UsuarioMasInf() {
  const { id } = useParams();
  const { getUserProfile } = useAuth();
  const [userData, setUserData] = useState(null);
  const { getUsersPublic, updateStatus, updateUsuarioContext } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState(null);
  // correo
  // const [to, setTo] = useState("");
  const generateRandomPassword = (length) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const contras = generateRandomPassword(8);
  const to = userData ? userData.correo : ""; // Initialize to an empty string if userData is null
  const subject = "Aceptacion de solicitud caih";
  const text = "Tu contraseña es:\n" + contras;

  const handleSubmitEmail = async () => {
    // e.preventDefault();

    const response = await fetch("http://localhost:4000/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, text }),
    });

    if (response.status === 200) {
      alert("Correo electrónico enviado con éxito");
    } else {
      alert("Error al enviar el correo electrónico");
    }
  };
  // hasta aqui correo

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

  const handelButtonClick = () => {
    handleSelectAndUpdateStatus(id, "activo");
    handleSubmitEmail();
    updateUsuarioContext(id, { contraseña: contras });
  };

  const formatDate = (dateString) => {
    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    return `${day} de ${months[month]} de ${year}`;
  };

  return (
    <div className="bg-gray-500 rounded-lg shadow-lg p-6 text-center">
      <h2 className="text-2xl font-semibold mb-6">Detalles del Usuario</h2>
      {userData ? (
        <div>
          <img
            src={userData.imagen[0]}
            alt="Imagen de perfil"
            className="w-40 h-40 mx-auto rounded-full mb-4"
          />
          <p className="mb-2">
            <span className="font-semibold">Nombre:</span> {userData.nombre}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Apellido Paterno:</span>{" "}
            {userData.apellidoP}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Apellido Materno:</span>{" "}
            {userData.apellidoM}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Correo:</span> {userData.correo}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Curriculum vitae:</span>{" "}
            <a
              className="text-blue-500"
              href={userData.cv[0]}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Ver CV (PDF)
            </a>
          </p>
          <p>
            Proyecto personal:{" "}
            <a
              className="text-blue-500"
              href={userData.proyectoP[0]} // Asegúrate de que cv[0] sea la URL correcta del CV en la nube
              target="_blank"
              rel="noopener noreferrer"
              download // Esto permite que el enlace se descargue como un archivo
            >
              Ver Proyecto (PDF)
            </a>
          </p>
          <p>
            Titulo maximo de estudios:{" "}
            <a
              className="text-blue-500"
              href={userData.tituloMEstudios[0]} // Asegúrate de que cv[0] sea la URL correcta del CV en la nube
              target="_blank"
              rel="noopener noreferrer"
              download // Esto permite que el enlace se descargue como un archivo
            >
              Ver Titulo de estudios (PDF)
            </a>
          </p>
          <p>Telefono: {userData.telefono}</p>
          <p>Fecha de nacimiento: {formatDate(userData.fechaN)}</p>
          <p>Trabajo actual_ {userData.trabajoA}</p>
          <p>Estado: {userData.status}</p>
     
          {/* Botones de acción */}
          {userData.status === "activo" ? (
            <button
              onClick={() => handleSelectAndUpdateStatus(id, "inactivo")}
              className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
            >
              Desactivar
            </button>
          ) : userData.status === "inactivo" ? (
            <>
              <button
                onClick={() => handelButtonClick()}
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
            </>
          ) : (
            <button
              onClick={() => handleSelectAndUpdateStatus(id, "rechazado")}
              className="m-1 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
            >
              Rechazar
            </button>
          )}
        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}

      <Link to="/dashboard/validacionusuarios" className="mt-4">
        <button className="m-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
          Regresar a Usuarios
        </button>
      </Link>
    </div>
  );
}

export default UsuarioMasInf;
