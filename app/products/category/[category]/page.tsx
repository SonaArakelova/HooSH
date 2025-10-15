import React from 'react'
import {CategoryList} from './_components/CategoryList'
//import { Pagination } from '@/components/Pagination';

type Products = {

  id: number;
  title: string;
  category: string,
  price: number,
  discountPercentage: number;
  brand:string;
  images: string[]; 
};


type ProductResponse = {
    products : Products[];
}

type Params = {
    params: Promise<{category:string}>
};



export default async function CategoryPage({params}: Params) {

  const {category} = await params;
  const res = await fetch (`https://dummyjson.com/products/category/${category}`, {next:{revalidate:60}});
  if (!res.ok) throw new Error(`failed to fetch one category ${category}`);
  const data : ProductResponse = await res.json();

  return (
    <div className=" container mx-auto mb-3 bg-custom min-h-auto">
      <p className='mt-30 px-8 text-[1.1rem] '>{category}</p>
      {
        data.products ? <CategoryList products={data.products}/>:
        <p className="text-center text-2xl text-gray-500">No meals found in {category}</p>
      }

    </div>
  )
}