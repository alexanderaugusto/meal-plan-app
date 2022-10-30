import utilityHelper from './utilityHelper'
import { COLORS, ICONS } from '../constants'
import { MealProps } from '../../types/MealType'

function calculateNutrient(nutrient: number, quantity: number, baseQuantity: number) {
  return (nutrient * quantity) / baseQuantity
}

function calculateMealNutrients(meal: MealProps) {
  meal.totalProtein = meal.foods.reduce((total, food) => total + calculateNutrient(food.attributes.protein.quantity, food.quantity, food.baseQuantity.quantity), 0)
  meal.totalCarbohydrate = meal.foods.reduce((total, food) => total + calculateNutrient(food.attributes.carbohydrate.quantity, food.quantity, food.baseQuantity.quantity), 0)
  meal.totalFat = meal.foods.reduce((total, food) => total + calculateNutrient(food.attributes.fat.quantity, food.quantity, food.baseQuantity.quantity), 0)
  meal.totalEnergy = meal.foods.reduce((total, food) => total + calculateNutrient(food.attributes.energy.quantity, food.quantity, food.baseQuantity.quantity), 0)
  return meal
}

function getDefaultMeal(): MealProps {
  return {
    id: utilityHelper.generateUUID(),
    name: '',
    time: utilityHelper.getTimeNow(),
    totalEnergy: 0,
    totalProtein: 0,
    totalCarbohydrate: 0,
    totalFat: 0,
    icon: getRandomIcon(),
    color: getRandomColor(),
    foods: [],
  }
}

function getRandomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

function getRandomIcon(): string {
  return ICONS[Math.floor(Math.random() * ICONS.length)]
}

const mealHelper = {
  calculateNutrient,
  calculateMealNutrients,
  getDefaultMeal,
  getRandomColor,
  getRandomIcon
}

export default mealHelper