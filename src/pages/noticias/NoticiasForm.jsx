import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNoticias } from "../../context/NoticiasContext";
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";
import imagen from "../../assets/acerca.jpg";
import Navbar from "../../components/Navbar";
import Footer from "../../context/Footer";

function NoticiasForm() {
  const { register, handleSubmit, setValue } = useForm();
  const { createNoticia, getNoticia, updateNoticia } = useNoticias();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id: noticiaId } = useParams();

  useEffect(() => {
    async function loadNoticia() {
      if (noticiaId) {
        const noticia = await getNoticia(noticiaId);
        setValue("titulo", noticia.titulo);
        setValue("descripcion", noticia.descripcion);
        setImages(noticia.foto);
      }
    }
    loadNoticia();
  }, [noticiaId]);

  const onSubmit = handleSubmit(async (data) => {
    const { titulo, descripcion } = data;

    const noticiaData = {
      titulo,
      descripcion,
      foto: images,
    };

    try {
      if (noticiaId) {
        updateNoticia(noticiaId, data);
      } else {
        createNoticia(noticiaData);
      }

      navigate("/mis-noticias");
    } catch (error) {
      console.error("Error al crear la noticia:", error);
    }
  });

  const handleDrop = async (files) => {
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", "codeinfuse, medium, gist");
      formData.append("upload_preset", "imagenes");
      formData.append("api_key", "485221878133535");
      formData.append("timestamp", Date.now() / 1000 / 0);

      try {
        setLoading(true);
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dqjajqrru/image/upload",
          formData,
          { headers: { "X-Requested-With": "XMLHttpRequest" } }
        );
        const fileURL = response.data.url;
        setImages((prevImages) => [...prevImages, fileURL]);
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
      } finally {
        setLoading(false);
      }
    });

    await Promise.all(uploadPromises);
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  return (
    <div>
      <Navbar />
      <div
        className="flex items-start bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${imagen})`,
        }}
      >
        <div className="card-noticias">
          <form className="mx-8 m:mr-0 space-y-4 " onSubmit={onSubmit}>
            <h1 className="text-3xl text-center font-bold uppercase">
              Noticia
            </h1>
            <p className="text-gray-300 text-center md:text-left">
              Los datos ingresados en este formulario son para crear una noticia
            </p>

            {/* <-----  columnas de formulario  -----> */}
            <div className="flex items-center flex-col">
              <div className="flex justify-center lg:justify-start mb-1">
                <div className="form-control">
                  <label htmlFor="titulo" className="block text-white">
                    Título de la noticia:
                  </label>
                  <input
                    className="input input-alt text-center"
                    type="text"
                    placeholder="Título"
                    {...register("titulo")}
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start mb-1">
                <div className="form-control">
                  <label htmlFor="descripcion" className="block text-white">
                    Información histórica:
                  </label>
                  <textarea
                    rows="5"
                    {...register("descripcion")}
                    placeholder="Escribe la información de la noticia..."
                    className="input input-alt text-center focus:shadow-soft-primary-outline min-h-unset text-sm leading-5.6 ease-soft block h-auto w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start mb-1">
                <div>
                  <label htmlFor="fotografia" className="label">
                    Fotografías:
                  </label>
                  {loading ? (
                    <h2>Cargando imágenes...</h2>
                  ) : images.length > 0 ? (
                    <div>
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
      <Footer />
    </div>
  );
}

export default NoticiasForm;
