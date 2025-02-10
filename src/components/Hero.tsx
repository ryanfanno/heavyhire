import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("/pattern.svg")',
          backgroundSize: '30px 30px',
          backgroundRepeat: 'repeat'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find the Right Equipment,
              <span className="block">Right Now</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl">
              Australia&apos;s largest directory of excavators, bobcats, bulldozers and more
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                Browse Equipment
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                List Your Equipment
              </button>
            </div>
          </div>
          <div className="hidden md:block relative h-96">
            <Image
              src="/hero-equipment.png"
              alt="Construction Equipment"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
} 