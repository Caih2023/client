import { useEffect } from "react";
import { useNoticias } from "../../context/NoticiasContext";
import NoticiasCard from "../../components/NoticiasCardPublic";
import Navbar from "../../components/Navbar";
import Footer from "../../context/Footer";
function Noticia() {
  const { getNoticiasPublicas, noticias } = useNoticias();

  useEffect(() => {
    getNoticiasPublicas();
  }, []);
  if (noticias.length == 0) return <h1>No se encontro ninguna noticia</h1>;

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