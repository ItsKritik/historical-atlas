'use client';

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Исправляем проблему с иконками маркеров в Leaflet
const icon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface City {
  id: number;
  name: string;
  founded: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface HistoricalCitiesLayerProps {
  cities: City[];
}

const HistoricalCitiesLayer: React.FC<HistoricalCitiesLayerProps> = ({ cities }) => {
  return (
    <>
      {cities.map(city => (
        <Marker key={city.id} position={[city.latitude, city.longitude]} icon={icon}>
          <Popup>
            <div>
              <h3 style={{ fontWeight: 'bold' }}>{city.name}</h3>
              <p>Основан: {city.founded}</p>
              <p>{city.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default HistoricalCitiesLayer;