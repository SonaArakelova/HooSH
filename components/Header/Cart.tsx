import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { useProducts } from '@/context/ProductContext';

type CartProps = {
  setShowCart: (value: boolean) => void;
}



export function Cart({ setShowCart }: CartProps) {

  const { orders, handleRemoveFromCart, increaseCartItemQuantity, decreaseCartItemQuantity } = useProducts();


  const totalPrice = orders.reduce((sum, item) => {
    const discountedPrice = item.price - (item.price * item.discountPercentage) / 100;
    return sum + discountedPrice * item.quantity;
  }, 0);


  return (

    (
      <div className="fixed top-15 right-1 w-110 max-h-[500px]  bg-white shadow-lg p-4 z-50 rounded-2xl">
        <div className="flex justify-between">
          <h2 className="text-xl mb-4 "> Your Cart </h2>
          <button onClick={() => setShowCart(false)}
            className="mb-4 text-2xl mr-5 cursor-pointer  hover:text-red-500" > X </button>
        </div>

        <div className="border mb-5 rounded-xl p-2 ">
          <div className="grid grid-cols-5 items-center justify-center bg-card text-sm font-semibold border-b px-2 py-2">
            <span>Image</span>
            <span>Title</span>
            <span>Qty</span>
            <span>Price</span>
            <span>Remove</span>


          </div>

          {orders.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="w-full max-h-[300px] overflow-scroll ">


              {orders.map(item => (
                <div
                  key={item.id}
                  className="grid grid-cols-5 items-center justify-center border-b px-2 py-2 text-sm "
                >
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="object-cover rounded"
                  />
                  <span className="truncate  hover:overflow-visible hover:-translate-y-11/12 ">{item.title}</span>
                  <div className="ml-5 flex items-center justify-center">
                    <button className="text-3xl mr-2 py-2  cursor-pointer"
                      onClick={() => decreaseCartItemQuantity(item.id)}

                    > - </button>
                    <span className="text-center text-lg ">{item.quantity}</span>
                    <button className="text-2xl ml-2 cursor-pointer"
                      onClick={() => increaseCartItemQuantity(item.id)}

                    > + </button>
                  </div>
                  <span className="text-right">
                    ${((item.price - (item.price * item.discountPercentage) / 100)).toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-lg hover:text-red-500"> X </button>
                </div>
              ))}

            </div>
          )}
        </div>
        <p className="ml-50 mt-2 hover:underline font-semibold mb-1">Total price: ${totalPrice.toFixed(2)}</p>

        <Link className="ml-64 hover:underline "
          href={'/cart'}>View Cart 🛒</Link>
      </div>
    )

  )
}
