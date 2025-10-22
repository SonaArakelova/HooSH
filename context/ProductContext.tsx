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


export type Order = {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    category: string;
    images:string[];
    quantity: number;
}


export type ProductContextType = {
  products: Products[];
  loading: boolean;
  error: string | null;
  orders: Order[];
  handleAddToCart: (product: Products) => void;
  handleRemoveFromCart:(order:Order) => void;
  decreaseCartItemQuantity: (order:Order) => void;
  increaseCartItemQuantity:(order:Order) => void;
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
  const [products, setProducts] = useState<Products[]>([]);
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



  const handleAddToCart = (products: Products)=>{
    const exists = orders.find(order => order.id === products.id);
    
    if( exists){
      setOrders(prev => prev.map(order =>  order.id === products.id
       ? {...order, quantity: order.quantity +1 }
       :order
      )
      );
      }else{
        const newOrder = {
          ...products, quantity: 1
        }
        setOrders((prev: Order[]) => [...prev, newOrder])
      }
    };
  

    const handleRemoveFromCart = (orderToRemove: Order) => {
      setOrders(prev => prev.filter(order => order.id !== orderToRemove.id));
    };



    const increaseCartItemQuantity = (order: Order) => {
      setOrders(prev =>prev.map(item =>
          item.id === order.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    };


  const decreaseCartItemQuantity = (order: Order) => {
    const existing = orders.find(item => item.id === order.id);

    if (existing) {
      if (existing.quantity === 1) {
        handleRemoveFromCart(existing);
      } else {
        setOrders(prev =>
          prev.map(item =>
            item.id === order.id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      }
    }
  };


  

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









