import { MapPinIcon } from '@heroicons/react/24/outline';

interface LocationContentProps {
  cityName: string;
}

export default function LocationContent({ cityName }: LocationContentProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        <MapPinIcon className="h-6 w-6 text-secondary mr-2" />
        <h1 className="text-3xl font-bold text-primary">
          Equipment Hire in {cityName}
        </h1>
      </div>

      <div className="prose max-w-none text-primary-light">
        <p>
          Looking for reliable equipment hire in {cityName}? We connect you with trusted local providers 
          offering a wide range of construction and earthmoving equipment including excavators, 
          bulldozers, bobcats, and more.
        </p>

        <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
          Why Choose Equipment Hire in {cityName}
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access to local equipment hire providers</li>
          <li>Competitive rates and flexible hire terms</li>
          <li>Wide range of machinery and equipment available</li>
          <li>Expert advice and support</li>
          <li>Delivery and pickup options</li>
        </ul>

        <h2 className="text-xl font-semibold text-primary mt-6 mb-3">
          Popular Equipment Types
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Excavators (mini to large)</li>
          <li>Bobcats and Skid Steer Loaders</li>
          <li>Bulldozers</li>
          <li>Backhoes</li>
          <li>Rollers and Compactors</li>
          <li>Trenchers</li>
          <li>Graders</li>
        </ul>
      </div>
    </div>
  );
} 