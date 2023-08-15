import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecorridos } from "../../context/RecorridosContext";
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";

function RecorridosForm({ latLng }) {
  const { register, handleSubmit, setValue, reset } = useForm();
  const { createRecorrido, getRecorrido, updateRecorrido } = useRecorridos();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadRecorridos() {
      if (params.id) {
        const Recorrido = await getRecorrido(params.id);
        setValue("tituloPoint", Recorrido.informacionH);
        setValue("informacionH", Recorrido.informacionH);
        setValue("coordenadas", Recorrido.coordenadas);
        setImages(Recorrido.galeria);
        setValue("autorPointer"), Recorrido.autorPointer;
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

  const handleDrop = async (files) => {
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

  const handleDeleteImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
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

            <div className="flex justify-center lg:justify-start mb-1">
              <div>
                <label htmlFor="fotografia" className="label">
                  Fotografías:
                </label>
                <Dropzone className="dropzone" onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>Cargar imágenes</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
                {loading ? (
                  <h2>Cargando imágenes...</h2>
                ) : images.length > 0 ? (
                  <div className="grid grid-cols-3 ml-3">
                    {images.map((img, index) => (
                      <div key={index}>
                        <img
                          src={img}
                          alt={`Imagen ${index + 1}`}
                          style={{
                            width: "125px",
                            height: "70px",
                            backgroundSize: "cover",
                            paddingRight: "15px",
                          }}
                        />
                        <button onClick={() => handleDeleteImage(index)}>
                          Eliminar imagen
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <h2>cargar imagenes</h2>
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
