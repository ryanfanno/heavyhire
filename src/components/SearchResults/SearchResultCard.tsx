import { StarIcon } from '@heroicons/react/20/solid';
import { GlobeAltIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface SearchResultCardProps {
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  phone?: string;
  website?: string;
}

export default function SearchResultCard({
  name,
  address,
  rating,
  reviewCount,
  phone,
  website
}: SearchResultCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
      <h3 className="text-xl font-semibold text-primary mb-2">
        {name}
      </h3>
      <p className="text-primary-light mb-3">{address}</p>
      
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center">
          <StarIcon className="h-5 w-5 text-secondary" />
          <span className="ml-1 text-primary">{rating}</span>
        </div>
        <span className="text-primary-light">({reviewCount} reviews)</span>
      </div>

      <div className="flex flex-wrap gap-3">
        {phone && (
          <Link
            href={`tel:${phone}`}
            className="inline-flex items-center px-3 py-1.5 text-sm text-primary hover:text-secondary transition-colors"
          >
            <PhoneIcon className="h-4 w-4 mr-2" />
            {phone}
          </Link>
        )}
        
        {website && (
          <Link
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 text-sm text-primary hover:text-secondary transition-colors"
          >
            <GlobeAltIcon className="h-4 w-4 mr-2" />
            Visit Website
          </Link>
        )}
      </div>
    </div>
  );
} 