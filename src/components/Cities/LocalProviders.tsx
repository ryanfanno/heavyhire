import { searchPlaces } from '@/services/places';
import { SearchResult } from '@/types';
import SearchResultCard from '../SearchResults/SearchResultCard';

interface LocalProvidersProps {
  city: string;
}

export default async function LocalProviders({ city }: LocalProvidersProps) {
  const results: SearchResult[] = await searchPlaces({
    city,
    keyword: 'equipment hire'
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary mb-6">
        Local Equipment Providers
      </h2>

      {results.slice(0, 3).map((result, index) => (
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

      {results.length === 0 && (
        <p className="text-gray-600">
          No local providers found in this area.
        </p>
      )}
    </div>
  );
} 