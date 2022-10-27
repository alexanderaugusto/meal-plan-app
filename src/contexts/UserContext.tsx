import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'
import cacheStorage from '../services/cacheStorage'
import userService from '../services/userService'
import foodService from '../services/foodService'
import { UserProps } from '../types/UserType'

interface UserContextProps {
  user: UserProps
  setUser: React.Dispatch<React.SetStateAction<UserProps>>
  getUser: () => void
  firstLogin: boolean
  setFirstLogin: React.Dispatch<React.SetStateAction<boolean>>
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps)

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [firstLogin, setFirstLogin] = useState(false)

  const getUser = useCallback(() => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      userService.getById(userId)
        .then((user) => {
          if (user) {
            setUser(user)
            setFirstLogin(false)
          } else {
            setFirstLogin(true)
            localStorage.removeItem('userId')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setFirstLogin(true)
    }
  }, [])

  const getFoods = useCallback(async () => {
    const foods = await cacheStorage.get('taco-api-foods')
    if (!foods) {
      foodService.getFoods()
        .then((foods) => {
          cacheStorage.put('taco-api-foods', foods)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [])

  useEffect(() => {
    getUser()
    getFoods()
  }, [getUser, getFoods])

  return (
    <UserContext.Provider value={{ user, setUser, getUser, firstLogin, setFirstLogin }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}