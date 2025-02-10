import { TruckIcon } from '@heroicons/react/24/outline';

interface CategoryInfoProps {
  category: string;
}

const categoryInfo: Record<string, {
  description: string;
  features: string[];
  useCases: string[];
}> = {
  'excavators': {
    description: 'Excavators are versatile earthmoving machines used for digging, trenching, and material handling.',
    features: [
      'Various sizes from mini to large',
      'Multiple attachment options',
      'Precise control systems',
      'Climate-controlled cabins'
    ],
    useCases: [
      'Construction sites',
      'Landscaping projects',
      'Mining operations',
      'Demolition work'
    ]
  },
  // Add more categories as needed
};

export default function CategoryInfo({ category }: CategoryInfoProps) {
  const info = categoryInfo[category.toLowerCase()] || {
    description: `Find the best ${category} for hire in your area.`,
    features: [],
    useCases: []
  };

  // Format the category title properly
  const formattedTitle = decodeURIComponent(category)
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        <TruckIcon className="h-8 w-8 text-secondary mr-3" />
        <h1 className="text-3xl font-bold text-primary">
          {formattedTitle}
        </h1>
      </div>

      <p className="text-primary-light mb-6">
        {info.description}
      </p>

      {info.features.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary mb-3">Key Features</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {info.features.map((feature, index) => (
              <li key={index} className="text-primary-light flex items-center">
                <span className="w-2 h-2 bg-secondary rounded-full mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {info.useCases.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-primary mb-3">Common Uses</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {info.useCases.map((useCase, index) => (
              <li key={index} className="text-primary-light flex items-center">
                <span className="w-2 h-2 bg-secondary rounded-full mr-2" />
                {useCase}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 