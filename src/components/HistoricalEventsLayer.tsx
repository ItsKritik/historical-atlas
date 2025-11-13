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

import { campaignPaths, tradeRoutes } from '@/data/mapData';

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