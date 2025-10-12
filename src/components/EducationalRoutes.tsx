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
  onPanToEvent: (latitude: number, longitude: number) => void;
}

const EducationalRoutes = ({ onPanToEvent }: EducationalRoutesProps) => {
  const [routes] = useState<EducationalRoute[]>([
    {
      id: 'rus_baptism',
      title: 'Становление Русского государства',
      description: 'Путь от объединения славянских племен до крещения Руси',
      events: [
        { title: 'Объединение под Киевом', latitude: 50.4501, longitude: 30.5234 },
        { title: 'Крещение Руси', latitude: 50.4501, longitude: 30.5234 },
        { title: 'Первые летописи', latitude: 50.4501, longitude: 30.5234 }
      ],
      duration: 'IX-X век'
    },
    {
      id: 'mongol_invasion',
      title: 'Монгольское нашествие',
      description: 'Завоевание Руси и период ордынского ига',
      events: [
        { title: 'Батыево нашествие', latitude: 50.4501, longitude: 30.5234 },
        { title: 'Падение Киева', latitude: 50.4501, longitude: 30.5234 },
        { title: 'Стояние на Угре', latitude: 55.0000, longitude: 38.0000 }
      ],
      duration: 'XIII-XV век'
    },
    {
      id: 'peter_reforms',
      title: 'Эпоха Петра I',
      description: 'Преобразования Петра Великого и становление империи',
      events: [
        { title: 'Северная война', latitude: 59.9343, longitude: 30.3351 },
        { title: 'Основание Петербурга', latitude: 59.9343, longitude: 30.3351 },
        { title: 'Табель о рангах', latitude: 55.7558, longitude: 37.6173 }
      ],
      duration: 'Конец XVII - начало XVIII века'
    },
    {
      id: 'ww1',
      title: 'Первая мировая война',
      description: 'Россия в Первой мировой войне',
      events: [
        { title: 'Восточный фронт', latitude: 50.0000, longitude: 30.0000 },
        { title: 'Брусиловский прорыв', latitude: 50.0000, longitude: 30.0000 },
        { title: 'Февральская революция', latitude: 59.9343, longitude: 30.3351 }
      ],
      duration: '1914-1917 гг.'
    }
  ]);

  const [selectedRoute, setSelectedRoute] = useState<EducationalRoute | null>(null);

  return (
    !selectedRoute ? (
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {routes.map(route => (
          <div
            key={route.id}
            className="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
            onClick={() => setSelectedRoute(route)}
          >
            <h4 className="font-semibold">{route.title}</h4>
            <p className="text-sm text-gray-600 mb-1">{route.duration}</p>
            <p className="text-sm text-gray-500">{route.description}</p>
          </div>
        ))}
      </div>
    ) : (
      <div>
        <button
          onClick={() => setSelectedRoute(null)}
          className="mb-2 text-blue-600 hover:text-blue-800"
        >
          ← Назад к маршрутам
        </button>
        
        <h4 className="font-bold text-lg mb-2">{selectedRoute.title}</h4>
        <p className="text-gray-600 mb-3">{selectedRoute.duration}</p>
        <p className="mb-4">{selectedRoute.description}</p>
        
        <h5 className="font-semibold mb-2">События в маршруте:</h5>
        <ul className="list-disc pl-5 space-y-1 mb-4">
          {selectedRoute.events.map((event, index) => (
            <li key={index} className="text-gray-700">
              {event.title}
              <button
                className="ml-2 text-blue-500 hover:text-blue-700 text-xs"
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