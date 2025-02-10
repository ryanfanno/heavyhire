export function formatCityName(city: string): string {
  return decodeURIComponent(city)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
} 