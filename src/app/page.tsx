import Layout from '@/components/Layout';
import HeroSearch from '@/components/HeroSearch';
import PopularSearches from '@/components/PopularSearches';
import PopularCategories from '@/components/PopularCategories';
import HowItWorks from '@/components/HowItWorks';
import RecentSearches from '@/components/RecentSearches';
import { getCities, getKeywords } from '@/utils/data';

export default async function Home() {
  try {
    const [cities, keywords] = await Promise.all([getCities(), getKeywords()]);

    return (
      <Layout>
        <div className="bg-background min-h-screen">
          <HeroSearch cities={cities} keywords={keywords} />
          <RecentSearches />
          <PopularCategories />
          <HowItWorks />
          <PopularSearches />
        </div>
      </Layout>
    );
  } catch (error) {
    console.error('Failed to load data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load data. Please try again later.</p>
      </div>
    );
  }
}
