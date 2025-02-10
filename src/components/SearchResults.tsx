import { SearchResult } from '@/types';
import { StarIcon } from '@heroicons/react/20/solid';

interface SearchResultsProps {
  results: SearchResult[];
  cityName: string;
}

export default function SearchResults({ results, cityName }: SearchResultsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Equipment Hire in {cityName}
      </h2>
      {results.map((result, index) => (
        <div
          key={`${result.name}-${index}`}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {result.name}
          </h2>
          <p className="text-gray-600 mb-3">{result.address}</p>
          
          {result.rating !== undefined && (
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(result.rating || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                ({result.userRatingsTotal || 0} reviews)
              </span>
            </div>
          )}

          {result.businessStatus === 'OPERATIONAL' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Open
            </span>
          )}
        </div>
      ))}

      {results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No results found. Please try a different search.
          </p>
        </div>
      )}
    </div>
  );
} 