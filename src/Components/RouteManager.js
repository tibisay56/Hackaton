import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import api from '../Services/api';
import '../styles.css';
import Map from '../Components/Map';
import { show_alerta } from '../funtions';

const RouteManager = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [vehicleCategory, setVehicleCategory] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [city, setCity] = useState('');
  const [roadCondition, setRoadCondition] = useState('');
  const [kilometersTraveled, setKilometersTraveled] = useState('');
  const [startTime, setStartTime] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Fetch routes from the API
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await api.get('/routes');
        setRoutes(response.data);
      } catch (error) {
        console.error('Error fetching routes', error);
        show_alerta('Error al obtener rutas', 'error', '');
      }
    };
    fetchRoutes();
  }, []);

  // Select location handler
  const handleSelectLocation = (coords) => {
    setSelectedCoordinates(coords);
    console.log('Coordenadas seleccionadas:', coords);
  };

  const validateForm = () => {
    const errors = {};
    if (!city) errors.city = 'La ciudad es obligatoria.';
    if (!vehicleCategory) errors.vehicleCategory = 'El tipo de vehículo es obligatorio.';
    if (!fuelType) errors.fuelType = 'El tipo de combustible es obligatorio.';
    if (!roadCondition) errors.roadCondition = 'El estado de la vía es obligatorio.';
    if (!kilometersTraveled || kilometersTraveled <= 0) {
      errors.kilometersTraveled = 'Ingresa un valor válido para los kilómetros recorridos.';
    }
    if (!startTime) errors.startTime = 'La hora de inicio es obligatoria.';
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      show_alerta('Por favor corrige los errores en el formulario.', 'error', '');
      return;
    }
    setErrors({});
    console.log({
      city,
      vehicleCategory,
      fuelType,
      roadCondition,
      kilometersTraveled,
      startTime,
    });
    show_alerta('Formulario enviado correctamente', 'success', '');
  };

  return (
    <section className="routes-section">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Route Manager</h2>
      </div>

      {/* Coordenadas Seleccionadas */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6 m w-full sm:w-96">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Coordenadas Seleccionadas</h3>
        <div className="space-y-2">
          <p className="text-gray-600"><strong>Latitud:</strong> {selectedCoordinates ? selectedCoordinates.lat : 'Selecciona un lugar'}</p>
          <p className="text-gray-600"><strong>Longitud:</strong> {selectedCoordinates ? selectedCoordinates.lng : 'Selecciona un lugar'}</p>
        </div>
      </div>

      {/* Mapa */}
      <div className="mt-16 rounded-lg shadow-lg overflow-hidden">
        <Map onSelectLocation={handleSelectLocation} />
      </div>

      {/* Formulario */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6 m w-full sm:w-96">
        <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">Cálculo de Consumo</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-gray-600 mb-1" htmlFor="vehicleCategory">
              Tipo de Vehículo
            </label>
            <select
              id="vehicleCategory"
              value={vehicleCategory}
              onChange={(e) => setVehicleCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="Motos">Motos</option>
              <option value="Automóviles">Automóviles</option>
              <option value="Camiones">Camión</option>
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
            <label className="block text-gray-600 mb-1" htmlFor="roadCondition">
              Estado de la Vía
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
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="startTime">
              Hora Inicio (ISO8601)
            </label>
            <input
              type="datetime-local" // Tipo para seleccionar fecha y hora
              id="startTime"
              value={startTime} // Estado correspondiente
              onChange={(e) => setStartTime(e.target.value)} // Actualiza el estado
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="kilometersTraveled">
              Kilómetros Recorridos
            </label>
            <input
              type="number"
              id="kilometersTraveled"
              value={kilometersTraveled}
              onChange={(e) => setKilometersTraveled(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ingrese los kilómetros recorridos"
            />
          </div>
          <button type="submit" className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg mt-4">
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





