'use client';

import { useState } from 'react';
import SearchResultsList from './SearchResultsList';
import SearchFilter from './SearchFilter';
import { SearchResult } from '@/types';

interface SearchResultsProps {
  results: SearchResult[];
  cityName: string;
}

export default function SearchResults({ results, cityName }: SearchResultsProps) {
  const [filteredResults, setFilteredResults] = useState(results);
  const [debug, setDebug] = useState<string>('');

  const handleFilterChange = async ({ postcode }: { postcode?: string; distance?: number }) => {
    if (!postcode) {
      setFilteredResults(results);
      return;
    }

    console.log('Filtering results by postcode:', postcode);
    console.log('Total results before filtering:', results.length);

    const filtered = results.filter(result => {
      // Extract postcode from address (assuming Australian format)
      const addressPostcode = result.address.match(/\b\d{4}\b/)?.[0];
      
      if (!addressPostcode) {
        console.log(`Skipping ${result.name} - No postcode found in address: ${result.address}`);
        return false;
      }

      console.log(`${result.name}:`, {
        address: result.address,
        addressPostcode,
        matches: addressPostcode === postcode
      });

      return addressPostcode === postcode;
    });

    console.log('Results after filtering:', filtered.length);
    
    if (filtered.length === 0) {
      setDebug(`No results found in postcode ${postcode}`);
    } else {
      setDebug(`Found ${filtered.length} results in postcode ${postcode}`);
    }
    
    setFilteredResults(filtered);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-2">
        Equipment Hire in {cityName}
      </h1>
      <p className="text-primary-light mb-8">
        Found {filteredResults.length} results for your search
        {debug && (
          <span className="block text-sm text-gray-500 mt-2">
            {debug}
          </span>
        )}
      </p>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <SearchFilter onFilterChange={handleFilterChange} />
        </div>
        <div className="md:col-span-3">
          <SearchResultsList results={filteredResults} />
        </div>
      </div>
    </div>
  );
} 