'use client';

import React, { memo } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="absolute top-0 left-0 right-0 bg-white dark:bg-gray-800 bg-opacity-90 p-4 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Интерактивный исторический атлас России
        </h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Поиск..."
            onChange={(e) => onSearch(e.target.value)}
            className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>
      </div>
    </header>
  );
};

export default memo(Header);