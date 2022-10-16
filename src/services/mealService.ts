import { db } from '../config/db'
import { MealProps } from '../types/MealType'
import helper from '../utils/helper'

function replaceIds(meal: MealProps) {
  meal.id = meal.id || helper.generateUUID()
  meal.foods = meal.foods.map((food) => {
    food.id = food.id || helper.generateUUID()
    return food
  })
  return meal
}

function add(meal: MealProps) {
  return db.meal.add(replaceIds(meal))
}

function update(meal: MealProps) {
  return db.meal.update(meal.id, replaceIds(meal))
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

