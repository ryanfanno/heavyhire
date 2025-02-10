export interface GooglePlaceResult {
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