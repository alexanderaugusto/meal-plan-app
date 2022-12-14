import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'
import mealService from '../services/mealService'
import { MealProps } from '../types/MealType'
import utilityHelper from '../utils/helper/utilityHelper'
interface MealContextProps {
  meals: MealProps[]
  currentMeal: MealProps
  foodEnergy: number
  setMeals: React.Dispatch<React.SetStateAction<MealProps[]>>
  setCurrentMeal: React.Dispatch<React.SetStateAction<MealProps>>
  getMeals: () => void
}

interface MealProviderProps {
  children: React.ReactNode
}

export const MealContext = createContext<MealContextProps>({} as MealContextProps)

export const MealProvider = ({ children }: MealProviderProps) => {
  const [meals, setMeals] = useState<MealProps[]>([])
  const [currentMeal, setCurrentMeal] = useState<MealProps>({} as MealProps)
  const [foodEnergy, setFoodEnergy] = useState<number>(0)

  const getMeals = useCallback(() => {
    mealService.getAll()
      .then((meals) => {
        setMeals(utilityHelper.orderArrayByProperty(meals, 'time', 'asc'))
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
    <MealContext.Provider value={{ meals, foodEnergy, currentMeal, setMeals, setCurrentMeal, getMeals }}>
      {children}
    </MealContext.Provider>
  )
}

export function useMeal() {
  return useContext(MealContext)
}