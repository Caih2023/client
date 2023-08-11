import React, { Component } from "react";

export default class Error404 extends Component {
  render() {
    return (
      <div>
        <section className="bg-gris-600 relative z-10 py-[120px]">
          <div className="container mx-auto">
            <div className="-mx-4 flex">
              <div className="w-full px-4">
                <div className="mx-auto max-w-[400px] text-center">
                  <h2 className="mb-2 text-[50px] font-bold leading-none text-black sm:text-[80px] md:text-[100px]">
                    404
                  </h2>
                  <h4 className="mb-3 text-[22px] font-semibold leading-tight text-black">
                    ¡Ups! esta pagina no fue encontrada
                  </h4>
                  <p className="mb-8 text-lg text-black">
                    La página que buscas a sido eliminada
                  </p>
                  <a
                    href=""
                    className="hover:text-primary inline-block rounded-lg border border-black px-8 py-3 text-center text-base font-semibold text-black transition hover:bg-white"
                  >
                    Inicio
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
