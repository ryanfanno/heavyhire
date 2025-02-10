import { searchPlaces } from '@/services/places';
import { SearchResult } from '@/types';
import SearchResultCard from './SearchResults/SearchResultCard';

interface EquipmentListProps {
  category: string;
}

export default async function EquipmentList({ category }: EquipmentListProps) {
  const results: SearchResult[] = await searchPlaces({
    city: 'Australia', // Default to nationwide search
    keyword: category
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary mb-6">
        {category} Providers
      </h2>

      {results.slice(0, 5).map((result, index) => (
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
          No providers found for this category.
        </p>
      )}
    </div>
  );
} 