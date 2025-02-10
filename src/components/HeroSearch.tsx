'use client';

import { useState } from 'react';
import { City, Keyword } from '@/types';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface HeroSearchProps {
  cities: City[];
  keywords: Keyword[];
  initialCity?: string;
  initialKeyword?: string;
  compact?: boolean;
}

export default function HeroSearch({ 
  cities, 
  keywords, 
  initialCity = '', 
  initialKeyword = '',
  compact = false 
}: HeroSearchProps) {
  const router = useRouter();
  const [city, setCity] = useState(initialCity);
  const [keyword, setKeyword] = useState(initialKeyword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city && keyword) {
      router.push(`/search/${encodeURIComponent(city.toLowerCase())}/${encodeURIComponent(keyword.toLowerCase())}`);
    }
  };

  return (
    <div className={`bg-gradient-to-r from-blue-600 to-blue-800 ${compact ? 'py-8' : 'py-24'}`}>
      <div className="container mx-auto px-4">
        {!compact && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Find Equipment Hire Near You
            </h1>
            <p className="text-xl text-blue-100">
              Compare prices and availability from local providers
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-transparent focus:border-secondary focus:outline-none"
                required
              >
                <option value="" className="text-gray-500">Select a city...</option>
                {cities.map((city) => (
                  <option key={city.City} value={city.City} className="text-primary">
                    {city.City}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <select
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-transparent focus:border-secondary focus:outline-none"
                required
              >
                <option value="" className="text-gray-500">What are you looking for?</option>
                {keywords.map((kw) => (
                  <option key={kw.id} value={kw.term} className="text-primary">
                    {kw.term}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="md:w-auto w-full bg-secondary hover:bg-secondary-dark text-primary font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center"
            >
              <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 