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
  return helper.calculateNutrients(meal)
}

function replaceEmptyValues(meal: MealProps) {
  meal.name = meal.name === '' ? 'Minha Refeição' : meal.name
  return meal
}

function add(meal: MealProps) {
  meal = replaceIds(meal)
  meal = calculateTotal(meal)
  meal = replaceEmptyValues(meal)
  return db.meal.add(meal)
}

function update(meal: MealProps) {
  meal = replaceIds(meal)
  meal = calculateTotal(meal)
  meal = replaceEmptyValues(meal)
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

