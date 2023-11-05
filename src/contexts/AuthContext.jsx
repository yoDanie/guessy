import { useState, useEffect, createContext, useContext } from 'react'
import { supabase } from '../supabaseClient'

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [session])

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
}

export default AuthProvider
