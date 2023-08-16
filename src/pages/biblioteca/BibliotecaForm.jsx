import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useBibliotecas } from "../../context/bibliotecaContext";
import Navbar from "../../components/Navbar";
import Footer from "../../context/Footer";

const BibliotecaForm = () => {
  const { register, handleSubmit } = useForm();
  const { createBiblioteca } = useBibliotecas();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [libro, setLibro] = useState([]);
  const [libroProgress, setlibroProgress] = useState();
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onSubmitBiblioteca = handleSubmit(async (data) => {
    const { titulo, autor } = data;

    const registroData = {
      titulo,
      autor,
      portada: images[0], // Tomar la primera imagen del array
      libro: libro,
    };

    try {
      createBiblioteca(registroData); // Asegúrate de tener esta función definida e importada
    } catch (error) {
      console.log(error);
    }
  });

  const handleLibro = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", "codeinfuse, medium, gist");
      formData.append("upload_preset", "documents"); // Cambiar a tu upload_preset para documentos
      formData.append("api_key", "485221878133535");
      formData.append("timestamp", Date.now() / 1000 / 0);

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
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        const fileURL = JSON.parse(xhr.responseText);
        setLibro(fileURL.url);
        return fileURL; // Retorna la URL del archivo cargado
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Error uploading document:", error);
    } finally {
      setLoading(false);
      // Reiniciar el progreso después de cargar
      setlibroProgress(0);
    }
  };

  const handleIamgenDrop = async (file) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", "codeinfuse, medium, gist");
      formData.append("upload_preset", "imagenes");
      formData.append("api_key", "485221878133535");
      formData.append("timestamp", Date.now() / 1000 / 0);

      // Verificar si el archivo es una imagen
      if (!file.type.startsWith("image/")) {
        toast.error("Solo se permiten archivos de imagen");
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/dqjajqrru/image/upload", // Cambiar a tu endpoint para cargar imágenes en Cloudinary
        true
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        const fileURL = JSON.parse(xhr.responseText);
        setImages((prevImages) => [...prevImages, fileURL.url]);
        setLoading(false); // Mueve este setLoading aquí para que se desactive después de cargar la imagen
      };

      xhr.send(formData);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-5xl font-bold text-center">Subir libro</h1>
      <div className="flex justify-center ">
        <form
          onSubmit={onSubmitBiblioteca}
          className="bg-white shadow-md rounded p-6 md:p-8 w-full md:w-1/2"
        >
          {/* Other form fields */}

          <div className="mb-4">
            <label
              htmlFor="titulo"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Titulo del libro:
            </label>
            <input
              type="text"
              {...register("titulo")}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="autor"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Autor:
            </label>
            <input
              type="text"
              {...register("autor")}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Portada del libro:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleIamgenDrop(e.target.files[0])}
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {loading && (
              <div className="mt-2">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                        Cargando...
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-teal-600">
                        {uploadProgress}%
                      </span>
                    </div>
                  </div>
                  <div className="flex h-2 mb-4 overflow-hidden bg-teal-200 rounded">
                    <div
                      style={{ width: `${uploadProgress}%` }}
                      className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap bg-teal-500"
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <label
              htmlFor="image"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Libro en formato pdf:
            </label>
            <input
              type="file"
              className="text-black"
              onChange={(e) => {
                const file = e.target.files[0];
                handleLibro(file);
              }}
            />
            {loading && (
              <div className="mt-2">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                        Cargando...
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-teal-600">
                        {uploadProgress}%
                      </span>
                    </div>
                  </div>
                  <div className="flex h-2 mb-4 overflow-hidden bg-teal-200 rounded">
                    <div
                      style={{ width: `${uploadProgress}%` }}
                      className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap bg-teal-500"
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Enviar
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BibliotecaForm;
