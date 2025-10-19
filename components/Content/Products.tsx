'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import { useProducts } from '@/context/ProductContext'


export  function Products() {
     const { products, loading, error } = useProducts();
     const [page, setPage] = useState(1);
     const itemsPerPage = 9;
     const totalPages = Math.ceil(products.length / itemsPerPage);

           console.log(products)


     const current = useMemo(()=>{
      const start = (page-1) * itemsPerPage;
      return products.slice(start, start + itemsPerPage);///0-9
     }, [page,products]);

     const prev = () => setPage(p => Math.max(1, p-1));
     const next = ()=> setPage(p => Math.min(totalPages, p + 1));

      const visiblePages = useMemo(() => {
      const maxVisible = 4;
      const start = Math.max(1, page - 1);
      const end = Math.min(totalPages, start + maxVisible - 1);
      
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
       }, [page, totalPages]);

       if (loading) return <p>Loading...</p>;
       if (error) return <p className="text-red-500">Error: {error}</p>;



  return (
    <div className='container mx-auto px-4'>

      <ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-1 mt-15 '>
        {current.map(item => (
          <li key={item.id} className='p-2 mt-6'
          style={{backgroundColor: ''}} >
            <div className="relative w-[390px] h-[380px] mb-5 bg-card flex items-center ">
              <Image
                src={item.images[0]}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>
           
           <div>
            <Link className="font-medium hover:underline" href={`/products/${item.id}`}>
              {item.title}
            </Link>
           <div className="flex gap-2 items-center">
            <span className="line-through ">${item.price}</span>
            <span className="font-semibold text-black">
              ${((item.price - (item.price * item.discountPercentage) / 100)).toFixed(1)}
            </span>
          </div>
            </div>

          </li>
        ))}
        
      </ul>

      <div className="mt-15 text-center">
            
        <button
            onClick={prev}
            disabled={page === 1}
            className="p-2 bg-card text-text rounded-full disabled:opacity-50"
          >
          Prev
        </button>

          <div className="inline-flex space-x-2 mx-4">
            {visiblePages.map(num => (
            <button
            key={num}
            onClick={() => setPage(num)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition ${
              num === page
                ? 'bg-second text-white'
                : 'bg-card text-text hover:bg-blue-200'
            }`}
          >
            {num}
            </button>
            ))}
          </div>

        <button
          onClick={next}
          disabled={page === totalPages}
          className="p-2 bg-card text-text rounded-full disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  )
}





