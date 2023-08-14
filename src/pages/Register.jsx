import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import imagen from "../assets/acerca.jpg";
import Navbar from "../components/Navbar";
import Footer from "../context/Footer";
import axios from "axios";
import Dropzone from "react-dropzone";
import { FaFolderOpen } from "react-icons/fa";
import { toast } from "react-hot-toast";

function Register() {
  const { register, handleSubmit, setValue } = useForm();
  const { signup, getUsersPublic, usuarios } = useAuth();
  const [images, setImages] = useState([]);
  const [tituloMEstudios, setTituloMEstudios] = useState([]);
  const [cv, setCv] = useState([]);
  const [proyectoP, setProyectoP] = useState([]);
  const [recomendadoPor, setRecomendadoPor] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const [tituloMEstudiosProgress, setTituloMEstudiosProgress] = useState();
  const [proyectoPProgress, setproyectoPProgress] = useState();
  const [cvProgress, setcvProgress] = useState();

  useEffect(() => {
    getUsersPublic();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const formattedFechaN = new Date(data.fechaN).toISOString();
    console.log(data);
    console.log(formattedFechaN);
    const {
      usuario,
      nombre,
      apellidoP,
      apellidoM,
      correo,
      telefono,
      trabajoA,
      publicaciones,
    } = data;

    const registroData = {
      usuario,
      nombre,
      apellidoP,
      apellidoM,
      correo,
      telefono,
      fechaN: formattedFechaN,
      tituloMEstudios: tituloMEstudios,
      cv: cv,
      trabajoA,
      proyectoP: proyectoP,
      publicaciones,
      recomendadoPor: recomendadoPor,
      imagen: images,
    };

    try {
       signup(registroData);
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  });

  const handleIamgenDrop = async (files) => {
    try {
      setLoading(true);

      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tags", "codeinfuse, medium, gist");
        formData.append("upload_preset", "imagenes");
        formData.append("api_key", "485221878133535");
        formData.append("timestamp", Date.now() / 1000 / 0);

        // Verificar si el archivo es una imagen
        if (!file.type.startsWith("image/")) {
          toast.error("Solo se permiten archivos de imagen");
        }

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dqjajqrru/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        );

        const fileURL = response.data.secure_url;
        return fileURL;
      });

      const uploadedImages = await Promise.all(uploadPromises);
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTituloMEstudiosDrop = async (file) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", "codeinfuse, medium, gist");
      formData.append("upload_preset", "documents"); // Cambiar a tu upload_preset para documentos
      formData.append("api_key", "485221878133535");
      formData.append("timestamp", Date.now() / 1000 / 0);

      // Verificar si el archivo es un documento
      // Por ejemplo, podrías verificar la extensión del archivo
      const validExtensions = ["pdf", "PDF"]; // Ejemplo de extensiones válidas
      const fileExtension = file.name.split(".").pop();
      if (!validExtensions.includes(fileExtension)) {
        toast.error("Solo se permiten archivos de documento (PDF)");
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/dqjajqrru/image/upload", // Cambiar a tu endpoint para cargar documentos en Cloudinary
        true
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
          // Actualizar el progreso de carga aquí
          setTituloMEstudiosProgress(percent);
        }
      };

      xhr.onload = () => {
        const fileURL = JSON.parse(xhr.responseText);
        setTituloMEstudios(fileURL.url);
        return fileURL; // Retorna la URL del archivo cargado
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Error uploading document:", error);
    } finally {
      setLoading(false);
      // Reiniciar el progreso después de cargar
      setTituloMEstudiosProgress(0);
    }
  };

  const handleCvDrop = async (file) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", "codeinfuse, medium, gist");
      formData.append("upload_preset", "documents"); // Cambiar a tu upload_preset para documentos
      formData.append("api_key", "485221878133535");
      formData.append("timestamp", Date.now() / 1000 / 0);

      // Verificar si el archivo es un documento
      // Por ejemplo, podrías verificar la extensión del archivo
      const validExtensions = ["pdf", "PDF"]; // Ejemplo de extensiones válidas
      const fileExtension = file.name.split(".").pop();
      if (!validExtensions.includes(fileExtension)) {
        toast.error("Solo se permiten archivos de documento (PDF)");
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/dqjajqrru/image/upload", // Cambiar a tu endpoint para cargar documentos en Cloudinary
        true
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
          // Actualizar el progreso de carga aquí
          setcvProgress(percent);
        }
      };

      xhr.onload = () => {
        const fileURL = JSON.parse(xhr.responseText);
        setCv(fileURL.url);
        return fileURL; // Retorna la URL del archivo cargado
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Error uploading document:", error);
    } finally {
      setLoading(false);
      // Reiniciar el progreso después de cargar
      setcvProgress(0);
    }
  };

  const handleProyectoPDrop = async (file) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", "codeinfuse, medium, gist");
      formData.append("upload_preset", "documents"); // Cambiar a tu upload_preset para documentos
      formData.append("api_key", "485221878133535");
      formData.append("timestamp", Date.now() / 1000 / 0);

      // Verificar si el archivo es un documento
      // Por ejemplo, podrías verificar la extensión del archivo
      const validExtensions = ["pdf", "PDF"]; // Ejemplo de extensiones válidas
      const fileExtension = file.name.split(".").pop();
      if (!validExtensions.includes(fileExtension)) {
        toast.error("Solo se permiten archivos de documento (PDF)");
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/dqjajqrru/image/upload", // Cambiar a tu endpoint para cargar documentos en Cloudinary
        true
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
          // Actualizar el progreso de carga aquí
          setproyectoPProgress(percent);
        }
      };

      xhr.onload = () => {
        const fileURL = JSON.parse(xhr.responseText);
        setProyectoP(fileURL.url);
        return fileURL; // Retorna la URL del archivo cargado
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Error uploading document:", error);
    } finally {
      setLoading(false);
      // Reiniciar el progreso después de cargar
      setproyectoPProgress(0);
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
          <form className="mx-8 m:mr-0 mt-8 space-y-4" onSubmit={onSubmit}>
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
                  <label className="block text-white">Usuario:</label>
                  <input
                    className="input input-alt text-center"
                    placeholder="Ingresa tu usuario"
                    required
                    type="text"
                    {...register("usuario")}
                  />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div>
                  <label className="label">Nombre:</label>
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
                  <label className="label">Apellido paterno:</label>
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
                    {...register("telefono")}
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
                    onChange={(e) => setValue("fechaN", e.target.value)}
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
                  <label htmlFor="tituloEstudios" className="label">
                    Publicaciones:
                  </label>
                  <input
                    {...register("publicaciones")}
                    className="input input-alt text-center"
                    placeholder="Ingresa la url tus publicaiones"
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
                    className="input input-alt text-center"
                    placeholder="Introduce tu proyecto"
                    required
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      handleProyectoPDrop(file);
                    }}
                  />
                  {proyectoPProgress && (
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4 dark:bg-gray-700">
                      <div
                        className="relative h-4 rounded-full"
                        style={{
                          width: `${proyectoPProgress}%`,
                          transition: "width 0.3s ease-in-out",
                        }}
                      >
                        <div className="bg-blue-600 absolute top-0 left-0 h-full w-full rounded-full dark:bg-blue-300"></div>
                        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-white font-semibold text-sm">
                          {proyectoPProgress}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div>
                  <label htmlFor="tituloEstudios" className="label">
                    Título maximo de estudios:
                  </label>
                  <input
                    className="input input-alt text-center"
                    placeholder="Ingresa tu título de estudios"
                    required
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      handleTituloMEstudiosDrop(file);
                    }}
                  />

                  {tituloMEstudiosProgress && (
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4 dark:bg-gray-700">
                      <div
                        className="relative h-4 rounded-full"
                        style={{
                          width: `${tituloMEstudiosProgress}%`,
                          transition: "width 0.3s ease-in-out",
                        }}
                      >
                        <div className="bg-blue-600 absolute top-0 left-0 h-full w-full rounded-full dark:bg-blue-300"></div>
                        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-white font-semibold text-sm">
                          {tituloMEstudiosProgress}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div>
                  <label htmlFor="tituloEstudios" className="label">
                    curriculum vitae:
                  </label>
                  <input
                    className="input input-alt text-center"
                    placeholder="Ingresa tu Curriculum vitae"
                    required
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      handleCvDrop(file);
                    }}
                  />
                  {cvProgress && (
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4 dark:bg-gray-700">
                      <div
                        className="relative h-4 rounded-full"
                        style={{
                          width: `${cvProgress}%`,
                          transition: "width 0.3s ease-in-out",
                        }}
                      >
                        <div className="bg-blue-600 absolute top-0 left-0 h-full w-full rounded-full dark:bg-blue-300"></div>
                        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-white font-semibold text-sm">
                          {cvProgress}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div>
                  <label htmlFor="fotografia" className="label">
                    Fotografía:
                  </label>
                  <Dropzone className="dropzone" onDrop={handleIamgenDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div
                          {...getRootProps({ className: "dropzone-container" })}
                        >
                          <input {...getInputProps()} />
                          <div className="dropzone-content">
                            <FaFolderOpen className="folder-icon" />
                            <p className="dropzone-message">
                              Arrastra y suelta imágenes aquí o haz clic para
                              cargar
                            </p>
                          </div>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  {loading ? (
                    <h2>Cargando imágenes...</h2>
                  ) : (
                    images.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 m-1">
                        {images.map((img, index) => (
                          <div key={index}>
                            <img
                              src={img}
                              alt={`Imagen ${index + 1}`}
                              className="w-full h-auto"
                            />
                            <button onClick={() => setImages([])}>
                              Eliminar imagen
                            </button>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div className="mb-4 text-base">
                  <label htmlFor="recomendacion" className="label">
                    Recomendado por:
                  </label>
                  <select
                    className="input input-alt text-center"
                    required
                    value={recomendadoPor}
                    onChange={(e) => setRecomendadoPor(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecciona quien te recomendó
                    </option>
                    {usuarios.map((usuario, index) => (
                      <option
                        className="text-black"
                        key={index}
                        value={usuario._id} // Asigna el valor del ID del usuario como valor de la opción
                      >
                        {usuario.nombre} {usuario.apellidoP} {usuario.apellidoM}
                      </option>
                    ))}
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
