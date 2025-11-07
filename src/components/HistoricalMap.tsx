'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import dynamic from 'next/dynamic';
import { useState, useCallback, useRef, useEffect } from 'react';

// Dynamically import Leaflet-related components to ensure they are client-side rendered
const HistoricalEventsLayer = dynamic(() => import('@/components/HistoricalEventsLayer'), { ssr: false });
const HistoricalBordersLayer = dynamic(() => import('@/components/HistoricalBordersLayerNew'), { ssr: false });
const TimeSlider = dynamic(() => import('@/components/TimeSlider'), { ssr: false });
const EventInfoPanel = dynamic(() => import('@/components/EventInfoPanel'), { ssr: false });
const SidebarPanel = dynamic(() => import('@/components/SidebarPanel'), { ssr: false });
const LayerControl = dynamic(() => import('@/components/LayerControl'), { ssr: false });
const EducationalRoutes = dynamic(() => import('@/components/EducationalRoutes'), { ssr: false });
const Header = dynamic(() => import('@/components/Header'), { ssr: false });


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

  const handlePanToEvent = useCallback((latitude: number, longitude: number) => {
    setEventToPan({ latitude, longitude });
  }, []);

  return (
    <div className="h-screen w-full relative">
      <Header />
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
        <HistoricalEventsLayer
          panToEvent={eventToPan}
          onPanToEvent={handlePanToEvent}
          timePeriods={[
            { year: 862, label: "Начало Руси", description: "Объединение славянских племен", latitude: 50.4501, longitude: 30.5234 },
            { year: 988, label: "Крещение Руси", description: "Принятие христианства князем Владимиром", latitude: 50.4501, longitude: 30.5234 },
            { year: 1240, label: "Монгольское нашествие", description: "Захват Киева монголами", latitude: 50.4501, longitude: 30.5234 },
            { year: 1480, label: "Стояние на Угре", description: "Освобождение от ордынского ига", latitude: 55.0000, longitude: 38.0000 },
            { year: 1703, label: "Основание Петербурга", description: "Начало эпохи Петра I", latitude: 59.9343, longitude: 30.3351 },
            { year: 1812, label: "Отечественная война", description: "Война с Наполеоном", latitude: 55.7558, longitude: 37.6173 },
            { year: 1917, label: "Революция", description: "Падение монархии", latitude: 55.7558, longitude: 37.6173 },
            { year: 1941, label: "Великая Отечественная", description: "Война с нацистской Германией", latitude: 55.7558, longitude: 37.6173 },
            { year: 1991, label: "Новейшее время", description: "Распад СССР", latitude: 55.7558, longitude: 37.6173 },
          ]}
          onSelectYear={setSelectedYear}
        />
        <HistoricalBordersLayer selectedYear={selectedYear} />
      </MapContainer>
      <div ref={timeSliderRef}>
        <TimeSlider onPeriodChange={handlePeriodChange} onPanToEvent={handlePanToEvent} selectedYear={selectedYear} />
      </div>
      <div className="absolute top-20 left-4 w-80 z-10 space-y-4">
        <SidebarPanel title="Информация о событии" initialCollapsed={true} initialPosition={{ x: 16, y: 80 }} timeSliderHeight={timeSliderHeight}>
          <EventInfoPanel onPanToEvent={handlePanToEvent} />
        </SidebarPanel>
        <SidebarPanel title="Образовательные маршруты" initialPosition={{ x: 16, y: 450 }} timeSliderHeight={timeSliderHeight}>
          <EducationalRoutes onPanToEvent={handlePanToEvent} />
        </SidebarPanel>
      </div>
      <LayerControl />
    </div>
  );
};

export default HistoricalMap;