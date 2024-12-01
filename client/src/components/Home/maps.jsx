import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Maps = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,


  });


  const [mapCenter, setMapCenter] = useState([37.7577, -122.4376]); // Default to a location (San Francisco)


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setCoordinates({ latitude, longitude });
          setMapCenter([latitude, longitude]); // Update map center to current location

        },

        (error) => {

          console.error('Error fetching location:', error);

        }
      );
    } else {

      console.error('Geolocation is not supported by this browser.');

    }

  }, []);

  const locationIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // Default marker
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowAnchor: [10, 41],
    shadowSize: [41, 41],
  });

  return (
    <div style={{ width: '100%', height: '500px' }}>
      {coordinates.latitude && coordinates.longitude ? (
        <MapContainer
          center={mapCenter}
          zoom={12}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Marker at user's current location */}
          <Marker position={mapCenter} icon={locationIcon}>
            <Popup>Your current location</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading location...</p>
        
      )}
    </div>
  );
};

export default Maps;
