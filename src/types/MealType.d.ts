import { FoodProps } from './FoodType'

export interface MealProps {
  id?: string
  name: string
  time: string
  totalEnergy: number
  totalProtein: number
  totalCarbohydrate: number
  totalFat: number
  icon: string
  color: string
  foods: FoodProps[]
}