import path from 'path';
import fs from 'fs';
import { City, Keyword } from '@/types';

export async function getCities(): Promise<City[]> {
  try {
    const filePath = path.join(process.cwd(), 'public/data/cities.json');
    const jsonData = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error loading cities:', error);
    return [];
  }
}

export async function getKeywords(): Promise<Keyword[]> {
  try {
    const filePath = path.join(process.cwd(), 'public/data/keywords.json');
    const jsonData = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error loading keywords:', error);
    return [];
  }
}

export function formatSearchTerm(keyword: string, city: string): string {
  return `${keyword} ${city}`;
}

export function formatCityName(city: string): string {
  return city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
} 