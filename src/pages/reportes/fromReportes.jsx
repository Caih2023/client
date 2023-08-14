import React, { useState } from "react";
import { useReportes } from "../../context/ReportesContext";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Reportes({ latLng }) {
  const { register, handleSubmit, reset } = useForm();
  const { createReporte } = useReportes();
  const [imagen, setImagen] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const { titulo, descripcion, coordenadas, correo } = data;
    // const [latitud, longitud] = coordenadas.split(",");

    const reporteData = {
      titulo,
      descripcion,
      coordenadas: {
        type: "Point",
        coordinates: [parseFloat(latLng.lat), parseFloat(latLng.lng)],
      },
      correo,
      imagen: imagen,
    };

    try {
      createReporte(reporteData);
      reset(); // Limpia los campos de input
      setImagen([]); // Limpia el estado de las imágenes
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
      setImagen((prevImages) => [...prevImages, ...uploadedImages]);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-report justify-center">
      <form
        className="mx-8 my-4 space-y-4 flex flex-col items-center"
        onSubmit={onSubmit}
      >
        <h1 className="text-3xl md:text-left font-bold uppercase">Reporte</h1>
        <p className="text-gray-300 md:text-left">
          Los datos ingresados en este formulario son para realizar el reporte
          de una área que se encuentre en malas condiciones.
        </p>

        <div>
          <div className="flex justify-center md:justify-start">
            <div className="form-control responsive2">
              <label htmlFor="nombre" className="block text-white">
                Título:
              </label>
              <input
                className="input input-alt text-center"
                placeholder="Titulo del reporte"
                required
                type="text"
                {...register("titulo")}
              />
            </div>
          </div>

          <div className="flex justify-center md:justify-start">
            <div className="form-control responsive2">
              <label htmlFor="apellidoP" className="label">
                Descripción:
              </label>
              <textarea
                rows="5"
                placeholder="Descripcion del reporte"
                {...register("descripcion")}
                className="input input-alt text-center"
              />
            </div>
          </div>

          <div className="flex justify-center md:justify-start">
            <div className="form-control responsive2">
              <label htmlFor="apellidoM" className="label">
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
          <div className="flex justify-center md:justify-start">
            <div className="form-control responsive2">
              <label htmlFor="correo" className="label">
                Correo:
              </label>
              <input
                id="correo"
                className="input input-alt text-center"
                placeholder="Correo electrónico"
                required
                {...register("correo")}
                type="email"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-start">
          <div className="form-control responsive2">
            <label htmlFor="correo" className="label">
              Fotografía:
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
            ) : imagen.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {imagen.map((img, index) => (
                  <div key={index}>
                    <img
                      src={img}
                      alt={`Imagen ${index + 1}`}
                      className="w-full h-auto"
                    />
                    <button onClick={() => setImagen([])}>
                      Eliminar imagen
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <h2>No hay imágenes</h2>
            )}
          </div>
        </div>

        <div className="flex justify-center md:justify-start">
          <button type="submit" className="btn2 btn-blue uppercase px-8 py-2">
            Reportar
          </button>
        </div>
      </form>
    </div>
  );
}
