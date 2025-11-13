'use client';

import React, { useState, memo } from 'react';

interface TimePeriod {
  year: number;
  label: string;
  description: string;
  latitude?: number;
  longitude?: number;
}

interface TimeSliderProps {
  onPeriodChange?: (year: number) => void;
  onPanToEvent?: (latitude: number, longitude: number) => void;
  selectedYear: number; // New prop for selected year
}

const TimeSlider = memo(({ onPeriodChange, onPanToEvent, selectedYear }: TimeSliderProps) => {
  // Определяем исторические периоды
  const timePeriods: TimePeriod[] = [
    { year: 862, label: "Начало Руси", description: "Объединение славянских племен", latitude: 50.4501, longitude: 30.5234 },
    { year: 988, label: "Крещение Руси", description: "Принятие христианства князем Владимиром", latitude: 50.4501, longitude: 30.5234 },
    { year: 1240, label: "Монгольское нашествие", description: "Захват Киева монголами", latitude: 50.4501, longitude: 30.5234 },
    { year: 1480, label: "Стояние на Угре", description: "Освобождение от ордынского ига", latitude: 55.0000, longitude: 38.0000 },
    { year: 1703, label: "Основание Петербурга", description: "Начало эпохи Петра I", latitude: 59.9343, longitude: 30.3351 },
    { year: 1812, label: "Отечественная война", description: "Война с Наполеоном", latitude: 55.7558, longitude: 37.6173 },
    { year: 1917, label: "Революция", description: "Падение монархии", latitude: 55.7558, longitude: 37.6173 },
    { year: 1941, label: "Великая Отечественная", description: "Война с нацистской Германией", latitude: 55.7558, longitude: 37.6173 },
    { year: 1991, label: "Новейшее время", description: "Распад СССР", latitude: 55.7558, longitude: 37.6173 },
  ];

  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>(timePeriods[0]);

  const handlePeriodChange = (period: TimePeriod) => {
    setSelectedPeriod(period);
    if (onPeriodChange) {
      onPeriodChange(period.year);
    }
    if (onPanToEvent && period.latitude && period.longitude) {
      onPanToEvent(period.latitude, period.longitude);
    }
    console.log(`Выбран период: ${period.label} (${period.year})`);
  };

  return (
    <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 p-4 rounded-lg shadow-lg z-10">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{selectedPeriod.label} ({selectedPeriod.year})</h2>
        <p className="text-gray-600 dark:text-gray-300">{selectedPeriod.description}</p>
      </div>
      
      <div className="flex overflow-x-auto space-x-2 py-2">
        {timePeriods.map((period, index) => (
          <button
            key={index}
            onClick={() => handlePeriodChange(period)}
            className={`px-4 py-2 rounded whitespace-nowrap ${
              selectedYear === period.year
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {period.year}
          </button>
        ))}
      </div>
    </div>
  );
});

export default TimeSlider;