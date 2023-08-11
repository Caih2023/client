import { useEffect } from "react";
import { useNoticias } from "../../context/NoticiasContext";
import NoticiasCard from "../../components/NoticiaCard";

function Noticia() {
  const { getNoticias, noticias } = useNoticias();

  useEffect(() => {
    getNoticias();
  }, []);

  if (noticias.length == 0) return <h1>No hay tareas</h1>;

  return (
    <div className="card-cols">
      {noticias.map((noticia) => (
        <NoticiasCard noticia={noticia} key={noticia._id} />
      ))}
    </div>
  );
}

export default Noticia;
