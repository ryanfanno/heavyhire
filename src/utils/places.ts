import { SearchResult } from '@/types';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const PLACES_API_URL = 'https://places.googleapis.com/v1/places:searchText';

interface GooglePlace {
  displayName: {
    text: string;
  };
  formattedAddress: string;
  rating?: number;
  userRatingCount?: number;
  types?: string[];
  businessStatus?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
}

interface GooglePlacesResponse {
  places?: GooglePlace[];
}

export async function fetchFromGooglePlaces(searchQuery: string, city: string): Promise<SearchResult[]> {
  try {
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
        maxResultCount: 20
      };

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
            'places.websiteUri'
          ].join(','),
        },
        body: JSON.stringify(requestBody),
      });

      const data: GooglePlacesResponse = await response.json();
      return data;
    });

    const responses = await Promise.all(searchPromises);

    // Combine and deduplicate results
    const allPlaces = responses.flatMap(data => data.places || []);
    const uniquePlaces = new Map<string, SearchResult>();

    allPlaces.forEach((place: GooglePlace) => {
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