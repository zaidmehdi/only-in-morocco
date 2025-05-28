'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <input
      type="text"
      placeholder="Search stories..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="flex-1 px-3 py-2 border rounded"
    />
  );
}
