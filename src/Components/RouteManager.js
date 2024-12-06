import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; 
import api from '../Services/api';
import '../styles.css';
import Map from '../Components/Map';

const RouteManager = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null); 
  const [editRoute, setEditRoute] = useState(null);
  const [vehicleCategory, setVehicleCategory] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [city, setCity] = useState('');
  const [isDay, setIsDay] = useState(false);
  const [roadCondition, setRoadCondition] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await api.get('/routes');
        setRoutes(response.data);
      } catch (error) {
        console.error('Error fetching routes', error);
      }
    };
    fetchRoutes();
  }, []);

  const handleCreateRedirect = () => {
    navigate('/dashboard/routes/create');
  };

  const handleEditRoute = (route) => {
    setEditRoute(route); 
  };

  const handleDeleteRoute = async (routeId) => {
    try {
      await api.delete(`/routes/${routeId}`);
      setRoutes(routes.filter(route => route.id !== routeId));
    } catch (error) {
      console.error('Error deleting route', error);
    }
  };

  const handleSelectLocation = (coords) => {
    setSelectedCoordinates(coords);
    console.log('Coordenadas seleccionadas:', coords); 
  };


  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí agregas la lógica para manejar los datos del formulario, por ejemplo:
    console.log({
      vehicleCategory,
      fuelType,
      city,
      isDay,
      roadCondition,
    });
  };

  return (
    <section className="routes-section">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Route Manager</h2>
      </div>

         {/* Sección fija de coordenadas */}
         <div className="bg-white p-4 rounded-lg shadow-md mt-6 m w-full sm:w-96">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Coordenadas Seleccionadas</h3>
        <div className="space-y-2">
          <p className="text-gray-600"><strong>Latitud:</strong> {selectedCoordinates ? selectedCoordinates.lat : 'Selecciona un lugar'}</p>
          <p className="text-gray-600"><strong>Longitud:</strong> {selectedCoordinates ? selectedCoordinates.lng : 'Selecciona un lugar'}</p>
        </div>
      </div>

      {/* Mapa integrado */}
      <div className="mt-16 rounded-lg shadow-lg overflow-hidden">
        <Map onSelectLocation={handleSelectLocation} />
      </div>

      {/* Formulario de detalles */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6 m w-full sm:w-96">
        <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">Calculo de consumo</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="vehicleCategory">
              Categoría del Vehículo
            </label>
            <select
                id="vehicleCategory"
                value={vehicleCategory}
                onChange={(e) => setVehicleCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
              <option value="Motos">Motos</option>
                <option value="Automóviles">Automóviles</option>
                <option value="Camiones">Camiones</option>
                <option value="Desconocido">Desconocido</option>
            </select>
          </div>
          <div>
          <label className="block text-gray-600 mb-1" htmlFor="fuelType">
              Tipo de Combustible
            </label>
            <select
              id="fuelType"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="Diesel">Diesel</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Gas Natural">Gas Natural</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="city">
              Ciudad
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="Barranquilla">Barranquilla</option>
              <option value="Cali">Cali</option>
              <option value="Medellín">Medellín</option>
              <option value="Bogotá">Bogotá</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="isDay">
              ¿Es de día?
            </label>
            <select
              id="isDay"
              value={isDay}
              onChange={(e) => setIsDay(e.target.value === 'true')}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="roadCondition">
              Condición de la Vía
            </label>
            <select
              id="roadCondition"
              value={roadCondition}
              onChange={(e) => setRoadCondition(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="Excelente">Excelente</option>
              <option value="Bueno">Bueno</option>
              <option value="Regular">Regular</option>
              <option value="Malo">Malo</option>
              <option value="Crítico">Crítico</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg mt-4"
          >
            Calcular
          </button>

           {/* Input para mostrar el resultado del cálculo */}
       
          <div className="mt-4">
            <label className="block text-gray-600 mb-1">Total Consumo</label>
            <input
              type="text"
              id="total"
              readOnly
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>
      
        </form>
      </div>

   
    </section>
  );
};

export default RouteManager;




