'use client';

import React from 'react';
import { Polygon, LayerGroup, Popup } from 'react-leaflet';

// Тип для исторического периода
interface HistoricalPeriod {
  id: string;
  name: string;
  year: number;
  endYear?: number;
  borders: [number, number][][];
  color: string;
  description: string;
}

interface HistoricalBordersLayerProps {
  selectedYear?: number;
}

// Упрощенные, но реалистичные полигоны границ
const historicalPeriods: HistoricalPeriod[] = [
  {
    id: 'kievan_rus',
    name: 'Киевская Русь (862-1240)',
    year: 862,
    endYear: 1240,
    borders: [[
      [59.93, 30.31], [58.0, 38.0], [54.0, 42.0], [50.0, 40.0], [48.0, 36.0], [49.0, 32.0], [50.0, 28.0], [53.0, 29.0], [59.93, 30.31]
    ]],
    color: '#FFD700', // Gold
    description: 'Восточнославянское государство IX-XIII веков'
  },
  {
    id: 'mongol_invasion',
    name: 'Золотая Орда (1240-1480)',
    year: 1240,
    endYear: 1480,
    borders: [[
      [60.0, 45.0], [55.0, 65.0], [45.0, 75.0], [38.0, 60.0], [40.0, 40.0], [50.0, 30.0], [60.0, 45.0]
    ]],
    color: '#8B0000', // Dark Red
    description: 'Монгольское государство в Восточной Европе'
  },
  {
    id: 'moscow_tsardom',
    name: 'Московское царство (1480-1700)',
    year: 1480,
    endYear: 1700,
    borders: [[
      [62.0, 35.0], [60.0, 45.0], [55.0, 50.0], [50.0, 45.0], [52.0, 38.0], [62.0, 35.0]
    ]],
    color: '#4682B4', // Steel Blue
    description: 'Русское государство с центром в Москве'
  },
  {
    id: 'russian_empire',
    name: 'Российская империя (1700-1917)',
    year: 1700,
    endYear: 1917,
    borders: [[
      [70.0, 20.0], [75.0, 60.0], [70.0, 100.0], [60.0, 120.0], [50.0, 130.0], [40.0, 120.0], [35.0, 100.0], [40.0, 80.0], [45.0, 60.0], [50.0, 40.0], [55.0, 25.0], [70.0, 20.0]
    ]],
    color: '#006400', // Dark Green
    description: 'Империя, охватывавшая значительную часть Евразии'
  },
  {
    id: 'soviet_union',
    name: 'СССР (1922-1991)',
    year: 1922,
    endYear: 1991,
    borders: [[
      [70.0, 20.0], [75.0, 60.0], [70.0, 100.0], [60.0, 120.0], [50.0, 130.0], [40.0, 120.0], [35.0, 100.0], [40.0, 80.0], [45.0, 60.0], [50.0, 40.0], [55.0, 25.0], [70.0, 20.0]
    ]],
    color: '#DC143C', // Crimson
    description: 'Союз Советских Социалистических Республик'
  },
  {
    id: 'russian_federation',
    name: 'Российская Федерация (1991-наст. время)',
    year: 1991,
    borders: [[
      [70.0, 20.0], [75.0, 60.0], [70.0, 100.0], [60.0, 120.0], [50.0, 130.0], [40.0, 120.0], [35.0, 100.0], [40.0, 80.0], [45.0, 60.0], [50.0, 40.0], [55.0, 25.0], [70.0, 20.0]
    ]],
    color: '#1E90FF', // Dodger Blue
    description: 'Современная Российская Федерация'
  }
];

const HistoricalBordersLayer = ({ selectedYear }: HistoricalBordersLayerProps) => {
  // Определяем активный период на основе выбранного года
  const activePeriod = historicalPeriods.find(period =>
    selectedYear !== undefined && selectedYear >= period.year && (period.endYear ? selectedYear < period.endYear : true)
  );

  if (!activePeriod) {
    return null; // Don't render if no active period found
  }

  return (
    <LayerGroup>
      <Polygon
        positions={activePeriod.borders}
        pathOptions={{
          color: activePeriod.color,
          fillOpacity: 0.3,
          weight: 2
        }}
      >
        <Popup>
          <div>
            <h3 className="font-bold">{activePeriod.name}</h3>
            <p className="text-sm">{activePeriod.year} - {activePeriod.endYear || 'наст. время'}</p>
            <p className="text-xs mt-1">{activePeriod.description}</p>
          </div>
        </Popup>
      </Polygon>
    </LayerGroup>
  );
};

export default HistoricalBordersLayer;