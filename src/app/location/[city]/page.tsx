import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import { getCities, getKeywords } from '@/utils/data';
import HeroSearch from '@/components/HeroSearch';
import LocalProviders from '@/components/Cities/LocalProviders';
import PopularCategories from '@/components/PopularCategories';
import { formatCityName } from '@/utils/format';
import LocationContent from '@/components/Location/LocationContent';

interface LocationPageProps {
  params: Promise<{
    city: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export async function generateMetadata(props: LocationPageProps): Promise<Metadata> {
  const params = await props.params;
  const cityName = formatCityName(params.city);
  
  return {
    title: `Equipment Hire ${cityName} | Heavy Equipment Directory`,
    description: `Find construction and earthmoving equipment hire in ${cityName}. Compare local providers, prices and availability for excavators, bulldozers, bobcats and more.`,
    alternates: {
      canonical: `https://heavyhireaustralia.com/location/${params.city.toLowerCase()}`
    }
  };
}

export default async function LocationPage(props: LocationPageProps) {
  const params = await props.params;
  const cityName = formatCityName(params.city);
  const [cities, keywords] = await Promise.all([getCities(), getKeywords()]);

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
              <LocationContent cityName={cityName} />
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