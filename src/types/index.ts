import { ComponentType } from 'react';

export interface City {
  City: string;
  State: string;
  Region: string;
}

export interface Keyword {
  id: string;
  term: string;
  category: string;
  type: string;
}

export interface SearchResult {
  name: string;
  address: string;
  rating?: number;
  userRatingsTotal?: number;
  types?: string[];
  businessStatus?: string;
  phone?: string;
  website?: string;
}

export interface SearchParams {
  city: string;
  keyword: string;
  page?: number;
}

export interface SearchHistory {
  city: string;
  keyword: string;
  timestamp: number;
}

export interface CategoryInfo {
  title: string;
  description: string;
  features: string[];
  useCases: string[];
  icon: ComponentType<{ className?: string }>;
} 