import Link from 'next/link';
import { City } from '@/types';
import { MapPinIcon } from '@heroicons/react/24/outline';

interface CityGridProps {
  cities: City[];
}

export default function CityGrid({ cities }: CityGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cities.map((city) => (
        <Link
          key={city.City}
          href={`/cities/${encodeURIComponent(city.City.toLowerCase())}`}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 flex items-center"
        >
          <MapPinIcon className="h-5 w-5 text-secondary mr-2" />
          <div>
            <div className="font-medium text-primary">{city.City}</div>
            <div className="text-sm text-gray-500">{city.State}</div>
          </div>
        </Link>
      ))}

      {cities.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-500">
          No cities found.
        </div>
      )}
    </div>
  );
} 