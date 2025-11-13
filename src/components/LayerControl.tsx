'use client';

import React, { useState } from 'react';

interface LayerControlProps {
  layers: {
    events: boolean;
    routes: boolean;
    cities: boolean;
  };
  setLayers: React.Dispatch<React.SetStateAction<{
    events: boolean;
    routes: boolean;
    cities: boolean;
  }>>;
}

const LayerControl: React.FC<LayerControlProps> = ({ layers, setLayers }) => {
  const layerConfig = [
    { id: 'events', name: 'Исторические события' },
    { id: 'routes', name: 'Образовательные маршруты' },
    { id: 'cities', name: 'Исторические города' },
  ];

  const toggleLayer = (id: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="absolute top-20 right-4 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-4 rounded-lg shadow-lg z-10 w-64">
      <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">Слои карты</h3>
      <div className="space-y-2">
        {layerConfig.map(layer => (
          <div key={layer.id} className="flex items-center">
            <input
              type="checkbox"
              id={layer.id}
              checked={layers[layer.id as keyof typeof layers]}
              onChange={() => toggleLayer(layer.id as keyof typeof layers)}
              className="h-4 w-4 text-blue-600 rounded bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor={layer.id} className="ml-2 text-gray-700 dark:text-gray-300">
              {layer.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayerControl;