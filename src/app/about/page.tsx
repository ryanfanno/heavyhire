import { Metadata } from 'next';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'About Us | Heavy Equipment Hire Directory',
  description: 'Learn about Australia&apos;s leading platform for construction and earthmoving equipment hire.'
};

export default function AboutPage() {
  return (
    <Layout>
      <div className="bg-background min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-primary mb-8">About Us</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">Our Mission</h2>
              <p className="text-primary-light">
                Heavy Equipment Hire Directory is Australia&apos;s comprehensive platform connecting businesses 
                and individuals with quality construction and earthmoving equipment providers. Our mission 
                is to simplify the equipment hire process across Australia.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">What We Do</h2>
              <p className="text-primary-light">
                We provide a centralized platform where users can:
              </p>
              <ul className="list-disc pl-6 text-primary-light space-y-2">
                <li>Search for equipment hire providers in their local area</li>
                <li>Compare ratings and reviews from verified users</li>
                <li>Access detailed information about equipment specifications</li>
                <li>Connect directly with equipment providers</li>
                <li>Find the best deals for their project needs</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">Our Coverage</h2>
              <p className="text-primary-light">
                We maintain an extensive network of equipment providers across Australia, 
                from major cities to regional areas. Our platform helps connect customers 
                with local providers in every state and territory.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 