import { Metadata } from 'next';
import Layout from '@/components/Layout';
import { getCities } from '@/utils/data';
import CityGrid from '@/components/Cities/CityGrid';
import PopularSearches from '@/components/PopularSearches';

export const metadata: Metadata = {
  title: 'Heavy Equipment Hire by City | Heavy Equipment Directory',
  description: 'Find construction and earthmoving equipment for hire in cities across Australia. Compare local providers and get the best deals.'
};

export default async function CitiesPage() {
  const cities = await getCities();

  return (
    <Layout>
      <div className="bg-background min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Equipment Hire by City
          </h1>
          <p className="text-primary-light mb-8">
            Find and compare equipment hire services in your city
          </p>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <CityGrid cities={cities} />
            </div>
            <div className="lg:col-span-1">
              <PopularSearches />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 