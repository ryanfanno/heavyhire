import SearchResultsList from './SearchResultsList';
import { SearchResult } from '@/types';

interface SearchResultsProps {
  results: SearchResult[];
  cityName: string;
}

export default function SearchResults({ results, cityName }: SearchResultsProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-2">
        Equipment Hire in {cityName}
      </h1>
      <p className="text-primary-light mb-8">
        Found {results.length} results for your search
      </p>

      <SearchResultsList results={results} />
    </div>
  );
} 