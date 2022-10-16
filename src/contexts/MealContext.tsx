import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'
import mealService from '../services/mealService'
import { MealProps } from '../types/MealType'
import helper from '../utils/helper'

// import MEALS from '../assets/meals.json'

interface MealContextProps {
  meals: MealProps[]
  foodEnergy: number
  baseEnergy: number
  setMeals: React.Dispatch<React.SetStateAction<MealProps[]>>
  setBaseEnergy: React.Dispatch<React.SetStateAction<number>>
  getMeals: () => void
}

interface MealProviderProps {
  children: React.ReactNode;
}

export const MealContext = createContext<MealContextProps>({} as MealContextProps)

export const MealProvider = ({ children }: MealProviderProps) => {
  const [meals, setMeals] = useState<MealProps[]>([])
  const [baseEnergy, setBaseEnergy] = useState<number>(1500)
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
    // mealService.add(MEALS[0])
    // mealService.add(MEALS[1])
    // mealService.add(MEALS[2])
    getMeals()
  }, [getMeals])

  useEffect(() => {
    const foodEnergy = meals.reduce((acc, meal) => (acc + meal.totalEnergy), 0)
    setFoodEnergy(foodEnergy)
  }, [meals])

  return (
    <MealContext.Provider value={{ meals, foodEnergy, baseEnergy, setMeals, setBaseEnergy, getMeals }}>
      {children}
    </MealContext.Provider>
  )
}

export function useMeal() {
  return useContext(MealContext)
}