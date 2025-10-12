'use client';

import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
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
  const map = useMap();

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

  useEffect(() => {
    if (panToEvent) {
      map.flyTo([panToEvent.latitude, panToEvent.longitude], 10, {
        duration: 1.5,
      });
    }
  }, [panToEvent, map]);

  return (
    <>
      {timePeriods && timePeriods.map(period => (
        period.latitude && period.longitude && (
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
        )
      ))}
    </>
  );
};

export default HistoricalEventsLayer;