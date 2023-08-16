import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuFlotante({ logout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className={`${
          isOpen ? "hidden" : "block"
        } btn btn-blue flex items-center `}
        onClick={toggleDropdown}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <button
        className={`${
          isOpen ? "block" : "hidden"
        } btn btn-blue flex items-center `}
        onClick={toggleDropdown}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20`}
      >
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <Link
            to="/mis-noticias"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 
              dark:hover:text-white"
            role="menuitem"
          >
            Mis noticias
          </Link>
          <Link
            to="/agregar-noticia"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 
              dark:hover:text-white"
            role="menuitem"
          >
            Agregar noticia
          </Link>
          {/* <Link
            to="/perfil"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 
              dark:hover:text-white"
            role="menuitem"
          >
            Perfil
          </Link> */}
          <Link
            to="/bibliotecaForm"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 
              dark:hover:text-white"
            role="menuitem"
          >
            Subir libro
          </Link>
          <div className="border-t border-gray-100"></div>
          <Link
            to="/"
            onClick={() => {
              logout();
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 
              dark:hover:text-white"
            role="menuitem"
          >
            Cerrar sesion
          </Link>
        </div>
      </div>
    </div>
  );
}
