import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imagen from "../assets/acerca.jpg";
import Navbar from "../components/Navbar";
import Footer from "../context/Footer";

function Register() {
  const [tituloMEstudiosUrl, setTituloMEstudiosUrl] = useState("");
  const [proyectoPUrl, setProyectoPUrl] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    const { tituloMEstudios, proyectoP, imagen } = values;

    // Subir archivos y obtener las URL
    const tituloMEstudiosUrl = await handleDrop(tituloMEstudios[0]);
    const proyectoPUrl = await handleDrop(proyectoP[0]);
    const imagenUrl = await handleDrop(imagen[0]);

    // Guardar las URL en el estado
    setTituloMEstudiosUrl(tituloMEstudiosUrl);
    setProyectoPUrl(proyectoPUrl);
    setImagenUrl(imagenUrl);
    signup(values);
  });

  const handleDrop = async (acceptedFiles) => {
    if (Array.isArray(acceptedFiles)) {
      const fileUrls = await Promise.all(
        acceptedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const response = await axios.post("/upload", formData);
          return response.data.url;
        })
      );

      setImagenUrl(fileUrls[0]);
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="flex items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${imagen})`,
        }}
      >
        <div className="card-from">
          <div className="flex justify-center items-center text-white text-center lg:mr-7 px-4">
            <div className="overflow-hidden w-56 lg:w-80">
              <img
                className="w-full h-auto"
                src="src/assets/logo2.png"
                alt="logo-caih"
              />
            </div>
          </div>

          {registerErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white" key={i}>
              {error}
            </div>
          ))}

          <form className="mx-8 m:mr-0 mt-8 space-y-4 " onSubmit={onSubmit}>
            <h1 className="mt-4 text-3xl text-center font-bold uppercase">
              Registrarse
            </h1>
            <p className="text-gray-300 text-center md:text-left">
              Los datos ingresados en este formulario son para solicitar unirse
              al grupo CAIH
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              <div className="flex justify-center lg:justify-start">
                <div>
                  <label htmlFor="nombre" className="block text-white">
                    Usuario:
                  </label>
                  <input
                    className="input input-alt text-center"
                    placeholder="Ingresa tu usuario"
                    required
                    type="text"
                    {...register("usuario", { required: true })}
                  />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div>
                  <label htmlFor="nombre" className="label">
                    Nombre:
                  </label>
                  <input
                    className="input input-alt text-center"
                    placeholder="Ingresa tu nombre"
                    required
                    type="text"
                    {...register("nombre")}
                  />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div>
                  <label htmlFor="apellidoP" className="label">
                    Apellido paterno:
                  </label>
                  <input
                    className="input input-alt text-center"
                    placeholder="Ingresa tu apellido paterno"
                    required
                    type="text"
                    {...register("apellidoP")}
                  />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div>
                  <label htmlFor="apellidoM" className="label">
                    Apellido materno:
                  </label>
                  <input
                    {...register("apellidoM")}
                    className="input input-alt text-center"
                    placeholder="Ingresa tu apellido materno"
                    required
                    type="text"
                  />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div>
                  <label htmlFor="correo" className="label">
                    Correo:
                  </label>
                  <input
                    {...register("correo")}
                    className="input input-alt text-center"
                    placeholder="Correo electrónico"
                    required
                    type="email"
                  />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div>
                  <label htmlFor="telefono" className="label">
                    Teléfono:
                  </label>
                  <input
                    className="input input-alt text-center"
                    placeholder="Ingresa tu número telefónico"
                    type="tel"
                  />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div>
                  <label htmlFor="fechaN" className="label">
                    Fecha de nacimiento:
                  </label>
                  <input
                   {...register("fechaN")}
                   className="input input-alt text-center"
                   required
                   type="date"
                  />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div>
                  <label htmlFor="tituloEstudios" className="label">
                    Título de estudios:
                  </label>
                  <input
                   {...register("tituloMEstudios")}
                   className="input input-alt text-center"
                   placeholder="Ingresa tu título de estudios"
                   required
                   type="file"
                   onChange={(e) => {
                     const file = e.target.files[0];
                     setTituloMEstudiosUrl(file);
                   }}
                  />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div>
                  <label htmlFor="trabajoActual" className="label">
                    Trabajo actual:
                  </label>
                  <input
                  {...register("trabajoA")}
                  className="input input-alt text-center"
                  placeholder="Ingresa tu trabajo actual"
                  required
                  type="text"
                  />
                </div>
              </div>
              <div className="flex justify-center lg:justify-start">
                <div>
                  <label htmlFor="trabajoActual" className="label">
                    Proyecto personal:
                  </label>
                  <input
                    {...register("proyectoP")}
                    className="input input-alt text-center"
                    placeholder="Ingresa tu proyecto personal"
                    required
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setProyectoPUrl(file);
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center lg:justify-start">
                <div>
                  <label htmlFor="fotografia" className="label">
                    Fotografía:
                  </label>
                  <input
                   {...register("imagen")}
                   className="input input-alt text-center"
                   placeholder="Carga tu fotografía"
                   required
                   type="file"
                   onChange={(e) => {
                     const file = e.target.files[0];
                     setImageUrl(file);
                   }}
                  />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div className="mb-4 text-base">
                  <label htmlFor="recomendacion" className="label">
                    Recomendado por:
                  </label>
                  <select
                    id="recomendacion"
                    className="input input-alt text-center text-black"
                    required
                  >
                    <option value="" disabled>
                      Selecciona quien te recomendo
                    </option>
                    <option value="opcion1" className="text-black">
                      MTI. Luis Alberto Mendoza San Juan
                    </option>
                    <option value="opcion2">
                      Ing. Marta Gutierrez Castillo
                    </option>
                    <option value="opcion3">
                      Lic. Eduardo Escobar Contreras
                    </option>
                    <option value="opcion4">MGA. Ana Bautista Vite</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="btn2 btn-blue uppercase px-8 py-2"
              >
                Solicitar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
