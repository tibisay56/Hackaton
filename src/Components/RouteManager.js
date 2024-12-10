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
  const [formType, setFormType] = useState('');
  const [totalConsumption, setTotalConsumption] = useState(null);
  const navigate = useNavigate();
  const [showTable, setShowTable] = useState(false);

    const [licenseCategory, setLicenseCategory] = useState('A1');
    const [licenseExpDate, setLicenseExpDate] = useState('2010-02-27');
    const [licenseExpiryDate, setLicenseExpiryDate] = useState('2022-02-26');
    const [averageSpeed, setAverageSpeed] = useState(20); 
    const [accuracy, setAccuracy] = useState(60.14);
    const [events, setEvents] = useState({
      accident: 0.70,
      maintenance: 0.69,
      badWeather: 0.00,
      congestion: 45.23,
      policeControl: 1.46,
      protest: 0.69,
      construction: 47.29,
      noEvents: 3.15,
      breakdown: 0.79
    });
  
    const calculateFineProbability = () => {
      const totalProbability = Object.values(events).reduce((acc, curr) => acc + curr, 0);
      const fineProbability = (accuracy / 100) * (totalProbability / 100);
      return fineProbability.toFixed(2);
    };
   const handleButtonClick = () => {
        setShowTable(true); 
      };

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

  const handleSelectLocation = (coords) => {
    setSelectedCoordinates(coords);
    console.log('Coordenadas seleccionadas:', coords);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

        // Calcular el consumo
        let consumptionPer100km = 10; 
        if (vehicleCategory === 'Camión') consumptionPer100km = 20; 
        else if (vehicleCategory === 'Automóviles') consumptionPer100km = 8; 
        else if (vehicleCategory === 'Motos') consumptionPer100km = 5; 
      
        // Ajuste según el estado de la vía
        if (roadCondition === 'Excelente') consumptionPer100km *= 0.9; 
        else if (roadCondition === 'Crítico') consumptionPer100km *= 1.2; 
      
        // Calcular el consumo total en litros
        const totalLiters = (kilometersTraveled / 100) * consumptionPer100km;
        const totalGalons = totalLiters * 0.264172;
      
        setTotalConsumption(totalGalons.toFixed(2));
        show_alerta('Formulario enviado correctamente', 'success', '');
      };
   

  return (
    <section className="routes-section flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 pr-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-8">Route Manager</h2>

          <div className="mt-8">
            <button
              onClick={() => setFormType('consumo')} 
              className="bg-white text-black px-4 py-2 mr-4 rounded-full border hover:bg-black hover:text-white  !important"
            >
              Consumo
            </button>
            <button
              onClick={() => setFormType('multas')} 
              className="bg-white text-black px-4 py-2 mr-4 rounded-full border"
            >
              Multas
            </button>
            <button
              onClick={() => setFormType('evento')} 
              className="bg-white text-black px-4 py-2 mr-4 rounded-full border"
            >
              Eventos
            </button>
          </div>
        </div>


        {/* Formularios */}
        {formType === 'consumo' && (
          <div className="bg-white p-4 rounded-lg shadow-md mt-6">
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
                  type="datetime-local" 
                  id="startTime"
                  value={startTime} 
                  onChange={(e) => setStartTime(e.target.value)} 
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
              <button type="submit" className="bg-black text-white px-4 py-2 mt-4 rounded-full border">
                Calcular Consumo
              </button>

                 {/* Input para mostrar el resultado del cálculo */}
              {totalConsumption && (
                <div className="mt-4">
                  <label className="block text-gray-600 mb-1">Total Consumo</label>
                  <input
                    type="text"
                    id="total"
                    value={totalConsumption}
                    readOnly
                    className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                  />
                </div>
              )}

            </form>
          </div>
        )}

      {formType === 'multas' && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">Cálculo probabilidad multa</h3>
        
          
        <div className="form-fields">
          <label className="block text-gray-600 mb-1">Categoría de Licencia</label>
          <select
            value={licenseCategory}
            onChange={(e) => setLicenseCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="A3">A3</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="B3">B3</option>
          </select>
        </div>
          
          <div className="form-fields">
            <label className="block text-gray-600 mb-1">Fecha de Expedición</label>
            <input
              type="date"
              value={licenseExpDate}
              onChange={(e) => setLicenseExpDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="form-fields">
            <label className="block text-gray-600 mb-1">Fecha de Vencimiento</label>
            <input
              type="date"
              value={licenseExpiryDate}
              onChange={(e) => setLicenseExpiryDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="form-fields">
            <label className="block text-gray-600 mb-1">Velocidad Promedio (km/h)</label>
            <input
              type="number"
              value={averageSpeed}
              onChange={(e) => setAverageSpeed(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="20"
            />
          </div>
          <button type="submit" className="bg-black text-white px-4 py-2 mt-4 rounded-full border">
                Calcular Multa
              </button>

          {/* Probabilidad de Multa */}
          <div className="mt-4">
            <div className="result">
            <input
                    type="text"
                    id="total"
                    value={calculateFineProbability()}
                    readOnly
                    className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                  />
            </div>
          </div>
        </div>
      )}
     

      {formType === 'evento' && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">Eventos y Probabilidades</h3>

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
                <label className="block text-gray-600 mb-1" htmlFor="kilometersTraveled">
                  Velocidad promedio
                </label>
                <input
                  type="number"
                  id="kilometersTraveled"
                  value={kilometersTraveled}
                  onChange={(e) => setKilometersTraveled(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Ingrese velocidad promedio"
                />
              </div>

         <button type="submit" className="bg-black mb-4 text-white px-4 py-2 mt-4 rounded-full border"
          onClick={handleButtonClick}r>
                Calcular Probabilidad de Evento
              </button>

          <div className="overflow-x-auto">
           
      {showTable && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Evento</th>
                <th className="px-4 py-2 border">Probabilidad (%)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(events).map(([event, probability]) => (
                <tr key={event}>
                  <td className="px-4 py-2 border">{event}</td>
                  <td className="px-4 py-2 border">{probability}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
          </div>
          <div className="mt-4">
          </div>
         
        </div>
      )}
      </div>
      {/* Mapa */}
      <div className="w-full lg:w-1/2 mt-32 h-[500px]">
        <Map
          onSelectLocation={handleSelectLocation} 
          coordinates={selectedCoordinates} 
        />   
        
     <div className="bg-white p-4 rounded-lg shadow-md mt-10 m w-full sm:w-96">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Coordenadas Seleccionadas</h3>
        <div className="space-y-2">
          <p className="text-gray-600"><strong>Latitud:</strong> {selectedCoordinates ? selectedCoordinates.lat : 'Selecciona un lugar'}</p>
          <p className="text-gray-600"><strong>Longitud:</strong> {selectedCoordinates ? selectedCoordinates.lng : 'Selecciona un lugar'}</p>
        </div>
      </div>
      
      </div>
    </section>
  );
};

export default RouteManager;





