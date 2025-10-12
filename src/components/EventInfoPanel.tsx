'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface HistoricalEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  sources: string[];
}

interface EventInfoPanelProps {
  onPanToEvent: (latitude: number, longitude: number) => void;
}

const EventInfoPanel = ({ onPanToEvent }: EventInfoPanelProps) => {
  // Пример данных о исторических событиях
  const sampleEvents: HistoricalEvent[] = [
    {
      id: 1,
      title: "Крещение Руси",
      date: "988 год",
      description: "Принятие христианства князем Владимиром Святославичем. Это событие оказало огромное влияние на развитие русской культуры, литературы и искусства.",
      location: "Киев",
      latitude: 50.4501,
      longitude: 30.5234,
      sources: ["https://ru.wikipedia.org/wiki/Крещение_Руси"]
    },
    {
      id: 2,
      title: "Основание Москвы",
      date: "1147 год",
      description: "Юрий Долгорукий пригласил своего союзника Святослава Ольговича на встречу в Москву, что считается официальной датой основания города.",
      location: "Москва",
      latitude: 55.7558,
      longitude: 37.6173,
      sources: ["https://ru.wikipedia.org/wiki/Москва"]
    },
    {
      id: 3,
      title: "Куликовская битва",
      date: "8 сентября 1380 год",
      description: "Сражение между войском Дмитрия Донского и ханом Мамаем, в котором русские войска одержали победу, что стало важным этапом в борьбе с монголо-татарским игом.",
      location: "Куликово поле",
      latitude: 54.7298,
      longitude: 38.9638,
      sources: ["https://ru.wikipedia.org/wiki/Куликовская_битва"]
    }
  ];

  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(sampleEvents[0]);

  return (
    selectedEvent ? (
      <div className="max-h-[70vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedEvent.title}</h2>
        <p className="text-gray-600 mb-2">{selectedEvent.date}</p>
        <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
        <p className="text-gray-600 mb-4">Место: {selectedEvent.location}</p>
        
        {selectedEvent.imageUrl && (
          <Image
            src={selectedEvent.imageUrl}
            alt={selectedEvent.title}
            width={320}
            height={192}
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}
        
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800 mb-2">Источники:</h3>
          <ul className="list-disc pl-5">
            {selectedEvent.sources.map((source, index) => (
              <li key={index}>
                <a
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Источник {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {selectedEvent && (
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={() => {
              onPanToEvent(selectedEvent.latitude, selectedEvent.longitude);
            }}
          >
            Показать на карте
          </button>
        )}
      </div>
    ) : (
      <p className="text-gray-700">Выберите событие на карте, чтобы увидеть информацию о нем.</p>
    )
  );
};

export default EventInfoPanel;