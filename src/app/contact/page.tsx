import { Metadata } from 'next';
import Layout from '@/components/Layout';
import ContactForm from '@/components/Contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Heavy Equipment Hire Directory',
  description: 'Get in touch with our team for support, feedback, or business inquiries.'
};

export default function ContactPage() {
  return (
    <Layout>
      <div className="bg-background min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-primary mb-8">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-primary mb-6">Get in Touch</h2>
              <ContactForm />
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-primary mb-6">Contact Information</h2>
              <div className="space-y-4 text-primary-light">
                <p>
                  <strong className="text-primary">Email:</strong>
                  <br />
                  admin@heavyhireaustralia.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 