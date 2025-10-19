import React from 'react'

import { Product } from '../../../components/Content/Product';

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



type Params = {
  params: Promise<{ id: string }>;
};


type idResponse = Product;



export default async function page({ params }: Params) {

  const { id } = await params;

  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 60 }
  });


  if (!res.ok) throw new Error(`failed to fetch by ${id}`);
  const data: idResponse = await res.json();

  const product = data;





  return (
    <div className=" container mx-auto mb-3 bg-custom min-h-auto pt-7">

      <Product product={product} />

    </div>

  )
}
