import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecorridos } from "../../context/RecorridosContext";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function RecorridosForm({ latLng }) {
  const { register, handleSubmit, setValue, reset } = useForm();
  const { createRecorrido, getRecorrido, updateRecorrido } = useRecorridos();
  const [images, setImages] = useState([]);
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [recorridosFrom, setRecorridosFrom] = useState(null);

  useEffect(() => {
    async function loadRecorridos() {
      if (params.id) {
        const Recorrido = await getRecorrido(params.id);
        setValue("tituloPoint", Recorrido.informacionH);
        setValue("informacionH", Recorrido.informacionH);o
        setValue("coordenadas", Recorrido.coordenadas);
        setImages(Recorrido.galeria);
        setValue("autorPointer", Recorrido.autorPointer);
      }
    }
    loadRecorridos();
  }, [params.id]);

  const onSubmit = handleSubmit(async (data) => {
    const { tituloPoint, informacionH, coordenadas } = data;
    const [latitud, longitud] = coordenadas.split(",");

    const recorridoData = {
      tituloPoint,
      informacionH,
      coordenadas: {
        type: "Point",
        coordinates: [parseFloat(latitud), parseFloat(longitud)],
      },
      galeria: images,
    };

    try {
      createRecorrido(recorridoData);
      reset(); // Limpia los campos de input
      setImages([]); // Limpia el estado de las imágenes
    } catch (error) {
      console.error("Error creating task:", error);
    }
  });

  const handleProyectoPDrop = async (file) => {
    try {
      setLoading(true);
  
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", "codeinfuse, medium, gist");
      formData.append("upload_preset", "images"); // Cambiar a tu upload_preset para imágenes
      formData.append("api_key", "485221878133535");
      formData.append("timestamp", Date.now() / 1000 / 0);
  
      // Verificar si el archivo es una imagen
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]; // Ejemplo de tipos de imagen válidos
      if (!validImageTypes.includes(file.type)) {
        toast.error("Solo se permiten archivos de imagen (JPEG, PNG, jpg, webp)");
        return;
      }
  
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/dqjajqrru/image/upload",
        true
      );
  
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
          // Actualizar el progreso de carga aquí
          setRecorridosFrom(percent);
        }
      };
  
      xhr.onload = () => {
        const fileURL = JSON.parse(xhr.responseText);
        setProyectoP(fileURL.url);
        setRecorridosFrom(null); // Reiniciar el progreso después de cargar
        return fileURL;
      };
  
      xhr.send(formData);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
      setRecorridosFrom(null);
    }
  };
  

  return (
    <>
      <div className="card-report">
        <form className="mx-8 mt-5 mb-7 m:mr-0 space-y-4 " onSubmit={onSubmit}>
          <h1 className="text-3xl text-center font-bold uppercase">
            Recorrido
          </h1>
          <p className="text-gray-300 text-center md:text-left">
            Los datos ingresados en este formulario son para crear una Recorrido
          </p>

          {/* <-----  columnas de formulario  -----> */}
          <div className="flex items-center flex-col">
            <div className="flex justify-center lg:justify-start mb-1">
              <div className="form-control">
                <label htmlFor="titulo" className="block text-white">
                  Titulo de la Recorrido:
                </label>
                <input
                  className="input input-alt text-center"
                  type="text"
                  placeholder="Titulo del recorrido"
                  {...register("tituloPoint")}
                  autoFocus
                />
              </div>
            </div>

            <div className="flex justify-center lg:justify-start mb-1">
              <div className="form-control">
                <label htmlFor="informacionH" className="block text-white">
                  Información historica:
                </label>
                <textarea
                  rows="5"
                  placeholder="Informacion del recorrido"
                  {...register("informacionH")}
                  className="input input-alt text-center"
                />
              </div>
            </div>

            <div className="flex justify-center md:justify-start">
              <div>
                <label htmlFor="coordenadas" className="label">
                  Ubicación:
                </label>
                <input
                  className="input input-alt text-center"
                  placeholder="Ingresa la ubicación"
                  defaultValue={latLng ? `${latLng.lat}, ${latLng.lng}` : ""}
                  required
                  {...register("coordenadas")}
                  type="text"
                />
              </div>
            </div>

            <div className="flex justify-center lg:justify-start">
              <div>
                <label htmlFor="fotografias" className="label">
                  Fotografias:
                </label>
                <input
                  className="input input-alt text-center"
                  placeholder="Selecciona imágenes"
                  required
                  type="file"
                  multiple // Habilitar selección múltiple
                  accept="image/*" // Aceptar solo imágenes
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      for (const file of files) {
                        handleProyectoPDrop(file);
                      }
                    }
                  }}
                />
                {recorridosFrom !== null && (
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-4 dark:bg-gray-700">
                    <div
                      className="relative h-4 rounded-full"
                      style={{
                        width: `${recorridosFrom}%`,
                        transition: "width 0.3s ease-in-out",
                      }}
                    >
                      <div className="bg-blue-600 absolute top-0 left-0 h-full w-full rounded-full dark:bg-blue-300"></div>
                      <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-white font-semibold text-sm">
                        {recorridosFrom}%
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="btn2 btn-blue uppercase px-8 py-2">
              Crear
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default RecorridosForm;
