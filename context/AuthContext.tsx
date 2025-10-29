'use client'

import React, {
      createContext, 
      useContext, 
      useState,
      ReactNode } from 'react'

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  image: string
  age: number
  gender: string
  phone: string
  username: string
  birthDate: string
  role: string
  token?: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  error: string | null
  login: (username: string, password: string) => Promise<User | null>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>({
  user: null,
  loading: false,
  error: null,
  login: async () => null,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  

 const login = async (username: string, password: string) => {
  setLoading(true)
  setError(null)


  try {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Login failed')
    }

    setUser(data)
    localStorage.setItem('token', data.token)
    return data
  }  catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message)
  } else {
    setError('An unexpected error occurred')
  }
  return null
}
   finally {
    setLoading(false)
  }
}


  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }



  return (
    <AuthContext.Provider 
    value={{ 
        user, 
        loading, 
        error, 
        login, 
        logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
