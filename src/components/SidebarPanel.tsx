'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface SidebarPanelProps {
  title: string;
  children: React.ReactNode;
  initialCollapsed?: boolean;
  initialPosition?: { x: number; y: number };
  timeSliderHeight?: number; // Add timeSliderHeight to props
}

const SidebarPanel = ({ title, children, initialCollapsed = false, initialPosition = { x: 0, y: 0 }, timeSliderHeight = 0 }: SidebarPanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);
  const initialPositionRef = useRef(initialPosition);
  
  // Добавляем состояние для отслеживания прогресса пользователя
  const [progress, setProgress] = useState({
    eventsViewed: 0,
    routesCompleted: 0,
    timeSpent: 0 // в минутах
  });

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setPosition(initialPositionRef.current);
    }
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (panelRef.current) {
      const rect = panelRef.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top + 40, // Adjust this value to change the vertical offset
      };
      setIsDragging(true);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (panelRef.current) {
      const { offsetWidth, offsetHeight } = panelRef.current;
      const { innerWidth, innerHeight } = window;
      
      let newX = position.x;
      let newY = position.y;
      
      // Snapping logic (within a threshold, e.g., 20px from edge)
      const snapThreshold = 20;
      
      // Snap to left edge
      if (newX < snapThreshold) {
        newX = 0;
      }
      // Snap to right edge
      else if (newX > innerWidth - offsetWidth - snapThreshold) {
        newX = innerWidth - offsetWidth;
      }
      
      // Snapping to top edge (considering header height, assuming header is 64px)
      const headerHeight = 64;
      if (newY < headerHeight + snapThreshold) {
        newY = headerHeight;
      }
      // Snap to bottom edge (considering TimeSlider height)
      else if (newY > innerHeight - offsetHeight - timeSliderHeight - snapThreshold) {
        newY = innerHeight - offsetHeight - timeSliderHeight - 10; // 10px padding from time slider
      }

      
      setPosition({ x: newX, y: newY });
    }
  }, [isDragging, position]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Функция для обновления прогресса пользователя
  const updateProgress = (eventType: string) => {
    setProgress(prev => {
      switch(eventType) {
        case 'event_viewed':
          return {...prev, eventsViewed: prev.eventsViewed + 1};
        case 'route_completed':
          return {...prev, routesCompleted: prev.routesCompleted + 1};
        case 'time_spent':
          return {...prev, timeSpent: prev.timeSpent + 1}; // условное увеличение времени
        default:
          return prev;
      }
    });
  };

  return (
    <div
      ref={panelRef}
      className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg mb-4 cursor-grab sidebar-panel"
      style={{
        position: 'absolute',
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: 1000,
        width: '320px',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        willChange: 'transform', // Add this for performance hint
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-gray-800">{title}</h3>
        <button onClick={toggleCollapse} className="p-1">
          {isCollapsed ? (
            <ChevronDownIcon className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronUpIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>
      {!isCollapsed && (
        <div className="mt-2">
          {children}
          {/* Отображение прогресса пользователя */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-sm">Ваш прогресс:</h3>
            <div className="text-xs text-gray-600 mt-1">
              <p>Просмотрено событий: {progress.eventsViewed}</p>
              <p>Пройдено маршрутов: {progress.routesCompleted}</p>
              <p>Время в приложении: {progress.timeSpent} мин</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarPanel;