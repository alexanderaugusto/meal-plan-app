import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Food from '../components/NewMeal/Food'
import Input from '../components/Input/Input'
import Header from '../components/Header'
import helper from '../utils/helper'
import { useMeal } from '../contexts/MealContext'
import mealService from '../services/mealService'
import { MealProps } from '../types/MealType'
import styles from './NewMeal.module.css'

const MEAL_PARAM = 'id'

export default function NewMeal() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { getMeals } = useMeal()
  const [meal, setMeal] = useState<MealProps>(helper.getDefaultMeal())

  useEffect(() => {
    const mealId = searchParams.get(MEAL_PARAM)

    if (mealId) {
      mealService.getById(mealId)
        .then((meal) => {
          if (meal) {
            setMeal(meal)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [searchParams])

  function changeQuantity(foodId: string, newQuantity: number) {
    const newFoods = meal.foods
      .map(food => {
        if (food.id === foodId) {
          food.quantity = newQuantity
        }
        return food
      })
      .filter(food => food.quantity > 0)

    setMeal({ ...meal, foods: newFoods })
  }

  function changeMeal(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setMeal({ ...meal, [name]: value })
  }

  function saveMeal() {
    if (searchParams.get(MEAL_PARAM)) {
      mealService.update(meal)
        .then(() => {
          getMeals()
          navigate('/')
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      mealService.add(meal)
        .then(() => {
          getMeals()
          navigate('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  function deleteMeal(id: string) {
    mealService.remove(id)
      .then(() => {
        getMeals()
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className={styles.page}>
      <Header
        to="/"
        title={searchParams.get(MEAL_PARAM) ? meal.name : "Nova refeição"}
        actionEnabled={searchParams.get(MEAL_PARAM) ? true : false}
        action={() => deleteMeal(meal.id)}
        actionIcon="trash"
      />
      <section className={styles['meal-info']}>
        <h1>Informações</h1>
        <div className={styles.info}>
          <Input
            type="text"
            name="name"
            placeholder="Nome da refeição"
            value={meal.name}
            onChange={changeMeal}
          />
          <Input
            type="time"
            name="time"
            placeholder="Defina um horário para sua refeição"
            value={meal.time}
            onChange={changeMeal}
          />
        </div>
      </section>
      <section className={styles['meal-foods']}>
        <h1>Alimentos</h1>
        <Food foods={meal.foods} changeQuantity={(foodId, newQuantity) => changeQuantity(foodId, newQuantity)} />
      </section>
      <section className={styles['meal-actions']}>
        <button className={styles['btn-submit']} onClick={saveMeal}>Salvar</button>
      </section>
    </div>
  )
}