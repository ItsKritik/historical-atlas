'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import dynamic from 'next/dynamic';
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import Snowfall from './Snowfall';
import { timePeriods, educationalRoutes, cities } from '@/data/mapData';

// Dynamically import Leaflet-related components to ensure they are client-side rendered
const HistoricalEventsLayer = dynamic(() => import('@/components/HistoricalEventsLayer'), { ssr: false });
const HistoricalBordersLayer = dynamic(() => import('@/components/HistoricalBordersLayerNew'), { ssr: false });
const TimeSlider = dynamic(() => import('@/components/TimeSlider'), { ssr: false });
const EventInfoPanel = dynamic(() => import('@/components/EventInfoPanel'), { ssr: false });
const SidebarPanel = dynamic(() => import('@/components/SidebarPanel'), { ssr: false });
const LayerControl = dynamic(() => import('@/components/LayerControl'), { ssr: false });
const EducationalRoutes = dynamic(() => import('@/components/EducationalRoutes'), { ssr: false });
const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const HistoricalCitiesLayer = dynamic(() => import('@/components/HistoricalCitiesLayer'), { ssr: false });
const SearchResults = dynamic(() => import('@/components/SearchResults'), { ssr: false });


// Исправляем проблему с иконками маркеров в Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const HistoricalMap = () => {
  const center: [number, number] = [60, 100];
  const [selectedYear, setSelectedYear] = useState<number>(862);
  const [eventToPan, setEventToPan] = useState<{ latitude: number; longitude: number } | undefined>(undefined);
  const [layers, setLayers] = useState({
    events: true,
    routes: true,
    cities: true,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handlePanToEvent = useCallback((latitude: number, longitude: number) => {
    setEventToPan({ latitude, longitude });
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];

    const lowerCaseQuery = searchQuery.toLowerCase();

    const eventResults = timePeriods
      .filter(event => event.label.toLowerCase().includes(lowerCaseQuery) || event.description.toLowerCase().includes(lowerCaseQuery))
      .map(event => ({
        id: `event-${event.year}`,
        type: 'event' as const,
        title: event.label,
        onClick: () => handlePanToEvent(event.latitude!, event.longitude!),
      }));

    const cityResults = cities
      .filter(city => city.name.toLowerCase().includes(lowerCaseQuery) || city.description.toLowerCase().includes(lowerCaseQuery))
      .map(city => ({
        id: `city-${city.id}`,
        type: 'city' as const,
        title: city.name,
        onClick: () => handlePanToEvent(city.latitude, city.longitude),
      }));

    const routeResults = educationalRoutes
      .filter(route => route.title.toLowerCase().includes(lowerCaseQuery) || route.description.toLowerCase().includes(lowerCaseQuery))
      .map(route => ({
        id: `route-${route.id}`,
        type: 'route' as const,
        title: route.title,
        onClick: () => handlePanToEvent(route.events[0].latitude, route.events[0].longitude),
      }));

    return [...eventResults, ...cityResults, ...routeResults];
  }, [searchQuery, handlePanToEvent]);

  const timeSliderRef = useRef<HTMLDivElement>(null);
  const [timeSliderHeight, setTimeSliderHeight] = useState(0);

  useEffect(() => {
    if (timeSliderRef.current) {
      setTimeSliderHeight(timeSliderRef.current.offsetHeight);
    }
  }, []);

  const handlePeriodChange = (year: number) => {
    setSelectedYear(year);
  };


  return (
    <div className={`h-screen w-full relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      <Snowfall />
      <Header onSearch={setSearchQuery} />
      <MapContainer
        center={center}
        zoom={3}
        minZoom={3}
        maxBounds={[[40, 10], [80, 180]]}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center}>
          <Popup>
            Интерактивный исторический атлас России
          </Popup>
        </Marker>
        {layers.events && <HistoricalEventsLayer
          panToEvent={eventToPan}
          onPanToEvent={handlePanToEvent}
          timePeriods={timePeriods}
          onSelectYear={setSelectedYear}
        />}
        {/* <HistoricalBordersLayer selectedYear={selectedYear} /> */}
        {layers.cities && <HistoricalCitiesLayer cities={cities} />}
      </MapContainer>
      <div ref={timeSliderRef}>
        <TimeSlider onPeriodChange={handlePeriodChange} onPanToEvent={handlePanToEvent} selectedYear={selectedYear} />
      </div>
      <div className="absolute top-20 left-4 w-80 z-10">
        <SidebarPanel title="Информация о событии" initialCollapsed={true} initialPosition={{ x: 16, y: 80 }} timeSliderHeight={timeSliderHeight}>
          <EventInfoPanel onPanToEvent={handlePanToEvent} />
        </SidebarPanel>
        {layers.routes && <SidebarPanel title="Образовательные маршруты" initialCollapsed={true} initialPosition={{ x: 16, y: 140 }} timeSliderHeight={timeSliderHeight}>
          <EducationalRoutes routes={educationalRoutes} onPanToEvent={handlePanToEvent} />
        </SidebarPanel>}
      </div>
      <LayerControl layers={layers} setLayers={setLayers} />
      <SearchResults results={searchResults} />
    </div>
  );
};

export default HistoricalMap;