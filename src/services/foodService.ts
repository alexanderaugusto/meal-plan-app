import { TacoApiProps, FoodProps } from '../types/FoodType'
import { mapFood, mapFoods } from './mapper/foodMapper'

const ROOT_API = process.env.REACT_APP_TACO_API_URL


async function getFoods(): Promise<FoodProps[]> {
  const response = await fetch(`${ROOT_API}/food`)
  const data: TacoApiProps[] = await response.json()
  return mapFoods(data)
}

async function getFoodById(id: number): Promise<FoodProps> {
  const response = await fetch(`${ROOT_API}/food/${id}`)
  const data: TacoApiProps = await response.json()
  return mapFood(data)
}

const foodService = {
  getFoods,
  getFoodById
}

export default foodService