'use client'
import React from 'react'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'



export function AddUser() {
    const{user, loading } = useAuth();
      const router = useRouter();


    useEffect(()=>{
        if(!user){
            router.push('/login')
        }
    }, [loading,user,router]);

    if(loading) return <p>Loading ...</p>



  return (
    <div className='container mx-auto h-[400px] py-5 px-2'> Welcome To Private Page  </div>
  )
}
