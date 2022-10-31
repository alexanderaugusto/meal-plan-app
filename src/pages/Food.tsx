import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import FoodList from '../components/Food/FoodList'
import Header from '../components/Header'
import Icon from '../components/Icon'
import Input from '../components/Input'
import Page from '../components/Page'
import { useMeal } from '../contexts/MealContext'
import cacheStorage from '../services/cacheStorage'
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
        cacheStorage.put('taco-api-foods', foods)
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

  function search(name: string, searchCriteria: string) {
    name = name.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').toLowerCase()
    searchCriteria = searchCriteria.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').toLowerCase()

    const splittedSearchCriteria = searchCriteria.split(' ')

    return splittedSearchCriteria.every(criteria => name.includes(criteria))
  }

  function searchFoods(searchCriteria: string) {
    const filteredFoods = originalTacoApiFoods.filter(food => search(food.name, searchCriteria))
    setTacoApiFoods(filteredFoods)
  }

  function onBack() {
    navigate(`/meal?id=${searchParams.get(MEAL_PARAM)}`)
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
        <Input
          type="text"
          placeholder="Nome do alimento"
          onChange={(e) => searchFoods(e.target.value)}
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