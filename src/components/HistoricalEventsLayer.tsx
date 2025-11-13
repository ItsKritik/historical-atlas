'use client';

import React, { useState, useEffect } from 'react';
import { Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

interface TimePeriod {
  year: number;
  label: string;
  description: string;
  latitude?: number;
  longitude?: number;
}

interface HistoricalEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  latitude: number;
  longitude: number;
  type: 'battle' | 'discovery' | 'foundation' | 'political' | 'cultural';
}

interface HistoricalEventsLayerProps {
  panToEvent?: { latitude: number; longitude: number };
  onPanToEvent?: (latitude: number, longitude: number) => void;
  timePeriods?: TimePeriod[];
  onSelectYear?: (year: number) => void; // New prop for selecting year
}

const HistoricalEventsLayer = ({ panToEvent, onPanToEvent, timePeriods, onSelectYear }: HistoricalEventsLayerProps) => {
  const createPeriodIcon = (label: string) => {
    return L.divIcon({
      className: 'custom-period-icon',
      html: `
        <div style="
          background-color: #4299E1;
          color: white;
          font-weight: bold;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #2B6CB0;
          box-shadow: 0 0 5px rgba(0,0,0,0.5);
        ">
          ${label}
        </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };
  const markers = timePeriods?.reduce((acc, period, index) => {
    if (period.latitude && period.longitude) {
      // Check if there are other periods with the same coordinates
      const sameCoords = timePeriods.filter(p => p.latitude === period.latitude && p.longitude === period.longitude);
      if (sameCoords.length > 1) {
        // Calculate offset for each period with the same coordinates
        const offset = 0.1; // Adjust this value to change the distance between markers
        const angle = (2 * Math.PI * index) / sameCoords.length;
        const offsetX = offset * Math.cos(angle);
        const offsetY = offset * Math.sin(angle);
        const newPosition = [period.latitude + offsetY, period.longitude + offsetX];
        acc.push(
          <Marker
            key={`period-${period.year}`}
            position={newPosition as [number, number]}
            icon={createPeriodIcon(String(period.year))}
            eventHandlers={{
              click: () => {
                if (onPanToEvent && period.latitude && period.longitude) {
                  onPanToEvent(period.latitude, period.longitude);
                }
                if (onSelectYear) {
                  onSelectYear(period.year);
                }
              },
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{period.label}</h3>
                <p className="text-sm text-gray-600">{period.year}</p>
                <p className="text-sm mt-1">{period.description}</p>
              </div>
            </Popup>
          </Marker>
        );
      } else {
        acc.push(
          <Marker
            key={`period-${period.year}`}
            position={[period.latitude, period.longitude]}
            icon={createPeriodIcon(String(period.year))}
            eventHandlers={{
              click: () => {
                if (onPanToEvent && period.latitude && period.longitude) {
                  onPanToEvent(period.latitude, period.longitude);
                }
                if (onSelectYear) {
                  onSelectYear(period.year);
                }
              },
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">{period.label}</h3>
                <p className="text-sm text-gray-600">{period.year}</p>
                <p className="text-sm mt-1">{period.description}</p>
              </div>
            </Popup>
          </Marker>
        );
      }
    }
    return acc;
  }, [] as React.ReactElement[]) || [];
  const map = useMap();

  useEffect(() => {
    if (panToEvent) {
      map.flyTo([panToEvent.latitude, panToEvent.longitude], 10, {
        duration: 1.5,
      });
    }
  }, [panToEvent, map]);

  // Анимация военных кампаний и походов
  const animateCampaigns = () => {
    // Визуализация военных кампаний и походов
    // Временные точки для анимации
    const campaignPaths = [
      {
        id: 'napoleonic_campaign',
        year: 1812,
        name: 'Отечественная война 1812 года',
        path: [
          [55.75, 37.62], // Москва
          [53.90, 27.56], // Минск
          [52.42, 31.03], // Гомель
          [51.51, 31.29], // Речица
          [50.45, 30.52], // Киев
          [55.75, 37.62], // Москва
        ],
        color: '#E53E', // Красный для военных действий
      },
      {
        id: 'mongol_invasion',
        year: 1240,
        name: 'Монгольское нашествие',
        path: [
          [50.45, 30.52], // Киев
          [48.47, 35.04], // Харьков
          [47.84, 35.14], // Лозовая
          [47.4, 33.42], // Славянск
          [44.95, 34.11], // Симферополь
        ],
        color: '#8B000', // Темно-красный для нашествия
      },
      {
        id: 'peter_campaign',
        year: 1709,
        name: 'Походы Петра I',
        path: [
          [59.93, 30.31], // Санкт-Петербург
          [54.84, 37.62], // Рязань
          [55.75, 37.62], // Москва
          [51.67, 39.21], // Воронеж
          [47.23, 39.71], // Ростов-на-Дону
          [45.04, 38.98], // Краснодар
        ],
        color: '#D69E2E', // Желтый для походов
      },
    ];

    return campaignPaths.map((campaign, index) => {
      if (timePeriods && timePeriods.some(p => p.year >= campaign.year - 10 && p.year <= campaign.year + 10)) {
        return (
          <Polyline
            key={`campaign-${index}`}
            positions={campaign.path as L.LatLngExpression[]}
            color={campaign.color}
            weight={3}
            opacity={0.7}
            dashArray="10, 10"
          />
        );
      }
      return null;
    });
  };

  // Анимация торговых и культурных связей
  const animateTradeRoutes = () => {
    // Визуализация торговых путей и культурных связей
    const tradeRoutes = [
      {
        id: 'route_from_varangians',
        year: 862,
        name: 'Путь из варяг в греки',
        path: [
          [59.93, 30.31], // Санкт-Петербург (Новгород)
          [58.59, 31.31], // Старая Русса
          [56.14, 38.19], // Ростов
          [55.88, 43.11], // Нижний Новгород
          [55.75, 37.62], // Москва
          [50.45, 30.52], // Киев
          [46.47, 30.71], // Одесса
        ],
        color: '#38A169', // Зеленый для торговых путей
      },
      {
        id: 'silk_route',
        year: 1300,
        name: 'Шелковый путь (русская часть)',
        path: [
          [55.45, 78.33], // Новосибирск
          [54.98, 82.92], // Новониколаевск
          [51.23, 85.18], // Горно-Алтайск
          [43.59, 42.93], // Владикавказ
          [41.69, 44.83], // Тбилиси
        ],
        color: '#D69E2E', // Желтый для торговых путей
      },
      {
        id: 'white_sea_route',
        year: 1100,
        name: 'Беломорский путь',
        path: [
          [64.56, 39.83], // Архангельск
          [62.01, 32.56], // Плесецк
          [59.93, 30.31], // Санкт-Петербург (Новгород)
        ],
        color: '#4299E1', // Синий для морских путей
      },
    ];

    return tradeRoutes.map((route, index) => {
      if (timePeriods && timePeriods.some(p => p.year >= route.year - 20 && p.year <= route.year + 200)) {
        return (
          <Polyline
            key={`route-${index}`}
            positions={route.path as L.LatLngExpression[]}
            color={route.color}
            weight={2}
            opacity={0.6}
            dashArray="5, 5"
          />
        );
      }
      return null;
    });
  };

  return (
    <>
      {markers}
      {animateCampaigns()}
      {animateTradeRoutes()}
    </>
  );
};

export default HistoricalEventsLayer;