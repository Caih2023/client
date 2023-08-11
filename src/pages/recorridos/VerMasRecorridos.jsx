import { useFetch } from "../useFetch";
import Loading from "../loaders/Loading";
import { Error404 } from "../errors";
import Imagenes from "../slider/imagenes";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../context/Footer";

function VerMasRecorridos() {
  const { id } = useParams();

  const urlocal = `http://localhost:3000/api/noticias/${id}`;
  const url = `https://caih-estadia.vercel.app/api/recorridos/${id}`;

  const { data, loading, error } = useFetch(url);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error404 />;
  }
  if (data) {
    return (
      <div>
        <Navbar />
        <div className="bg-gray-200">
          <div className="grid grid-cols-1 gap-5 sm:gap-10 p-5 sm:p-10 text-justify">
            <div className="Antes de esto iba el map">
              <div className="scroll-smooth">
                <div className="px-6 py-4">
                  <div className="text-xl lg:text-3xl font-bold mb-2 uppercase text-center pb-6">
                    {data.tituloPoint}
                  </div>
                  <p className="text-gray-900 text-base lg:text-lg">
                    {data.informacionH}
                  </p>
                </div>

                <div>
                  <Imagenes galeria={data.galeria} tamañoImagen={440} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default VerMasRecorridos;
