import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import { getCities, getKeywords } from '@/utils/data';
import HeroSearch from '@/components/HeroSearch';
import LocalProviders from '@/components/Cities/LocalProviders';
import PopularCategories from '@/components/PopularCategories';
import { formatCityName } from '@/utils/format';

interface CityPageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const cityName = formatCityName(city);
  
  return {
    title: `Equipment Hire in ${cityName} | Heavy Equipment Hire Directory`,
    description: `Find and compare construction equipment hire in ${cityName}. Browse excavators, bulldozers, bobcats and more.`
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const cityName = formatCityName(city);
  const [cities, keywords] = await Promise.all([getCities(), getKeywords()]);

  // Verify city exists
  if (!cities.some(c => c.City.toLowerCase() === cityName.toLowerCase())) {
    notFound();
  }

  return (
    <Layout>
      <div className="bg-background min-h-screen">
        <HeroSearch 
          cities={cities} 
          keywords={keywords}
          initialCity={cityName}
          compact
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LocalProviders city={cityName} />
            </div>
            <div className="lg:col-span-1">
              <PopularCategories vertical />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 