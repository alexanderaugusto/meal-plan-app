import { TacoApiProps, FoodProps } from '../types/FoodType'
import { mapFoods } from './mapper/foodMapper'

const ROOT_API = process.env.REACT_APP_TACO_API_URL


async function getFoods(): Promise<FoodProps[]> {
  try {
    const response = await fetch(`${ROOT_API}/food`)
    const data: TacoApiProps[] = await response.json()
    return mapFoods(data)
  } catch(error) {
    const data = localStorage.getItem('taco-api-foods')
    return data ? JSON.parse(data) : []
  }
}

const foodService = {
  getFoods
}

export default foodService