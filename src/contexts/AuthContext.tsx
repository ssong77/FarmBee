import type { ReactNode } from 'react'
import { createContext, useState, useContext, useEffect } from 'react'

export interface User {
  id: number
  userid: string
  name: string
  email?: string
}

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  login: (userid: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const isLoggedIn = Boolean(user)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const login = (userid: string) => {
    const fakeUser: User = { id: 1, userid, name: '홍길동' }
    setUser(fakeUser)
    localStorage.setItem('user', JSON.stringify(fakeUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
