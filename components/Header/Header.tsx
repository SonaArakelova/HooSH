'use client'
import Link from "next/link"
import { BurgerMenu } from "./BurgerMenu"
import { useProducts } from "@/context/ProductContext"
import { useState } from "react"
import { Cart } from "./Cart"
import { useAuth } from "@/context/AuthContext" 



export function Header() {
  const [showCart, setShowCart] = useState(false);
  const { orders } = useProducts();
  const { user, logout } = useAuth() 



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

          {user ? (
            <button onClick={logout} className="mr-3 hover:underline">Log out</button>
          ) : (
            <Link href="/login" className="mr-3 hover:underline">Log in</Link>
          )}

          <button onClick={() => setShowCart(true)} className="mr-3 hover:underline">
            {totalQuantity <= 0
              ? 'Cart 🛒' : `🛒 ${totalQuantity} items - $${totalPrice.toFixed(2)}`}
          </button>

          {showCart && <Cart setShowCart={setShowCart}  /> }

        </div>

      </div>
    </header>
  )
}
