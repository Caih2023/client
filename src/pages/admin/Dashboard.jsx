import React, { useState } from "react";
import {
  AiOutlineMenuUnfold,
  AiFillDashboard,
  AiOutlineUser,
  AiOutlineInbox,
} from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import imagen from "../../assets/perfil.png";
import caihf from "../../assets/logo2.png";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const [menuUsuario, setMenuUsuario] = useState(false);
  const [menuDashboard, setMenuDashboard] = useState(true);
  const { isAuthenticated, logout, usuario } = useAuth();

  const toggleMenuUsuario = () => {
    setMenuUsuario(!menuUsuario);
  };

  const toggleMenuDashboard = () => {
    setMenuDashboard(!menuDashboard);
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-gris-960 border-b border-gris-960 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center ml-3 flex-wrap justify-between">
            <div className="flex flex-wrap items-center">
              <div>
                <button
                  type="button"
                  className="md:hidden sm:flex"
                  aria-expanded={menuDashboard}
                  onClick={toggleMenuDashboard}
                >
                  <span className="sr-only">Open dashboard menu</span>
                  <AiOutlineMenuUnfold
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <a className="flex ml-2 md:mr-24">
                <img src={caihf} className="h-8 mr-3" alt="Caih Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  CAIH
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3 flex-wrap">
                <div className="grid grid-cols-2 items-center justify-items-center">
                  <button className="btn">hola</button>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded={menuUsuario}
                    onClick={toggleMenuUsuario}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 rounded-full flex-shrink-0"
                      src={imagen}
                      alt="user photo"
                    />
                  </button>
                </div>
                {menuUsuario && (
                  <div className="container relative">
                    <div
                      className="z-50 absolute right-0 mt-4 text-base bg-gris-960 divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                      id="dropdown-user"
                    >
                      <div className="px-4 py-3" role="none">
                        <p
                          className="text-sm text-gray-900 dark:text-white"
                          role="none"
                        >
                          {usuario.usuario}
                        </p>
                        <p
                          className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                          role="none"
                        >
                          {usuario.correo}
                        </p>
                      </div>
                      <ul className="py-1" role="none">
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Dashboard
                          </a>
                        </li>
                        {/* <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Settings
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Earnings
                          </a>
                        </li> */}
                        <li>
                          <Link
                            to="/"
                            onClick={() => {
                              logout();
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Sign out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      {menuDashboard && (
        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gris-960 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-gris-960 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to={"/dashboard/agregar-recorrido"}
                  className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <AiFillDashboard />
                  <span className="ml-3">Agregar recorridos</span>
                </Link>
              </li>
              <li>
                <Link to={"/dashboard/reportes-ciudadanos"}>
                  <a className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    <AiOutlineUser />

                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Reportes ciudadanos
                    </span>
                  </a>
                </Link>
              </li>
              {/* <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <AiOutlineInbox />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Bandeja de entrada
                  </span>
                </a>
              </li> */}
            </ul>
          </div>
        </aside>
      )}
      <div className="ml-64 pt-28 pl-5 pr-5">
        {/* Aquí se mostrará el contenido de las rutas anidadas */}
        <Outlet />
      </div>
    </div>
  );
}
