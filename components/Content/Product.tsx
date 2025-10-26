'use client'
import React from 'react'
import Image from 'next/image';
import { useProducts } from '@/context/ProductContext'


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




export function Product({ product }: { product: Product }) {
     const {   handleAddToCart, } = useProducts();


    return (
        <div className='container mx-auto '>
            <div className='px-4 flex gap-10'>

                <div className="lg:w-1/2 md:w-1/4 bg-card" >
                    <Image
                        className="w-full rounded shadow-md"
                        src={product.images[0]}
                        alt={product.title}
                        width={450}
                        height={150}

                    />
                </div>

                <div className='flex flex-col items-baseline text-center min-w-1/3 ml-12 '>
                    <h1 className='text-4xl color-text mt-5'>{product.title}</h1>

                    <div className="flex gap-2 text-center mt-4 ">
                        <span className="line-through ">${product.price}</span>
                        <span className="font-semibold text-black">
                            ${((product.price - (product.price * product.discountPercentage) / 100)).toFixed(1)}
                        </span>
                    </div>

                    <h2 className='text-2xl mt-4'>{product.brand}</h2>
                    
                   {/* rating */}
                    <div className="mt-2 flex items-center gap-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.round(product.rating) ? 'text-yellow-500' : 'text-gray-300'}>
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">({product.rating.toFixed(1)} / 5)</span>
                    </div>

                    <h4 className="mt-2 text-xl text-text">
                        Warranty: <span className="text-gray-500 font-extralight">{product.warrantyInformation}</span>
                    </h4>
                    <h4 className="mt-2 text-xl text-text">
                        Weight: <span className=" text-gray-500 font-extralight">{product.weight} kg</span>
                    </h4>
                    <h4 className="mt-2 text-xl text-text">
                        Stock: <span className=" text-gray-500 font-extralight">{product.stock} units</span>
                    </h4>
                    <h4 className="mt-2 text-xl text-text">
                        Dimensions: <span className="text-gray-500 font-extralight">
                            {product.dimensions.width} * {product.dimensions.height} * {product.dimensions.depth} cm
                        </span>
                    </h4>
                    <h4 className="mt-2 text-xl text-text">
                        Shipping: <span className="text-gray-500 font-extralight">{product.shippingInformation}</span>
                    </h4>

                    <h4 className="mt-2 text-xl text-text">
                        Availability: <span className="text-gray-500 font-extralight">{product.availabilityStatus}</span>
                    </h4>

                    <h4 className="mt-2 text-xl text-text">
                        Return Policy: <span className="text-gray-500 font-extralight">{product.returnPolicy}</span>
                    </h4>

                    <div className='flex flex-row gap-2  justify-center items-center mt-5'>
                        {/* <div className="relative w-33 ">
                            <button
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                className="absolute left-0 top-1/2 -translate-y-1/2 px-2 text-lg text-gray-600 hover:text-black cursor-pointer"
                            >
                                -
                            </button>

                            <input
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-full text-center border border-gray-300 rounded text-lg py-2 px-8 bg-white text-text"
                            />

                            <button
                                onClick={() => setQuantity(prev => prev + 1)}
                                className="absolute right-0 top-1/2 -translate-y-1/2 px-2 text-lg text-gray-600 hover:text-black cursor-pointer"                        >
                                +
                            </button>
                        </div> */}

                        <button className='bg-white px-7 h-11.5 border  border-gray-300 rounded cursor-pointer hover:bg-gray-50 transition duration-200'
                         onClick={() => handleAddToCart(product)} 
                         >

                            Add to cart
                        </button>
                    </div>

                </div>
            </div>

            <div className='mt-10 px-6'>

                <div className="bg-white shadow-sm rounded-md p-4 border border-gray-200">
                    <h2 className='text-2xl'>Description!</h2>
                    <p className="mt-4 text-gray-700">{product.description}</p>

                </div>

                <div className="mt-8 w-full">
                    <h3 className="text-2xl mb-4 text-text ml-4 mt-4">Customer Reviews</h3>
                    <div className="space-y-4">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="bg-white shadow-sm rounded-md p-4 border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="font-medium text-gray-800">{review.reviewerName}</div>
                                    <div className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</div>
                                </div>
                                {/* rating */}
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>
                                            ★
                                        </span>
                                    ))}
                                    <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
                                </div>
                                <div className="text-gray-700 italic">{review.comment}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}






