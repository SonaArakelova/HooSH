'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useProducts } from '@/context/ProductContext';


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

type Props = {
    products : Product[];
}


export function ProductsByCategory({ products }: Props) {
       const { handleAddToCart } = useProducts();
  


  return (
    <div className='container mx-auto px-4'>
      <ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-1  '>
      {products.map((product) => (
          <li key={product.id} className='p-2 mt-6'
          style={{backgroundColor: ''}} >
            <div className="relative w-[390px] h-[380px] mb-5 bg-card flex items-center ">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>
           
           <div>
            <Link className="font-medium hover:underline" href={`/products/${product.id}`}>
              {product.title}
            </Link>
            <p>{product.brand}</p>
           <div className="flex gap-2 items-center">
            <span className="line-through ">${product.price}</span>
            <span className="font-semibold text-black">
              ${((product.price - (product.price * product.discountPercentage) / 100)).toFixed(1)}
            </span>
          </div>
           <button  
            onClick={() => handleAddToCart(product)}
            className=' bg-white px-2 py-1 mt-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-50 transition duration-200'>Add to Cart</button>

            </div>
          </li>
        ))}
          </ul>
          </div>

  );
}