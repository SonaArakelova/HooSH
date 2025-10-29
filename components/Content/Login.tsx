'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext' 

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const { login, loading, error } = useAuth() 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()


    const result = await login(username, password)

    if (result) {
      router.push('/add_user') 
    }
  }

  return (
    <div className=" flex mt-30  justify-center min-h-screen bg-custom">
      <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl shadow-md w-full max-w-md max-h-[300px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-second text-text py-2 rounded-lg hover:border "
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
    </div>
  )
}
