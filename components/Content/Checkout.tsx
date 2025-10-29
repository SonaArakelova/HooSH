'use client'
import React from 'react'
import { useProducts } from '@/context/ProductContext' 
import Image from 'next/image';
import Link from 'next/link';

export function Checkout() {
    const {orders,handleRemoveFromCart,increaseCartItemQuantity,decreaseCartItemQuantity,} = useProducts();


  const totalPrice = orders.reduce((sum, item) => {
    const discountedPrice = item.price - (item.price * item.discountPercentage) / 100;
    return sum + discountedPrice * item.quantity;
  }, 0);

  const totalQuantity = orders.reduce((sum, item) => sum + item.quantity, 0);



  return (
    <div className='container mx-auto px-4 mt-10'>

        <div className=" bg-card shadow-lg p-6 z-50 py-7 rounded-2xl">
           <h1 className="text-2xl font-bold mb-4 "> Checkout</h1>
           <h2 className='text-lg font-bold'>{totalQuantity} products in your cart</h2>
                
        
                <div className="border mb-5 rounded-xl p-2 mt-1">
                  <div className="grid grid-cols-5 items-center justify-center bg-second text-lg font-semibold border-b px-20 py-4 gap-50">
                    <span>Image</span>
                    <span>Title</span>
                    <span>Qty</span>
                    <span>Price</span>
                    <span>Remove</span>
                  </div>
        
                  {orders.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                  ) : (
                    <div className="w-full ">
        
        
                      {orders.map(item => (
                        <div
                          key={item.id}
                          className="grid grid-cols-5 items-center justify-center border-b px-2 py-2 text-sm "
                        >
                          <Image
                            src={item.images[0]}
                            alt={item.title}
                            width={150}
                            height={100}
                            className="object-cover rounded"
                          />

                          <Link href={`/products/${item.id}`}
                          className='hover:underline text-xl'>{item.title}</Link>
                          <div className="ml-5 flex items-center justify-center">
                            <button className="text-4xl mr-2 py-2  cursor-pointer hover:text-red-400"
                              onClick={() => decreaseCartItemQuantity(item.id)}
        
                            > - </button>
                            <span className="text-center text-2xl mx-3">{item.quantity}</span>
                            <button className="text-2xl ml-2 cursor-pointer hover:text-red-400"
                              onClick={() => increaseCartItemQuantity(item.id)}
        
                            > + </button>
                          </div>
                          <span className=' text-center text-lg'>
                            ${((item.price - (item.price * item.discountPercentage) / 100)).toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-xl hover:text-red-500 ml-20"> X </button>
                        </div>
                      ))}
        
                    </div>
                  )}
                </div>
                <p className=" mt-2 hover:underline font-semibold mb-1 text-right text-xl">Total price: ${totalPrice.toFixed(2)}</p>
                <p className='hover:underline font-semibold  text-right text-xl'>
                <Link 
                href={'https://banking.idram.am/Account/login?returnurl=pages/transfer-card-to-card&_gl=1*1urprb5*_gcl_au*MTQwMDM1ODA5MS4xNzYxNzU3NDE3'}
                >
                 You can pay here </Link>
                 </p>


         </div>

    </div>
    
  )
}
