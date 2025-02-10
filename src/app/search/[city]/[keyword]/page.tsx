import { Metadata } from 'next';
import Layout from '@/components/Layout';
import HeroSearch from '@/components/HeroSearch';
import { getCities, getKeywords } from '@/utils/data';
import SearchResults from '@/components/SearchResults/SearchResults';
import { searchPlaces } from '@/services/places';
import { formatCityName } from '@/utils/format';

interface SearchPageProps {
  params: Promise<{
    city: string;
    keyword: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata(props: SearchPageProps): Promise<Metadata> {
  const params = await props.params;
  const cityName = formatCityName(params.city);
  const keyword = decodeURIComponent(params.keyword);

  return {
    title: `${cityName} Equipment Hire | Heavy Equipment Directory`,
    description: `Find and compare ${keyword} hire in ${cityName}. View ratings, reviews, and contact information.`
  };
}

export default async function SearchPage(props: SearchPageProps) {
  const [params] = await Promise.all([
    props.params
  ]);

  const cityName = formatCityName(params.city);
  const keyword = decodeURIComponent(params.keyword);

  const [cities, keywords, results] = await Promise.all([
    getCities(),
    getKeywords(),
    searchPlaces({
      city: cityName,
      keyword: keyword
    })
  ]);

  return (
    <Layout>
      <div className="bg-background min-h-screen">
        <HeroSearch 
          cities={cities} 
          keywords={keywords}
          initialCity={cityName}
          initialKeyword={keyword}
          compact
        />
        
        <div className="container mx-auto px-4 py-8">
          <SearchResults 
            results={results}
            cityName={cityName}
          />
        </div>
      </div>
    </Layout>
  );
} 