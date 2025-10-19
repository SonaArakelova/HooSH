
'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useCategories } from '../../context/CategoryContext';

export function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const { categories, loading, error } = useCategories();

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <line x1="1" y1="6" x2="40" y2="6" stroke="black" strokeWidth="1" />
          <line x1="1" y1="12" x2="40" y2="12" stroke="black" strokeWidth="1" />
          <line x1="1" y1="18" x2="40" y2="18" stroke="black" strokeWidth="1" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute -right-40 mt-2 w-48 bg-white shadow-lg rounded-md z-50 max-h-[200px] overflow-y-auto"
          onMouseLeave={handleMouseLeave}
        >
          <ul className="py-2">
            {loading && <li className="px-4 py-2">Loading...</li>}
            {error && <li className="px-4 py-2 text-red-500">{error}</li>}
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                   href={`/products/category/${category.slug}`}
                  className="block px-4 py-2 hover:bg-gray-50"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
