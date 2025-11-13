'use client';

import React, { memo } from 'react';

interface HeaderProps {
  toggleTheme: () => void;
  currentTheme: string;
}

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 bg-white dark:bg-gray-800 bg-opacity-90 p-4 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Интерактивный исторический атлас России
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {/* <li>
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">Карта</a>
            </li>
            <li>
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">События</a>
            </li>
            <li>
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">Персоналии</a>
            </li>
            <li>
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">Маршруты</a>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default memo(Header);