import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="text-2xl text-white font-bold">
        <Link to="/" className="no-underline text-white">GeoTab</Link>
        </h1>

        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <div
          className={`lg:flex ${isOpen ? 'block' : 'hidden'} flex-col gap-4 mt-4 lg:mt-0 lg:flex-row mb-4`}
        >
          <Link
            to="/login"
            className="text-white font-semibold px-3 py-1 hover:bg-gray-700 rounded-md no-underline"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-white font-semibold px-3 py-1 hover:bg-gray-700 rounded-md no-underline"
          >
            Registro
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

