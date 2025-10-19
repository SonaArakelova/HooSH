'use client'
import Link from "next/link"
import {BurgerMenu} from "./BurgerMenu"

export function Header() {
  return (
    <header 
      className='bg-custom shadow-md sticky top-0 z-100  
      mx-auto  sm:px-6 lg:px-8 '>
    <div className="flex justify-between items-center h-20 px-20 ">
        <div className="flex gap-15">

            <h1 className="text-4xl">HooSH</h1>
            <BurgerMenu/>
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
               Loge in
            </Link>

            <Link href={'/cart'}
             className="mr-3 hover:underline">
               Cart 🛒
            </Link>
           
            
        </div>

      </div>
    </header>
  )
}
