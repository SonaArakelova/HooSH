import React from 'react'
import {ProductsByCategory} from '../../../../components/Content/ProductsByCategory'


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


type ProductResponse = {
    products : Product[];
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
      <p className='mt-30 px-8 text-[1.1rem] uppercase '>{category}</p>
      {
        data.products ? <ProductsByCategory products={data.products}/>:
        <p className="text-center text-2xl text-gray-500">No product found in {category}</p>
      }

    </div>
  )
}