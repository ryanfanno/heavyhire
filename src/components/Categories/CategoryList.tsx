import Link from 'next/link';
import { TruckIcon } from '@heroicons/react/24/outline';
import { Keyword } from '@/types';

interface CategoryListProps {
  keywords: Keyword[];
}

export default function CategoryList({ keywords }: CategoryListProps) {
  // Group keywords by first letter
  const groupedKeywords = keywords.reduce((acc, keyword) => {
    const firstLetter = keyword.term[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(keyword);
    return acc;
  }, {} as Record<string, Keyword[]>);

  // Sort letters
  const sortedLetters = Object.keys(groupedKeywords).sort();

  return (
    <div className="space-y-8">
      {sortedLetters.map(letter => (
        <div key={letter} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
            <span className="bg-secondary text-primary w-10 h-10 rounded-full flex items-center justify-center mr-3">
              {letter}
            </span>
            Equipment Types
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedKeywords[letter].map(keyword => (
              <Link
                key={keyword.id}
                href={`/category/${encodeURIComponent(keyword.term.toLowerCase())}`}
                className="flex items-center p-3 hover:bg-background rounded-lg transition-colors"
              >
                <TruckIcon className="h-5 w-5 text-secondary mr-2" />
                <span className="text-primary hover:text-secondary transition-colors">
                  {keyword.term}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 