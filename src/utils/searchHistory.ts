import { SearchHistory } from '@/types';

const STORAGE_KEY = 'recentSearches';
const MAX_HISTORY = 10;

export function addToSearchHistory(city: string, keyword: string): void {
  if (typeof window === 'undefined') return;

  try {
    const existingHistory: SearchHistory[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    );

    const newSearch: SearchHistory = {
      city,
      keyword,
      timestamp: Date.now()
    };

    // Remove duplicates and add new search at the beginning
    const updatedHistory = [
      newSearch,
      ...existingHistory.filter(
        item => !(item.city === city && item.keyword === keyword)
      )
    ].slice(0, MAX_HISTORY);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error updating search history:', error);
  }
}

export function getSearchHistory(): SearchHistory[] {
  if (typeof window === 'undefined') return [];

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    console.error('Error reading search history:', error);
    return [];
  }
}

export function clearSearchHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
} 