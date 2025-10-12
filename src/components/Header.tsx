'use client';

import React, { memo } from 'react';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 bg-white bg-opacity-90 p-4 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Интерактивный исторический атлас России
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">Карта</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">События</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">Персоналии</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">Маршруты</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default memo(Header);