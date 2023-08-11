import { useEffect } from "react";
import { useNoticias } from "../../context/NoticiasContext";
import NoticiasCard from "../../components/NoticiaCard";
import Navbar from "../../components/Navbar";
import Footer from "../../context/Footer";
function Noticia() {
  const { getNoticias, noticias } = useNoticias();

  useEffect(() => {
    getNoticias();
  }, []);

  if (noticias.length == 0) return <h1>No hay tareas</h1>;

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
