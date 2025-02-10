'use client';

import React, { useState } from 'react';
import SearchResultCard from './SearchResultCard';
import { SearchResult } from '@/types';

interface SearchResultsListProps {
  results: SearchResult[];
}

const INITIAL_LOAD = 10;
const LOAD_MORE_COUNT = 10;

export default function SearchResultsList({ results }: SearchResultsListProps) {
  const [displayCount, setDisplayCount] = useState(INITIAL_LOAD);
  
  const visibleResults = results.slice(0, displayCount);
  const hasMore = displayCount < results.length;

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + LOAD_MORE_COUNT, results.length));
  };

  return (
    <div className="space-y-6">
      {visibleResults.map((result, index) => (
        <SearchResultCard
          key={`${result.name}-${index}`}
          name={result.name}
          address={result.address}
          rating={result.rating || 0}
          reviewCount={result.userRatingsTotal || 0}
          phone={result.phone}
          website={result.website}
        />
      ))}

      {visibleResults.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No results found. Please try a different search.
          </p>
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-secondary text-primary font-semibold rounded-lg hover:bg-secondary-dark transition-colors"
          >
            Load More Results
            <span className="ml-2 text-sm">
              ({results.length - displayCount} remaining)
            </span>
          </button>
        </div>
      )}
    </div>
  );
} 