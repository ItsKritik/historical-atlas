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
  
  // Добавляем состояние для комментариев
  const [comments, setComments] = useState<{[key: number]: string[]}>({
    1: ["Очень важное событие в истории России", "Первый шаг к объединению русских земель"],
    2: ["Начало становления Москвы как политического центра"],
    3: ["Поворотный момент в борьбе с Ордой"]
  });
  
  // Добавляем состояние для нового комментария
  const [newComment, setNewComment] = useState('');
  
  // Система рекомендаций похожих событий
  const getRecommendedEvents = (event: HistoricalEvent): HistoricalEvent[] => {
    // Рекомендации на основе типа события, даты и региона
    return sampleEvents.filter(e =>
      e.id !== event.id &&
      (Math.abs(parseInt(e.date.split(' ')[0]) - parseInt(event.date.split(' ')[0])) < 100)
    ).slice(0, 2); // Ограничиваем до 2 рекомендаций
  };
  
  // Функция для добавления комментария
  const handleAddComment = () => {
    if (newComment.trim() && selectedEvent) {
      setComments(prev => ({
        ...prev,
        [selectedEvent.id]: [...(prev[selectedEvent.id] || []), newComment.trim()]
      }));
      setNewComment('');
    }
  };

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

        {/* Рекомендации похожих событий */}
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800 mb-2">Похожие события:</h3>
          <ul className="list-disc pl-5">
            {getRecommendedEvents(selectedEvent).map((event) => (
              <li key={`rec-${event.id}`} className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => setSelectedEvent(event)}>
                {event.title} ({event.date})
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
        
        {/* Кнопка шэринга контента */}
        <div className="mt-4">
          <button
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
            onClick={() => {
              if (selectedEvent) {
                // Функция для шэринга события
                const shareData = {
                  title: selectedEvent.title,
                  text: `${selectedEvent.title} (${selectedEvent.date}): ${selectedEvent.description}`,
                  url: window.location.href
                };
                
                if (navigator.share) {
                  navigator.share(shareData);
                } else {
                  // Резервный вариант для копирования ссылки
                  const link = `${window.location.origin}/event/${selectedEvent.id}`;
                  navigator.clipboard.writeText(link).then(() => {
                    alert('Ссылка на событие скопирована в буфер обмена!');
                  });
                }
              }
            }}
          >
            Поделиться событием
          </button>
        </div>
        
        {/* Комментарии к историческим событиям */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-2">Комментарии:</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {(comments[selectedEvent.id] || []).map((comment, index) => (
              <div key={index} className="text-sm bg-gray-100 p-2 rounded">
                {comment}
              </div>
            ))}
          </div>
          
          <div className="mt-3 flex">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Добавить комментарий..."
              className="flex-1 border border-gray-300 rounded-l px-3 py-1 text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white px-3 py-1 rounded-r text-sm hover:bg-blue-600"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    ) : (
      <p className="text-gray-700">Выберите событие на карте, чтобы увидеть информацию о нем.</p>
    )
  );
};

export default EventInfoPanel;