import { SearchResult } from '@/types';
import { GooglePlaceResult } from '@/types/google';
import { formatSearchTerm } from '@/utils/data';
import { connectToDatabase } from '@/utils/db';
import PlaceCache from '@/models/PlaceCache';
import { CITY_COORDINATES } from '@/utils/cityCoordinates';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const PLACES_API_URL = 'https://places.googleapis.com/v1/places:searchText';
const MAX_RADIUS = 50000; // Maximum allowed radius in meters

async function fetchFromGooglePlaces(searchQuery: string, city: string): Promise<SearchResult[]> {
  try {
    console.log('Search Parameters:', {
      city,
      searchQuery,
      coordinates: CITY_COORDINATES[city],
    });

    // Create search queries based on the city
    const cityName = city.split(',')[0]; // Handle cases where city includes state
    const searchQueries = [
      searchQuery,
      `${searchQuery} rental`,
      `${searchQuery} equipment`,
      `${searchQuery} machinery`,
      `equipment hire ${cityName}`,
      `construction equipment ${cityName}`,
      `earthmoving equipment ${cityName}`,
      `plant hire ${cityName}`,
      `machinery hire ${cityName}`,
      `equipment rental ${cityName}`,
      // Add major hire companies with city
      `Coates Hire ${cityName}`,
      `Kennards Hire ${cityName}`,
      `Porter Equipment ${cityName}`,
      `Brooks Hire ${cityName}`,
      `Tutt Bryant ${cityName}`
    ];

    const searchPromises = searchQueries.map(async query => {
      const requestBody = {
        textQuery: query,
        ...(CITY_COORDINATES[city] && {
          locationBias: {
            circle: {
              center: { 
                latitude: CITY_COORDINATES[city].lat,
                longitude: CITY_COORDINATES[city].lng
              },
              radius: MAX_RADIUS
            }
          }
        }),
        maxResultCount: 20
      };

      console.log(`Making request for query: "${query}"`, requestBody);

      const response = await fetch(PLACES_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_API_KEY!,
          'X-Goog-FieldMask': [
            'places.displayName',
            'places.formattedAddress',
            'places.rating',
            'places.userRatingCount',
            'places.types',
            'places.businessStatus',
            'places.internationalPhoneNumber',
            'places.websiteUri',
            'places.location'
          ].join(','),
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log(`Results for "${query}":`, data);
      return data;
    });

    const responses = await Promise.all(searchPromises);

    // Combine and deduplicate results
    const allPlaces = responses.flatMap(data => data.places || []);
    const uniquePlaces = new Map();

    allPlaces.forEach((place: GooglePlaceResult) => {
      const key = place.displayName.text + place.formattedAddress;
      if (!uniquePlaces.has(key)) {
        uniquePlaces.set(key, {
          name: place.displayName.text,
          address: place.formattedAddress,
          rating: place.rating,
          userRatingsTotal: place.userRatingCount,
          types: place.types,
          businessStatus: place.businessStatus,
          phone: place.internationalPhoneNumber,
          website: place.websiteUri
        });
      }
    });

    return Array.from(uniquePlaces.values());
  } catch (error) {
    console.error('Error fetching from Google Places:', error);
    return [];
  }
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
      return cachedResults.results;
    }

    console.log('Fetching fresh results from Google Places API');
    const results = await fetchFromGooglePlaces(searchQuery, city);

    if (results.length > 0) {
      await PlaceCache.create({
        searchQuery,
        results,
        createdAt: new Date()
      });
    }

    return results;
  } catch (error) {
    console.error('Error in searchPlaces:', error);
    return [];
  }
} 