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
    googleMapsApiKey: credentials.mapsKey, 
  });

  const [markerPosition, setMarkerPosition] = useState(null);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setMarkerPosition({ lat, lng });

    onSelectLocation({ lat, lng });
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onClick={handleMapClick} 
    >
      {markerPosition && (
        <Marker position={markerPosition} />
      )}
    </GoogleMap>
  );
};

export default Map;
