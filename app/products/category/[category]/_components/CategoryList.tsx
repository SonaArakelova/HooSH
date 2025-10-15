'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';


type Products = {

  id: number;
  title: string;
  category: string,
  price: number,
  discountPercentage: number;
  brand:string;
  images: string[]; 
};



type Props = {
    products : Products[];
}

export function CategoryList({ products }: Props) {
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
            <Link className="font-medium" href={`/products/${product.id}`}>
              {product.title}
            </Link>
           <div className="flex gap-2 items-center">
            <span className="line-through ">${product.price}</span>
            <span className="font-semibold text-black">
              ${((product.price - (product.price * product.discountPercentage) / 100)).toFixed(1)}
            </span>
          </div>
            </div>

          </li>
        ))}
          </ul>
          </div>

  );
}