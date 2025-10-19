'use client'

import { 
    createContext, 
    useContext, 
    useEffect, 
    useState, 
    ReactNode 
} from 'react';

type Category = {
  name: string;
  url: string;
  slug: string;
};

type CategoryContextType = {
  categories: Category[];
  loading: boolean;
  error: string | null;
};

const CategoryContext = createContext<CategoryContextType | undefined>({
  categories: [],
  loading: false,
  error: '',
});

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data  = await res.json();

        setCategories(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


  return (
    <CategoryContext.Provider 
    value={{ 
        categories, 
        loading,
        error }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories(): CategoryContextType {
  const context = useContext(CategoryContext);
  if (!context) throw new Error('useCategories must be used within a CategoryProvider');
  return context;
}
