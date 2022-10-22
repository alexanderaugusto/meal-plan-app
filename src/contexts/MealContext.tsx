import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'
import mealService from '../services/mealService'
import { MealProps } from '../types/MealType'
import helper from '../utils/helper'
interface MealContextProps {
  meals: MealProps[]
  foodEnergy: number
  setMeals: React.Dispatch<React.SetStateAction<MealProps[]>>
  getMeals: () => void
}

interface MealProviderProps {
  children: React.ReactNode;
}

export const MealContext = createContext<MealContextProps>({} as MealContextProps)

export const MealProvider = ({ children }: MealProviderProps) => {
  const [meals, setMeals] = useState<MealProps[]>([])
  const [foodEnergy, setFoodEnergy] = useState<number>(0)

  const getMeals = useCallback(() => {
    mealService.getAll()
      .then((meals) => {
        setMeals(helper.orderArrayByProperty(meals, 'time', 'asc'))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    getMeals()
  }, [getMeals])

  useEffect(() => {
    const foodEnergy = meals.reduce((acc, meal) => (acc + meal.totalEnergy), 0)
    setFoodEnergy(foodEnergy)
  }, [meals])

  return (
    <MealContext.Provider value={{ meals, foodEnergy, setMeals, getMeals }}>
      {children}
    </MealContext.Provider>
  )
}

export function useMeal() {
  return useContext(MealContext)
}