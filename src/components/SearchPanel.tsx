'use client';

import React, { useState } from 'react';

interface SearchResult {
  id: number;
  title: string;
  type: 'event' | 'person' | 'location';
  date?: string;
  description: string;
}

const SearchPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Пример данных для поиска
  const allData: SearchResult[] = [
    {
      id: 1,
      title: "Крещение Руси",
      type: 'event',
      date: '988 год',
      description: 'Принятие христианства князем Владимиром Святославичем'
    },
    {
      id: 2,
      title: "Владимир Святославич",
      type: 'person',
      date: '950-1015 гг.',
      description: 'Великий князь Киевский, креститель Руси'
    },
    {
      id: 3,
      title: "Киев",
      type: 'location',
      description: 'Столица Киевской Руси'
    },
    {
      id: 4,
      title: "Куликовская битва",
      type: 'event',
      date: '8 сентября 1380 год',
      description: 'Сражение между войском Дмитрия Донского и ханом Мамаем'
    },
    {
      id: 5,
      title: "Дмитрий Донской",
      type: 'person',
      date: '1350-1389 гг.',
      description: 'Великий князь Московский, победитель в Куликовской битве'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = allData.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
  };

  return (
    <div className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Введите событие, личность или место..."
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition-colors"
          >
            Найти
          </button>
        </div>
      </form>

      {searchResults.length > 0 && (
        <div className="max-h-60 overflow-y-auto">
          <h4 className="font-semibold mb-2">Результаты поиска:</h4>
          <ul className="space-y-2">
            {searchResults.map(result => (
              <li
                key={result.id}
                className="p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
                onClick={() => console.log(`Выбран результат: ${result.title}`)}
              >
                <div className="font-medium">{result.title}</div>
                {result.date && <div className="text-sm text-gray-600">{result.date}</div>}
                <div className="text-sm text-gray-500">{result.description}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchQuery && searchResults.length === 0 && (
        <div className="text-gray-500">Ничего не найдено</div>
      )}
    </div>
  );
};

export default SearchPanel;