import { db } from '../config/db'
import { MealProps } from '../types/MealType'
import helper from '../utils/helper'

function replaceIds(meal: MealProps) {
  meal.id = meal.id.includes('temp') ? helper.generateUUID() : meal.id
  meal.foods = meal.foods.map((food) => {
    food.id = food.id.includes('temp') ? helper.generateUUID() : food.id
    return food
  })
  return meal
}

function calculateTotal(meal: MealProps) {
  meal.totalProtein = meal.foods.reduce((acc, food) => acc + (food.attributes.protein.quantity * food.quantity), 0)
  meal.totalCarbohydrate = meal.foods.reduce((acc, food) => acc + (food.attributes.carbohydrate.quantity * food.quantity), 0)
  meal.totalFat = meal.foods.reduce((acc, food) => acc + (food.attributes.fat.quantity * food.quantity), 0)
  meal.totalEnergy = meal.foods.reduce((acc, food) => acc + (food.attributes.energy.quantity * food.quantity), 0)
  return meal
}

function add(meal: MealProps) {
  meal = replaceIds(meal)
  meal = calculateTotal(meal)
  return db.meal.add(meal)
}

function update(meal: MealProps) {
  meal = replaceIds(meal)
  meal = calculateTotal(meal)
  return db.meal.update(meal.id, meal)
}

function remove(id: string) {
  return db.meal.delete(id)
}

function getById(id: string) {
  return db.meal.get(id)
}

function getAll() {
  return db.meal.toArray()
}

const mealService = {
  add,
  update,
  remove,
  getById,
  getAll
}

export default mealService

