import { Keyword } from '@/types';
import Link from 'next/link';

interface CategoryListProps {
  keywords: Keyword[];
}

export default function CategoryList({ keywords }: CategoryListProps) {
  // Group keywords by category
  const groupedKeywords = keywords.reduce((acc, keyword) => {
    if (!acc[keyword.category]) {
      acc[keyword.category] = [];
    }
    acc[keyword.category].push(keyword);
    return acc;
  }, {} as Record<string, Keyword[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedKeywords).map(([category, items]) => (
        <div key={category} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((keyword) => (
              <Link
                key={keyword.id}
                href={`/search/australia/${encodeURIComponent(keyword.term)}`}
                className="p-4 rounded-lg border border-gray-200 hover:border-secondary hover:shadow-md transition-all"
              >
                <div className="font-medium text-primary">{keyword.term}</div>
                <div className="text-sm text-gray-500">{keyword.type}</div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {keywords.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No categories found.
        </div>
      )}
    </div>
  );
} 