import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import credentials from '../Services/credentials';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

const Map = ({ onSelectLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: credentials.mapsKey, // Asegúrate de tener tu clave API configurada
  });

  const [markerPosition, setMarkerPosition] = useState(null); // Estado para almacenar la posición del marcador

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // Establecer la posición del marcador
    setMarkerPosition({ lat, lng });

    // Pasar las coordenadas al componente padre (RouteManager)
    onSelectLocation({ lat, lng });
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={handleMapClick} // Establecer el listener para clic
    >
      {markerPosition && (
        <Marker position={markerPosition} />
      )}
    </GoogleMap>
  );
};

export default Map;
