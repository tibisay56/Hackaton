import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'admin@example.com' && password === 'password123') {
      navigate('/dashboard');
    } else {
      setError('Credenciales inválidas, por favor intente de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar className="fixed top-0 left-0 w-full z-50 bg-gray-800 shadow-lg" />
      <div className="pt-20 flex items-center justify-center">
        <div className="w-full max-w-sm p-6 bg-gray-700 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-white mb-6">¡Hola!</h2>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ejemplo@correo.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm text-gray-300">Recordarme</label>
              </div>
              <a href="#" className="text-sm text-white hover:underline">¿Olvidaste tu contraseña?</a>
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-gray-700 text-white font-semibold rounded-full hover:bg-white hover:text-black focus:outline-none border border-white"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link
              to="/register"
              className="text-white hover:underline"
            >
              Regístrate aquí
            </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
