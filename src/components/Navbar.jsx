import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Menu from "./MenuFlotante";

function Navbar() {
  const { isAuthenticated, logout, usuario } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [seleccionarOpcion, setSeleccionarOpcion] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const seleccionarClicks = (opcion) => {
    setSeleccionarOpcion(opcion);
  };

  return (
    <nav className="bg-gris-960 border-gris-960 dark:bg-logo">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <Link
          to="/"
          className={`flex items-center ${
            seleccionarOpcion === "inicio" ? "text-blue-600" : "text-gray-100"
          } `}
          aria-current="page"
          onClick={() => seleccionarClicks("inicio")}
        >
          <img
            src="src/assets/logo2.png"
            className="h-12 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            CAIH
          </span>
        </Link>
        <div className="flex items-center md:order-2">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div>
                <Menu logout={logout} />
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className={`btn bg-gray-800 hover:text-black hover:bg-gray-300
               ${
                 seleccionarOpcion === "login"
                   ? "text-blue-600"
                   : "text-gray-100"
               } `}
                aria-current="page"
                onClick={() => seleccionarClicks("login")}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className={`btn btn-blue ${
                  seleccionarOpcion === "registro"
                    ? "text-blue-600"
                    : "text-gray-100"
                } `}
                aria-current="page"
                onClick={() => seleccionarClicks("registro")}
              >
                Registrarse
              </Link>
            </>
          )}

          <button
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mega-menu"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          id="mega-menu"
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
            <li>
              <Link
                to="/"
                className={`nav ${
                  seleccionarOpcion === "inicio"
                    ? "text-blue-600"
                    : "text-gray-100"
                } `}
                aria-current="page"
                onClick={() => seleccionarClicks("inicio")}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/noticias"
                className={`nav ${
                  seleccionarOpcion === "noticias"
                    ? "text-blue-600"
                    : "text-gray-100"
                } `}
                aria-current="page"
                onClick={() => seleccionarClicks("noticias")}
              >
                Noticias
              </Link>
            </li>
            <li>
              <Link
                to="/recorridos"
                className={`nav ${
                  seleccionarOpcion === "recorridos"
                    ? "text-blue-600"
                    : "text-gray-100"
                } `}
                aria-current="page"
                onClick={() => seleccionarClicks("recorridos")}
              >
                Recorridos culturales
              </Link>
            </li>
            <li>
              <Link
                to="/reporte"
                className={`nav ${
                  seleccionarOpcion === "reporte"
                    ? "text-blue-600"
                    : "text-gray-100"
                } `}
                aria-current="page"
                onClick={() => seleccionarClicks("reporte")}
              >
                Reportes ciudadanos
              </Link>
            </li>
            <li>
              <Link
                to="/biblioteca-virtual"
                className={`nav ${
                  seleccionarOpcion === "biblioteca"
                    ? "text-blue-600"
                    : "text-gray-100"
                } `}
                aria-current="page"
                onClick={() => seleccionarClicks("biblioteca")}
              >
                Biblioteca virtual
              </Link>
            </li>
            <li>
              <Link
                to="/acerca"
                className={`nav ${
                  seleccionarOpcion === "acerca"
                    ? "text-blue-600"
                    : "text-gray-100"
                } `}
                aria-current="page"
                onClick={() => seleccionarClicks("acerca")}
              >
                Acerca de nosotros
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
