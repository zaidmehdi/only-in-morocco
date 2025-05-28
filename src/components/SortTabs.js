'use client';

import { useState } from 'react';

const tabs = ['New', 'Top', 'Trending'];

export default function SortTabs() {
  const [active, setActive] = useState('New');

  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-3 py-1 rounded border ${
            active === tab ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
