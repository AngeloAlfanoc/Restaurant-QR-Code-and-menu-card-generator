import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../../services/firebase'

export const UserContext = createContext({ user: null })


const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user)
        setLoading(false)
    })
    return unsubscribe
  }, [])


  return (
    <UserContext.Provider value={{user}}>
       {!loading && children}
    </UserContext.Provider>
  )
}
export default UserProvider
