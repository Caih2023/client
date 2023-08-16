import React from "react";
import { BsFacebook } from "react-icons/bs";
import { logo, caihqr } from "../assets";

export default function Footer() {
  return (
    <footer className="bg-grisclaro2">
      <div className="w-full max-w-screen-xl p-4 py-6 mx-auto lg:p-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 md:flex md:items-center">
            <a className="flex items-center mx-auto md:mx-0">
              <img src={caihqr} className="h-40 rounded-md" alt="Logo caih" />
            </a>
          </div>
          <div className="mb-6 md:mb-0 md:flex md:items-center">
            <a className="flex items-center mx-auto md:mx-0">
              <img
                src={logo}
                className="h-60 mx-auto md:mx-0"
                alt="Logo caih"
              />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                síguenos
              </h2>
              <ul className="font-medium text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a
                    href="https://web.facebook.com/people/CAIH/100043352531874/"
                    target="_blank"
                    className="hover:underline "
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="font-medium text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Politica de privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terminos y condiciones
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-white lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023 <a>CAIH™</a>. Todos los derechos reservados.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href="https://web.facebook.com/people/CAIH/100043352531874/"
              target="_blank"
              className="text-gray-500 dark:hover:text-white hover:animate-bounce text-2xl"
            >
              <BsFacebook />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
