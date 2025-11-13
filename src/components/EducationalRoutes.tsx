'use client';

import React, { useState } from 'react';

interface EducationalEvent {
  title: string;
  latitude: number;
  longitude: number;
}

interface EducationalRoute {
  id: string;
  title: string;
  description: string;
  events: EducationalEvent[]; // Изменено на EducationalEvent[]
  duration: string;
}

interface EducationalRoutesProps {
  routes: EducationalRoute[];
  onPanToEvent: (latitude: number, longitude: number) => void;
}

const EducationalRoutes = ({ routes, onPanToEvent }: EducationalRoutesProps) => {
  const [selectedRoute, setSelectedRoute] = useState<EducationalRoute | null>(null);

  return (
    !selectedRoute ? (
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {routes.map(route => (
          <div
            key={route.id}
            className="p-3 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => setSelectedRoute(route)}
          >
            <h4 className="font-semibold text-gray-800 dark:text-white">{route.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{route.duration}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{route.description}</p>
          </div>
        ))}
      </div>
    ) : (
      <div>
        <button
          onClick={() => setSelectedRoute(null)}
          className="mb-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          ← Назад к маршрутам
        </button>
        
        <h4 className="font-bold text-lg text-gray-800 dark:text-white mb-2">{selectedRoute.title}</h4>
        <p className="text-gray-600 dark:text-gray-300 mb-3">{selectedRoute.duration}</p>
        <p className="text-gray-800 dark:text-gray-200 mb-4">{selectedRoute.description}</p>
        
        <h5 className="font-semibold text-gray-800 dark:text-white mb-2">События в маршруте:</h5>
        <ul className="list-disc pl-5 space-y-1 mb-4">
          {selectedRoute.events.map((event, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              {event.title}
              <button
                className="ml-2 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs"
                onClick={() => onPanToEvent(event.latitude, event.longitude)}
              >
                [Показать]
              </button>
            </li>
          ))}
        </ul>
        
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          onClick={() => {
            if (selectedRoute.events.length > 0) {
              onPanToEvent(selectedRoute.events[0].latitude, selectedRoute.events[0].longitude);
            }
            console.log(`Начать маршрут: ${selectedRoute.title}`);
          }}
        >
          Начать маршрут
        </button>
      </div>
    )
  );
};

export default EducationalRoutes;