'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-primary text-white shadow-md w-full py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-secondary">
            Heavy Equipment
          </span>
          <span className="text-2xl font-bold text-white ml-1">
            Hire Directory
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/about" className="text-gray-300 hover:text-secondary transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-secondary transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
} 