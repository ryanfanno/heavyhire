import { ClipboardIcon, MagnifyingGlassIcon, PhoneIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    title: 'Search Equipment',
    description: 'Find the right equipment in your area',
    icon: MagnifyingGlassIcon
  },
  {
    title: 'Compare Options',
    description: 'Review ratings, prices and availability',
    icon: ClipboardIcon
  },
  {
    title: 'Contact Provider',
    description: 'Get in touch directly with the provider',
    icon: PhoneIcon
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full border-t-2 border-dashed border-gray-300 -mt-8" />
                )}
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-primary-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 