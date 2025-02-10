'use client';

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ 
  currentPage, 
  totalResults, 
  resultsPerPage,
  onPageChange 
}: PaginationProps) {
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-gray-200 text-primary disabled:text-gray-400 disabled:border-gray-100 hover:border-secondary transition-colors"
      >
        Previous
      </button>

      <div className="flex space-x-2">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors
              ${currentPage === page 
                ? 'bg-secondary text-primary font-semibold' 
                : 'text-primary hover:bg-gray-100'
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-gray-200 text-primary disabled:text-gray-400 disabled:border-gray-100 hover:border-secondary transition-colors"
      >
        Next
      </button>
    </div>
  );
} 