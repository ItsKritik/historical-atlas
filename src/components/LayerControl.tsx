'use client';

import React, { useState } from 'react';

interface Layer {
  id: string;
  name: string;
  visible: boolean;
}

const LayerControl = () => {
  const [layers, setLayers] = useState<Layer[]>([
    { id: 'events', name: 'Исторические события', visible: true },
    { id: 'routes', name: 'Торговые пути', visible: false },
    { id: 'cities', name: 'Исторические города', visible: false },
  ]);

  const toggleLayer = (id: string) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  return (
    <div className="absolute top-20 right-4 bg-white bg-opacity-90 p-4 rounded-lg shadow-lg z-10 w-64">
      <h3 className="font-bold text-lg mb-3">Слои карты</h3>
      <div className="space-y-2">
        {layers.map(layer => (
          <div key={layer.id} className="flex items-center">
            <input
              type="checkbox"
              id={layer.id}
              checked={layer.visible}
              onChange={() => toggleLayer(layer.id)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor={layer.id} className="ml-2 text-gray-700">
              {layer.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayerControl;