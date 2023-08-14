import { useAuth } from "../../context/AuthContext";

function validarUsuarios() {
  const { getUsersPublic, usuarios } = useNoticias();

  useEffect(() => {
    getUsersPublic();
  }, []);
  if (usuarios.length == 0) return <h1>No se encontro ninguna usuario</h1>;

  return (
    <div>
      <Navbar />
      <div className="card-cols">
        {usuarios.map((usuario) => (
          <div className="flex-1 bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">lista de usuarios</h2>
            {/* Aquí puedes mostrar la lista de usuarios */}
            <ul>
              <li key={usuario._id}>
                {usuario.nombre} {usuario.apellidoP} {usuario.apellidoM}
              </li>
            </ul>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default validarUsuarios;
