import { Metadata } from 'next';
import Layout from '@/components/Layout';
import HeroSearch from '@/components/HeroSearch';
import { getCities, getKeywords } from '@/utils/data';
import EquipmentList from '@/components/EquipmentList';
import CategoryInfo from '@/components/CategoryInfo';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  props: CategoryPageProps
): Promise<Metadata> {
  const params = await props.params;
  const category = decodeURIComponent(params.slug)
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${category} Hire in Australia | Heavy Equipment Directory`,
    description: `Find and compare ${category} for hire across Australia. View ratings, prices, and contact information.`
  };
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  const category = decodeURIComponent(params.slug)
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const [cities, keywords] = await Promise.all([getCities(), getKeywords()]);

  return (
    <Layout>
      <div className="bg-background min-h-screen">
        <HeroSearch 
          cities={cities} 
          keywords={keywords}
          initialKeyword={category}
          compact
        />
        
        <div className="container mx-auto px-4 py-8">
          <CategoryInfo category={category} />
          <EquipmentList category={category} />
        </div>
      </div>
    </Layout>
  );
} 