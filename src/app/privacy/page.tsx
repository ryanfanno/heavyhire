import { Metadata } from 'next';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Heavy Equipment Hire Directory',
  description: 'Learn about how we collect, use, and protect your personal information.'
};

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="bg-background min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">Information We Collect</h2>
              <p className="text-primary-light">
                We collect information that you provide directly to us when using our service, 
                including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-primary-light space-y-2">
                <li>Contact information (name, email, phone number)</li>
                <li>Search history and preferences</li>
                <li>Location data for local search results</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">How We Use Your Information</h2>
              <p className="text-primary-light">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 text-primary-light space-y-2">
                <li>Provide and improve our services</li>
                <li>Personalize your experience</li>
                <li>Process your requests and searches</li>
                <li>Send you updates and notifications</li>
              </ul>
            </section>

            {/* Add more sections as needed */}
          </div>
        </div>
      </div>
    </Layout>
  );
} 