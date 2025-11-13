'use client';

import dynamic from 'next/dynamic';

// Динамический импорт компонентов только на клиенте
const HistoricalMap = dynamic(() => import('@/components/HistoricalMap'), {
  ssr: false,
  loading: () => <div className="h-screen w-screen flex items-center justify-center">Загрузка карты...</div>
});

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <HistoricalMap />
    </div>
  );
}