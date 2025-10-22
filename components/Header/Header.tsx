'use client'
import Link from "next/link"
import { BurgerMenu } from "./BurgerMenu"
import { useProducts } from "@/context/ProductContext"
import { useState } from "react"
import Image from "next/image"


export function Header() {
  const [showCart, setShowCart] = useState(false);
  const { orders, handleRemoveFromCart, increaseCartItemQuantity, decreaseCartItemQuantity } = useProducts();



  const totalPrice = orders.reduce((sum, item) => {
    const discountedPrice = item.price - (item.price * item.discountPercentage) / 100;
    return sum + discountedPrice * item.quantity;
  }, 0);

  const totalQuantity = orders.reduce((sum, item) => sum + item.quantity, 0);



  return (
    <header
      className='bg-custom shadow-md sticky top-0 z-100  
      mx-auto  sm:px-6 lg:px-8 '>
      <div className="flex justify-between items-center h-20 px-20 ">
        <div className="flex gap-15">

          <h1 className="text-4xl">HooSH</h1>
          <BurgerMenu />
        </div>


        <form>
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-1 outline-0 "
          />

        </form>


        <div className='links  text-l'>
          <Link href={'/'}
            className="mr-3 hover:underline">
            Home
          </Link>

          <Link href={'/logein'}
            className="mr-3 hover:underline">
            Sign up
          </Link>

          <button onClick={() => setShowCart(true)} className="mr-3 hover:underline">
            {totalQuantity <= 0
              ? 'Cart 🛒' : `🛒 ${totalQuantity} items - $${totalPrice.toFixed(2)}`}
          </button>

          {showCart && (
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


                    {orders.map(order => (
                      <div
                        key={order.id}
                        className="grid grid-cols-5 items-center justify-center border-b px-2 py-2 text-sm "
                      >
                        <Image
                          src={order.images[0]}
                          alt={order.title}
                          width={50}
                          height={50}
                          className="object-cover rounded"
                        />
                        <span className="truncate  hover:overflow-visible hover:-translate-y-11/12 ">{order.title}</span>
                        <div className="ml-5 flex items-center justify-center">
                          <button className="text-3xl mr-2 py-2  cursor-pointer"
                            onClick={() => decreaseCartItemQuantity(order)}

                          > - </button>
                          <span className="text-center text-lg ">{order.quantity}</span>
                          <button className="text-2xl ml-2 cursor-pointer"
                            onClick={() => increaseCartItemQuantity(order)}

                          > + </button>
                        </div>
                        <span className="text-right">
                          ${((order.price - (order.price * order.discountPercentage) / 100)).toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleRemoveFromCart(order)}
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
          )}

        </div>

      </div>
    </header>
  )
}
