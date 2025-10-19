import React from 'react'
import {ProductsByCategory} from '../../../../components/Content/ProductsByCategory'



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
        data.products ? <ProductsByCategory products={data.products}/>:
        <p className="text-center text-2xl text-gray-500">No product found in {category}</p>
      }

    </div>
  )
}