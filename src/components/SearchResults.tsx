'use client';

import React from 'react';

interface SearchResult {
  id: string;
  type: 'event' | 'city' | 'route';
  title: string;
  onClick: () => void;
}

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-16 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-20 w-80">
      <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Результаты поиска</h3>
      <ul className="space-y-2">
        {results.map(result => (
          <li
            key={result.id}
            onClick={result.onClick}
            className="cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <span className="font-semibold">{result.type === 'event' ? 'Событие' : result.type === 'city' ? 'Город' : 'Маршрут'}:</span> {result.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;