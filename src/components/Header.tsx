'use client';

import React, { memo } from 'react';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 bg-white dark:bg-gray-800 bg-opacity-90 p-4 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Интерактивный исторический атлас России
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-10">Карта</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">События</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Персоналии</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Маршруты</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default memo(Header);