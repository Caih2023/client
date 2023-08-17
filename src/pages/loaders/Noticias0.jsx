import React from "react";

function Noticias0() {
  return (
    <>
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-10 p-5 sm:p-10 text-justify">
            <div
              className="flex flex-col bg-gray-200 rounded-xl overflow-hidden shadow-lg mb-5 md:flex-row"
            >
              <div className="w-full">
                <div className="px-8 py-6">
                  <div className="text-black text-xl lg:text-xl text-center font-bold mb-2 uppercase">
                    Sin noticias que mostrar
                  </div>
                  <div className="w-full">
                    {/* <img
                      className="w-full h-52 sm:h-72 lg:h-52 rounded-2xl"
                      src={noticia.foto[0]}
                      alt={noticia.titulo}
                    /> */}
                  </div>
                  <p className="text-black text-base py-4 relative overflow-hidden">
                   Por el momento no existe ninguna noticia
                  </p>

                  <div className="flex justify-between pb-3">
                    <span className="text-black text-base font-medium">
                      Noticias 0
                    </span>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  );
}

export default Noticias0;
