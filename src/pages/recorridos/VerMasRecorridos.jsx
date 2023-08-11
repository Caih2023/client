import { useFetch } from "../useFetch";
import Loading from "../loaders/Loading";
import { Error404 } from "../errors";
import Imagenes from "../slider/imagenes";
import { useParams } from "react-router-dom";

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
      <div className="bg-gray-200">
        <div className="mx-auto py-12 px-6 lg:px-8 text-justify">
          <div className="max-w-7xl mx-auto">
            <div className="px-6 py-4">
              <div className="text-black text-xl lg:text-4xl font-bold mb-2 uppercase text-center pb-6">
                {data.tituloPoint}
              </div>
              <div className="text-black text-xl">
                {data.informacionH.split("\n").map((paragraph, index) => (
                  <React.Fragment key={index}>
                    {index < imageCount && (
                      <div
                        className={`${
                          index % 2 === 1
                            ? "mx-auto text-center"
                            : "float-left mr-4 mb-4 md:mb-1 mt-3"
                        }`}
                        style={{
                          maxWidth: index % 2 === 0 ? "20rem" : "36rem",
                          maxHeight: index % 2 === 0 ? "16rem" : "28rem",
                        }}
                      >
                        <img
                          src={data.galeria[index]}
                          alt={`Imagen ${index + 1}`}
                          className="w-full h-full rounded-lg object-cover"
                        />
                      </div>
                    )}
                    <div>{paragraph}</div>
                    <br style={{ clear: "both" }} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerMasRecorridos;
