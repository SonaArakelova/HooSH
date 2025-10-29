'use client'

import {
    useState,
    useEffect,
    useContext,
    createContext,
    ReactNode
} from 'react';




type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  images: string[];
  reviews: Review[];
  thumbnail: string;
}



export type Order = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  images: string[];
  reviews: Review[];
  thumbnail: string;
    quantity: number;
}


export type ProductContextType = {
  products: Product[];
  loading: boolean;
  error: string | null;
  orders: Order[];
  handleAddToCart: (product: Product) => void;
  handleRemoveFromCart:(id: number)=> void,
  decreaseCartItemQuantity: (id: number)=> void,
  increaseCartItemQuantity:(id: number)=> void,
}


const ProductContext = createContext<ProductContextType | undefined>({
  products: [],
  loading: false,
  error: '',
  orders:[],
  handleAddToCart: () => { },
  handleRemoveFromCart: ()=>{},
  decreaseCartItemQuantity: ()=>{},
  increaseCartItemQuantity: ()=>{},
});



export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);


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



  const handleAddToCart = (product: Product)=>{
    const exists = orders.find(order => order.id === product.id);
    
    if( exists){
      setOrders(prev => prev.map(order =>  order.id === product.id
       ? {...order, quantity: order.quantity +1 }
       :order
      )
      );
      }else{
        const newOrder = {
          ...product, quantity: 1
        }
        setOrders((prev: Order[]) => [...prev, newOrder])
      }
    };
  

    const handleRemoveFromCart = (id: number) => {
      setOrders(prev => prev.filter(item => item.id !== id));
    };



    const increaseCartItemQuantity = (id: number) => {
      setOrders(prev => prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    };


  const decreaseCartItemQuantity = (id: number) => {
    const existing = orders.find(item => item.id === id);

    if (existing) {
      if (existing.quantity === 1) {
        handleRemoveFromCart(id);
      } else {
        setOrders(prev =>
          prev.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      }
    }
  };


  //for local storage, but not working properly :(
  //setitem ok but getitem no

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(orders));
  },
  [orders]);


useEffect(() => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setOrders(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }
}, []);
  

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        orders,
        handleAddToCart,
        handleRemoveFromCart,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
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









