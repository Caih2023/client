import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Error404 extends Component {
  render() {
    return (
      <div>
        <section className="bg-gris-600 relative z-10 py-[120px]">
          <div className="container mx-auto">
            <div className="-mx-4 flex">
              <div className="w-full px-4">
                <div className="mx-auto max-w-[400px] text-center">
                  <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                    404
                  </h2>
                  <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                    ¡Ups! esta pagina no fue encontrada
                  </h4>
                  <p className="mb-8 text-lg text-white">
                    La página que buscas a sido eliminada
                  </p>
                  <Link
                    to={"/"}
                    className="hover:text-primary inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white"
                  >
                    Inicio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
