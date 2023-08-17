import React, { Component } from "react";
import { error, errorfont } from "../../assets";
import { Link } from "react-router-dom";

export default class Error404 extends Component {
  render() {
    return (
      <div className="min-h-screen bg-gray-400 lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 md:h-full py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className="">
                <h1 className="my-2 text-gray-50 font-bold text-2xl">
                  ¡Ups! Esta página no fue encontrada
                </h1>
                <p className="my-2 text-gray-50">
                  ¡Lo lamento! Visite nuestra página de inicio para llegar a
                  donde necesita ir.
                </p>
                <Link to="/">
                  <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                    Inicio
                  </button>
                </Link>
              </div>
            </div>
            <div>
              <img src={error} />
            </div>
          </div>
        </div>
        <div>
          <img src={errorfont} />
        </div>
      </div>
    );
  }
}
