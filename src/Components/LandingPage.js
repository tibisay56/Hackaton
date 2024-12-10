import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
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
    <div className="bg-black font-sans leading-normal tracking-normal">
      <Navbar />
      <section className="relative bg-black text-white text-center py-60 px-8">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="Hackaton/videos/mundo.mp4" type="video/mp4" />
          Tu navegador no soporta videos.
        </video>

        <div className="relative z-10 flex justify-between items-center flex-col md:flex-row">
          <div className="flex flex-col items-start mx-8 md:ml-64 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4 text-left md:text-5xl">
              Optimiza tus rutas fácilmente
            </h1>
            <p className="text-xl mb-8 max-w-3xl text-left md:text-2xl">
              Planificación inteligente de rutas para un transporte <br /> más seguro y rentable.
            </p>
            <a
              href="/hackaton/dashboard"
              className="bg-transparent text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition border border-white no-underline"
            >
              Comienza Ahora
            </a>
          </div>
        </div>
      </section>

       <section id="geotab" className="py-20 bg-white text-center">
          <h2 className="text-3xl font-bold text-black mb-12">Nuestros Servicios</h2>
          <div className="flex justify-center gap-12 flex-wrap">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md w-80">
              <h3 className="text-2xl font-semibold text-black mb-4">Gestión de Usuarios</h3>
              <p className="text-gray-600">Registrar y gestionar usuarios como gestores o pasajeros para una administración eficiente.</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-md w-80">
              <h3 className="text-2xl font-semibold text-black mb-4">Gestión de Vehículos</h3>
              <p className="text-gray-600">Registrar vehículos y sus características, como capacidad, consumo y más, para optimizar tu flota.</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-md w-80">
              <h3 className="text-2xl font-semibold text-black mb-4">Planificación de Rutas</h3>
              <p className="text-gray-600">Registrar rutas con origen, destino, estado de la vía, costos asociados y más para optimizar la logística.</p>
            </div>
          </div>

              <div className="flex justify-center gap-12 flex-wrap mt-12">
                <div className="bg-gray-100 p-8 rounded-lg shadow-md w-80">
                  <h3 className="text-2xl font-semibold text-black mb-4">Optimización de Rutas</h3>
                  <p className="text-gray-600">Implementa un sistema para la planificación de rutas, considerando restricciones de tiempo y optimización de costos.</p>
                </div>
                <div className="bg-gray-100 p-8 rounded-lg shadow-md w-80">
                  <h3 className="text-2xl font-semibold text-black mb-4">Predicción de Demanda</h3>
                  <p className="text-gray-600">Predice la demanda de transporte utilizando datos históricos y variables contextuales para un servicio eficiente.</p>
                </div>
              </div>
        </section>

          <section className="py-20 bg-black">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 md:mb-12">
            Lo que Dicen Nuestros Clientes
          </h2>
            <div className="flex justify-center gap-12 flex-wrap">
              <div className="bg-white p-8 rounded-lg shadow-md w-80">
                <p className="text-gray-600 mb-4">"Una plataforma increíble que me ha permitido optimizar mis rutas y gestionar mis flotas de manera más eficiente."</p>
                <h4 className="font-semibold text-gray-800">Carlos Martínez</h4>
                <p className="text-gray-500">Gerente de Flotas, Transporte X</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md w-80">
                <p className="text-gray-600 mb-4">"Gracias a Geotab, hemos mejorado la planificación de nuestras rutas, optimizando costos y reduciendo tiempos de espera."</p>
                <h4 className="font-semibold text-gray-800">Ana López</h4>
                <p className="text-gray-500">Directora de Operaciones, Logística Global</p>
              </div>
            </div>
          </section>

          <section className="bg-black text-white text-center py-20">
            <h2 className="text-3xl font-bold mb-4">¿Estás Listo para Optimizar tu Logística?</h2>
            <p className="text-xl mb-8">Rutas inteligentes, transporte seguro y rentable.</p>
            <a
              href="/hackaton/register"
              className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition no-underline"
            >
              Comienza Ahora
            </a>
          </section>

      <footer className="bg-gray-800 text-white text-center py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://facebook.com" className="text-white hover:text-gray-400">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="https://twitter.com" className="text-white hover:text-gray-400">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="https://linkedin.com" className="text-white hover:text-gray-400">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a href="https://instagram.com" className="text-white hover:text-gray-400">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </div>
          <div className="flex justify-center space-x-8 mb-6">
            <a href="/about" className="text-white hover:text-gray-400 no-underline">Acerca de</a>
            <a href="/privacy" className="text-white hover:text-gray-400 no-underline">Privacidad</a>
            <a href="/terms" className="text-white hover:text-gray-400 no-underline">Términos de uso</a>
          </div>
          <p className="text-sm">&copy; 2024 Quantum Coders. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
