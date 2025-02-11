'use client';

import { useState } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface SearchFilterProps {
  onFilterChange: (filters: { postcode?: string }) => void;
}

export default function SearchFilter({ onFilterChange }: SearchFilterProps) {
  const [postcode, setPostcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onFilterChange({ postcode: postcode || undefined });
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold text-primary mb-4">Filter by Postcode</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
            Postcode
          </label>
          <div className="relative">
            <input
              type="text"
              id="postcode"
              pattern="[0-9]*"
              maxLength={4}
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.replace(/\D/g, ''))}
              className="pl-10 w-full rounded-md border border-gray-300 focus:border-secondary focus:ring-1 focus:ring-secondary text-gray-900"
              placeholder="Enter postcode"
            />
            <MapPinIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !postcode}
          className="w-full bg-secondary text-black font-semibold py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Filtering...' : postcode ? 'Apply Filter' : 'Enter Postcode'}
        </button>
      </form>
    </div>
  );
} 