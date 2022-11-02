import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import FoodList from '../components/Food/FoodList'
import FoodSearch from '../components/Food/FoodSearch'
import Header from '../components/Header'
import Icon from '../components/Icon'
import Page from '../components/Page'
import { useMeal } from '../contexts/MealContext'
import foodService from '../services/foodService'
import mealService from '../services/mealService'
import { FoodProps } from '../types/FoodType'
import styles from './Food.module.css'

const MEAL_PARAM = 'id'

export default function Food() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { currentMeal, setCurrentMeal } = useMeal()
  const [originalTacoApiFoods, setOriginalTacoApiFoods] = useState<FoodProps[]>([])
  const [tacoApiFoods, setTacoApiFoods] = useState<FoodProps[]>([])
  const [selecteds, setSelecteds] = useState<number[]>([])

  useEffect(() => {
    const mealId = searchParams.get(MEAL_PARAM)

    if (mealId && !currentMeal.id) {
      mealService.getById(mealId)
        .then((meal) => {
          if (meal) {
            setCurrentMeal(meal)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [searchParams, currentMeal.id, setCurrentMeal])

  useEffect(() => {
    foodService.getFoods()
      .then((foods) => {
        setTacoApiFoods(foods)
        setOriginalTacoApiFoods(foods)
        localStorage.setItem('taco-api-foods', JSON.stringify(foods))
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    if (currentMeal.foods) {
      setSelecteds(currentMeal.foods.map((food) => food.tacoApiId))
    } else {
      setSelecteds([])
    }
  }, [currentMeal.foods])

  function onSelectFood(foodId: string, quantity: number) {
    const food = originalTacoApiFoods.filter((food) => food.tacoApiId === Number(foodId))[0]
    const newFood = { ...food, quantity }
    const newFoods = [...currentMeal.foods, newFood]
    setCurrentMeal(current => ({ ...current, foods: newFoods }))
  }

  function onRemoveFood(foodId: string) {
    const newFoods = currentMeal.foods.filter((food) => food.tacoApiId !== Number(foodId))
    setCurrentMeal({ ...currentMeal, foods: newFoods })
  }

  function onBack() {
    const mealId = searchParams.get(MEAL_PARAM)
    navigate(`/meal${mealId ? `?${MEAL_PARAM}=${mealId}` : ''}`)
  }

  return (
    <Page className={styles.page} checkFirstLogin={true}>
      <Header
        className={styles.header}
        title="Buscar alimentos"
      >
        <div className={styles['header-actions']}>
          <button className="btn-icon" onClick={onBack}>
            <Icon className={styles.icon} icon='times' />
          </button>
        </div>
      </Header>
      <section className={styles.search}>
        <FoodSearch
          originalFoods={originalTacoApiFoods}
          selecteds={selecteds}
          onSearch={foods => {
            const newFoods = foods.map((food) => food)
            setTacoApiFoods(newFoods)
          }}
        />
      </section>
      <section className={styles.foods}>
        <FoodList
          foods={tacoApiFoods}
          selecteds={selecteds}
          onSelectFood={onSelectFood}
          onRemoveFood={onRemoveFood}
        />
      </section>
    </Page>
  )
}