'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { City, Keyword } from '@/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchFormProps {
  cities: City[];
  keywords: Keyword[];
  initialCity?: string;
  initialKeyword?: string;
}

export default function SearchForm({ 
  cities, 
  keywords, 
  initialCity = '', 
  initialKeyword = '' 
}: SearchFormProps) {
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
    <div className="mx-auto w-full max-w-4xl px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-4">
          <div className="relative">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-12 px-4 bg-white border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block"
              required
            >
              <option value="" disabled>Select a city...</option>
              {cities.map((city) => (
                <option 
                  key={city.City} 
                  value={city.City}
                  className="text-gray-900"
                >
                  {city.City}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full h-12 px-4 bg-white border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block"
              required
            >
              <option value="" disabled>What are you looking for?</option>
              {keywords.map((kw) => (
                <option 
                  key={kw.term} 
                  value={kw.term}
                  className="text-gray-900"
                >
                  {kw.term}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
} 