import Link from 'next/link';
import { TruckIcon } from '@heroicons/react/24/outline';

interface PopularCategoriesProps {
  vertical?: boolean;
}

const categories = [
  {
    title: 'Excavators',
    description: 'Dig deep with our range of excavators from mini to large',
    icon: TruckIcon,
    link: '/category/excavators'
  },
  {
    title: 'Bulldozers',
    description: 'Move earth efficiently with powerful bulldozers',
    icon: TruckIcon,
    link: '/category/bulldozers'
  },
  {
    title: 'Bobcats',
    description: 'Versatile skid-steer loaders for any job',
    icon: TruckIcon,
    link: '/category/bobcats'
  }
  // Add more categories as needed
];

export default function PopularCategories({ vertical = false }: PopularCategoriesProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">
          Popular Equipment Categories
        </h2>
        
        <div className={`grid ${vertical ? 'grid-cols-1' : 'md:grid-cols-3'} gap-8`}>
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.link}
              className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <category.icon className="h-8 w-8 text-secondary" />
                <h3 className="text-xl font-semibold text-primary ml-3">
                  {category.title}
                </h3>
              </div>
              <p className="text-primary-light">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 