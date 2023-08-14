import { useEffect } from "react";
import { useNoticias } from "../../context/NoticiasContext";
import NoticiasCard from "../../components/NoticiaCard";
import Navbar from "../../components/Navbar";
import Footer from "../../context/Footer";
import { Link } from "react-router-dom";
function Noticia() {
  const { getNoticias, noticias } = useNoticias();

  useEffect(() => {
    getNoticias();
  }, []);

  if (noticias.length == 0)
    return (
      <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-md shadow-md text-center">
          <h1 className="text-3xl text-gray-700 mb-4">No hay noticias</h1>
          <p className="text-gray-500">
            Las noticias que publiques aparecerán en este apartado
          </p>
          <Link
            to="/agregar-noticia"
            className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Agregar Noticia
          </Link>
        </div>
      </main>
      <Footer />
    </div>
    );

  return (
    <div>
      <Navbar />
      <div className="card-cols">
        {noticias.map((noticia) => (
          <NoticiasCard noticia={noticia} key={noticia._id} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Noticia;
