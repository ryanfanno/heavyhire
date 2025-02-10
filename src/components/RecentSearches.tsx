'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ClockIcon } from '@heroicons/react/24/outline';

interface RecentSearch {
  city: string;
  keyword: string;
  timestamp: number;
}

export default function RecentSearches() {
  const [searches, setSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    const recentSearches = localStorage.getItem('recentSearches');
    if (recentSearches) {
      setSearches(JSON.parse(recentSearches));
    }
  }, []);

  if (searches.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
      <h3 className="text-lg font-semibold text-primary mb-3 flex items-center">
        <ClockIcon className="h-5 w-5 mr-2" />
        Recent Searches
      </h3>
      <div className="space-y-2">
        {searches.slice(0, 5).map((search, index) => (
          <Link
            key={index}
            href={`/search/${encodeURIComponent(search.city)}/${encodeURIComponent(search.keyword)}`}
            className="block text-primary-light hover:text-secondary transition-colors"
          >
            {search.keyword} in {search.city}
          </Link>
        ))}
      </div>
    </div>
  );
} 