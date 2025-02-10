import Link from 'next/link';

interface SearchCategory {
  title: string;
  description: string;
  link: string;
}

export default function PopularSearches() {
  const categories: SearchCategory[] = [
    {
      title: 'Excavators in Sydney',
      description: 'Find top excavator hire vendors',
      link: '/search/Sydney/Excavator'
    },
    {
      title: 'Bulldozers in Melbourne',
      description: 'Find top bulldozer hire vendors',
      link: '/search/Melbourne/Bulldozer'
    },
    {
      title: 'Bobcats in Brisbane',
      description: 'Find top bobcat hire vendors',
      link: '/search/Brisbane/Bobcat'
    },
    {
      title: 'Loaders in Perth',
      description: 'Find top loader hire vendors',
      link: '/search/Perth/Loader'
    },
    {
      title: 'Diggers in Adelaide',
      description: 'Find top digger hire vendors',
      link: '/search/Adelaide/Digger'
    },
    {
      title: 'Skid Steers in Gold Coast',
      description: 'Find top skid steer hire vendors',
      link: '/search/Gold%20Coast/Skid%20steer%20loader'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Popular Searches
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.link}
              className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 