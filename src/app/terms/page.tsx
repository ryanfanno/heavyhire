import { Metadata } from 'next';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Heavy Equipment Hire Directory',
  description: 'Read our terms and conditions for using the Heavy Equipment Hire Directory platform.'
};

export default function TermsPage() {
  return (
    <Layout>
      <div className="bg-background min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-primary mb-8">Terms & Conditions</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">1. Agreement to Terms</h2>
              <p className="text-primary-light">
                By accessing and using Heavy Equipment Hire Directory, you agree to be bound 
                by these Terms and Conditions and our Privacy Policy. If you disagree with 
                any part of these terms, you may not access the service.
              </p>
            </section>

            {/* Add more sections as needed */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">2. Use License</h2>
              <p className="text-primary-light">
                Permission is granted to temporarily access the materials on Heavy Equipment 
                Hire Directory for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">3. Disclaimer</h2>
              <p className="text-primary-light">
                The materials on Heavy Equipment Hire Directory are provided on an &apos;as is&apos; basis. 
                We make no warranties, expressed or implied, and hereby disclaim and negate all 
                other warranties including, without limitation, implied warranties or conditions 
                of merchantability, fitness for a particular purpose, or non-infringement of 
                intellectual property or other violation of rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">4. Accuracy of Information</h2>
              <p>
                We don&apos;t guarantee the accuracy of providers&apos; information.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 