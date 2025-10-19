'use client'

import {
    useState,
    useEffect,
    useContext,
    createContext,
    ReactNode
} from 'react';

type Products = {
  id: number;
  title: string;
  category: string,
  price: number,
  discountPercentage: number;
  brand:string;
  images: string[]; 
};



export type ProductContextType = {
  products: Products[];
  loading: boolean;
  error: string | null;
}


const ProductContext = createContext<ProductContextType | undefined>({
  products: [],
  loading: false,
  error: '',
});

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('https://dummyjson.com/products?limit=0');
      if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
        const data = await res.json();      
      setProducts(data.products);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };
    fetchProducts();
  }, []);

  
  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
      }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts(): ProductContextType {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
}