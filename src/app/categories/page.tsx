import { Metadata } from 'next';
import Layout from '@/components/Layout';
import { getKeywords } from '@/utils/data';
import CategoryList from '@/components/CategoryList';

export const metadata: Metadata = {
  title: 'Equipment Categories | Heavy Equipment Hire Directory',
  description: 'Browse our comprehensive list of construction and earthmoving equipment categories.'
};

export default async function CategoriesPage() {
  const keywords = await getKeywords();
  
  return (
    <Layout>
      <div className="bg-background min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-8">Equipment Categories</h1>
          <CategoryList keywords={keywords} />
        </div>
      </div>
    </Layout>
  );
} 