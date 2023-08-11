import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNoticias } from "../../context/NoticiasContext";
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";
import imagen from "../../assets/acerca.jpg";

function NoticiasForm() {
  const { register, handleSubmit, setValue } = useForm();
  const { createNoticia, getNoticia, updateNoticia } = useNoticias();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadNoticias() {
      if (params.id) {
        const noticia = await getNoticia(params.id);
        setValue("titulo", noticia.titulo);
        setValue("descripcion", noticia.descripcion);
        setImages(noticia.foto);
      }
    }
    loadNoticias();
  }, [params.id]);

  const onSubmit = handleSubmit(async (data) => {
    const { titulo, descripcion } = data;

    const noticiaData = {
      titulo,
      descripcion,
      foto: images,
    };

    try {
      if (params.id) {
        updateNoticia(params.id, data);
      } else {
        createNoticia(noticiaData);
      }

      navigate("/mis-noticias");
    } catch (error) {
      console.error("Error al crear la noticia:", error);
    }
  });

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

  const handleDeleteImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  return (
    <>
      <div
        className="flex justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${imagen})`,
        }}
      >
        <div className="card-noticias">
          <form className="mx-8 m:mr-0 space-y-4 " onSubmit={onSubmit}>
            <h1 className="text-3xl text-center font-bold uppercase">
              Nueva noticia
            </h1>
            <p className="text-gray-300 text-center md:text-left">
              Los datos ingresados en este formulario son para crear una noticia
            </p>

            {/* <-----  columnas de formulario  -----> */}
            <div className="flex items-center flex-col">
              <div className="flex justify-center lg:justify-start mb-1">
                <div className="form-control responsive">
                  <label htmlFor="titulo" className="block text-white">
                    Titulo de la noticia:
                  </label>
                  <input
                    className="input input-alt text-center"
                    type="text"
                    placeholder="Titulo"
                    {...register("titulo")}
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start mb-1">
                <div className="form-control responsive">
                  <label htmlFor="informacionH" className="block text-white">
                    Información historica:
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Descripcion"
                    {...register("descripcion")}
                    className="input input-alt text-center"
                  />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start mb-1">
                <div className="responsive">
                  <label htmlFor="fotografia" className="label pb-2">
                    Fotografías:
                  </label>

                  {loading ? (
                    <h2>Cargando imágenes...</h2>
                  ) : (
                    <div className="grid grid-cols-3">
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

                      {images.map((img, index) => (
                        <div key={index} className="relative mb-4">
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
                          <button
                            className="absolute top-0 right-0 p-2 text-red-500 font-medium"
                            onClick={() => handleDeleteImage(index)}
                          >
                            Eliminar imagen
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="btn2 btn-blue uppercase px-8 py-2"
              >
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NoticiasForm;
