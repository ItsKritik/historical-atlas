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

const cities: City[] = [
  { id: 1, name: "Киев", founded: "482", description: "Древняя столица Руси, один из старейших городов Восточной Европы.", latitude: 50.4501, longitude: 30.5234 },
  { id: 2, name: "Новгород", founded: "859", description: "Важный торговый и политический центр средневековой Руси.", latitude: 58.521, longitude: 31.275 },
  { id: 3, name: "Москва", founded: "1147", description: "Столица России, один из крупнейших городов мира.", latitude: 55.7558, longitude: 37.6173 },
  { id: 4, name: "Санкт-Петербург", founded: "1703", description: "Культурная столица России, основанная Петром I.", latitude: 59.9343, longitude: 30.3351 },
];

const HistoricalCitiesLayer = () => {
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