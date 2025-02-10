import { TruckIcon, CogIcon } from '@heroicons/react/24/outline';
import { CategoryInfo } from '@/types';

export const categoryInfo: Record<string, CategoryInfo> = {
  'excavator hire': {
    title: 'Excavator',
    description: 'Versatile earthmoving machines for digging, trenching, and material handling.',
    features: [
      'Multiple size options',
      'Various attachments available',
      'Climate controlled cabins',
      'GPS tracking systems'
    ],
    useCases: [
      'Construction sites',
      'Landscaping projects',
      'Mining operations',
      'Demolition work'
    ],
    icon: TruckIcon
  },
  // Add more categories as needed
};

export function getCategoryInfo(category: string): CategoryInfo {
  const normalizedCategory = category.toLowerCase();
  return categoryInfo[normalizedCategory] || {
    title: category,
    description: `Find the best ${category} equipment for your needs.`,
    features: [],
    useCases: [],
    icon: CogIcon
  };
} 