import { SearchResult } from '@/types';
import { formatSearchTerm } from '@/utils/data';
import { connectToDatabase } from '@/utils/db';
import PlaceCache from '@/models/PlaceCache';
import { fetchFromGooglePlaces } from '@/utils/places';

interface CachedResult {
  name: string;
  address: string;
  rating?: number;
  userRatingsTotal?: number;
  types?: string[];
  businessStatus?: string;
  phone?: string;
  website?: string;
}

interface SearchPlacesParams {
  city: string;
  keyword: string;
}

export async function searchPlaces({ city, keyword }: SearchPlacesParams): Promise<SearchResult[]> {
  const searchQuery = formatSearchTerm(keyword, city);
  
  try {
    await connectToDatabase();
    const cachedResults = await PlaceCache.findOne({ searchQuery });

    if (cachedResults) {
      console.log('Serving results from cache');
      return cachedResults.results.map((result: CachedResult) => ({
        name: result.name,
        address: result.address,
        rating: result.rating,
        userRatingsTotal: result.userRatingsTotal,
        types: result.types,
        businessStatus: result.businessStatus,
        phone: result.phone,
        website: result.website
      }));
    }

    console.log('Fetching fresh results from Google Places API');
    const results = await fetchFromGooglePlaces(searchQuery, city);

    const formattedResults = results.map(place => ({
      name: place.name,
      address: place.address,
      rating: place.rating,
      userRatingsTotal: place.userRatingsTotal,
      types: place.types,
      businessStatus: place.businessStatus,
      phone: place.phone,
      website: place.website
    }));

    if (formattedResults.length > 0) {
      await PlaceCache.create({
        searchQuery,
        results: formattedResults,
        createdAt: new Date()
      });
    }

    return formattedResults;
  } catch (error) {
    console.error('Error in searchPlaces:', error);
    return [];
  }
} 