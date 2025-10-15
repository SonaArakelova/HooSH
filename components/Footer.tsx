'use client';

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-softgreen border-t border-green-320 mt-20">
      <div>
        
          <div className="space-y-0 mt-10 px-20">
            <h3 className="text-2xl font-stretch-100% mb-4 tracking-wider">DON`T BE SHY, </h3>
            <p className="text-2xl font-stretch-100% mb-4 tracking-wider ">JUST SAY HI!</p>
          </div>

        <div className=" mx-auto py-13 px-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">

          <div>
           <h3 className="text-lg font-semibold mb-4">Armenia, Yerevan</h3>
            <ul className="space-y-2">
              <li>
                <Link href='https://www.google.com/maps/place/%D4%B5%D6%80%D6%87%D5%A1%D5%B6+%D5%84%D5%B8%D5%AC/@40.1552727,44.4949656,17z/data=!3m1!4b1!4m6!3m5!1s0x406abc114d7c1383:0xf78cc13a3d926457!8m2!3d40.1552728!4d44.4998312!16s%2Fm%2F010fc6q_?entry=ttu&g_ep=EgoyMDI1MTAxMy4wIKXMDSoASAFQAw%3D%3Dhttps://www.instagram.com" target="_blank" className="hover:underline text-blue-700'
                className="hover:underline text-text">
                  Yerevan mall, 2-nd floor
                </Link>
              </li>
             
            </ul>

          </div>


          <div>
           <h3 className="text-lg font-semibold mb-4">Contacts</h3>

            <ul className="">
              <li><span className="font-bold">Email:</span> support@HooSH.com</li>
              <li><span className="font-bold">Phone:</span> +374 46 5677788</li>
            </ul>
          </div>

      


          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://www.instagram.com" target="_blank"    className="hover:underline text-text font-bold text-[1rem]">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="https://www.facebook.com" target="_blank"    className="hover:underline text-text font-bold text-[1rem]">
                  Facebook
                </Link>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-4">Careers</h3>
            <p className="mb-2">We’re always looking for passionate people to join our team.</p>
            <Link href="/careers"    className="hover:underline text-text">
              View Open Positions →
            </Link>
          </div>
        </div>

      </div>

      <div className="text-center text-sm p-4 border-t border-black">
        © {new Date().getFullYear()} HooSH Store. All rights reserved.
      </div>

    </footer>
  );
}
