'use client';

import React from 'react';
import './Snowfall.css';

const Snowfall = () => {
  const snowflakes = Array.from({ length: 150 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      animationDuration: `${Math.random() * 5 + 5}s`,
      animationDelay: `${Math.random() * 5}s`,
    };
    return <div key={i} className="snowflake" style={style}></div>;
  });

  return <div className="snowfall">{snowflakes}</div>;
};

export default Snowfall;