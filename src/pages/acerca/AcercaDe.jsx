import React, { useEffect, useState } from "react";
import Usuarios from "./usuarios";
import Navbar from "../../components/Navbar";
import Footer from "../../context/Footer";

export default function AcercaDe() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div className="container flex flex-wrap justify-center mx-auto">
          <div
            className={`py-5 flex items-center justify-center duration-1000 ${
              visible ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="relative h-[30rem] sm:h-96 w-[60rem] rounded-lg">
              <img
                src="src/assets/acerca.jpg"
                className="object-cover w-full h-full rounded-lg"
                alt="Background"
              />

              <div className="absolute w-full h-full bottom-0 bg-gradient-to-r from-slate-400/20 to-slate-700 rounded-lg flex flex-col items-center justify-center text-center">
                <p className="text-white font-bold text-2xl">HISTORIA</p>
                <p className="text-lg font-semibold px-5 text-white">
                  El Colegio de Arquitectos e Ingenieros Civiles de la Huasteca,
                  fue creado el 01 de octubre de 2018 en conmemoración por el
                  día internacional del Arquitecto. Fundado por un grupo de
                  arquitectos e Ingenieros civiles con interés por el desarrollo
                  urbano y ordenamiento territorial de nuestra región. El
                  objetivo de nuestro colegio es el trabajar activamente en
                  propuestas de intervención urbano-arquitectónicas en
                  colaboración con organismos gubernamentales o autónomos, con
                  el fin de mejorar la experiencia y habitabilidad de la
                  población en nuestra ciudad y región.
                </p>
              </div>
            </div>
          </div>
          <div
            className={`py-5 flex items-center justify-center duration-1000 ${
              visible ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="relative h-[30rem] sm:h-96 w-[60rem] rounded-lg">
              <img
                src="src/assets/logo.png"
                className="object-cover w-full h-full rounded-lg"
                alt="Background"
              />

              <div className="absolute w-full h-full bottom-0 bg-gradient-to-r from-slate-400/60 to-slate-700 rounded-lg flex flex-col items-center justify-center text-center">
                <p className="text-white font-bold text-2xl">MISION</p>
                <p className="text-lg font-semibold px-5 text-white">
                  Promover los valores de la práctica de la arquitectura y la
                  Ingeniería civil y la actividad profesional en la región
                  huasteca. Así como reconocer a los Arquitectos e Ingenieros
                  civiles que se destaquen significativamente en la práctica
                  profesional, en la actividad gremial y académica ante
                  dependencias de la administración pública y organismos
                  descentralizados, así como ante organismos del sector social y
                  privado.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-neutral-100">
          <Usuarios />
        </div>
      </div>
      <Footer />
    </div>
  );
}
