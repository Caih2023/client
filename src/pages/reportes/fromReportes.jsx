import React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

export default function Reportes({ latLng }) {
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleDrop = (files) => {
    const upload = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", "codeinfuse, medium, gist");
      formData.append("upload_preset", "imagenes");
      formData.append("api_key", "485221878133535");
      formData.append("timestamp", Date.now() / 1000 / 0);
      setLoading(true);
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/dqjajqrru/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }
        )
        .then((res) => {
          const data = res.data;
          const fileURL = data.url;
          setImages((prevImages) => [...prevImages, fileURL]);
        });
    });
    axios.all(upload).then(() => {
      setLoading(false);
    });
  };

  return (
    <div className="card-report justify-center">
      <form className="mx-8 my-4 space-y-4 flex flex-col items-center">
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
                id="nombre"
                className="input input-alt text-center"
                placeholder="Titulo del reporte"
                required
                type="text"
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
                // {...register("descripcion")}
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
                id="apellidoM"
                className="input input-alt text-center"
                placeholder="Ingresa la ubicación"
                defaultValue={latLng ? `${latLng.lat}, ${latLng.lng}` : ""}
                required
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
            {loading ? (
              <h2>Cargando imágenes...</h2>
            ) : images.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
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
            ) : (
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
