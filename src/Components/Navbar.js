import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Si estás usando React Router para navegación

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el menú
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl text-white font-bold">
        <a href="/" className="no-underline text-white">GeoTab</a>
        </h1>

        {/* Ícono de hamburguesa, solo visible en pantallas pequeñas */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Menú de navegación */}
        <div
          className={`lg:flex ${isOpen ? 'block' : 'hidden'} flex-col gap-4 mt-4 lg:mt-0 lg:flex-row`}
        >
          <Link
            to="/"
            className="text-white font-semibold px-4 py-2 hover:bg-gray-700 rounded-md no-underline"
          >
            Inicio
          </Link>
          <Link
            to="/login"
            className="text-white font-semibold px-4 py-2 hover:bg-gray-700 rounded-md no-underline"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-white font-semibold px-4 py-2 hover:bg-gray-700 rounded-md no-underline"
          >
            Registro
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

