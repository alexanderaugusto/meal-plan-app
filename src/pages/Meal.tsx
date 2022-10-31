import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import FoodList from '../components/Meal/FoodList'
import FoodQuantityModal from '../components/Meal/FoodQuantityModal'
import FoodNutrients from '../components/Meal/FoodNutrients'
import Header from '../components/Header'
import Input from '../components/Input'
import Page from '../components/Page'
import { useMeal } from '../contexts/MealContext'
import mealService from '../services/mealService'
import mealHelper from '../utils/helper/mealHelper'
import styles from './Meal.module.css'

interface FoodQuantityModalProps {
  open: boolean
  foodId: string
  foodName: string
  quantity: number
  unit: string
}

const MEAL_PARAM = 'id'

export default function Meal() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { getMeals, currentMeal, setCurrentMeal } = useMeal()
  const [foodQuantityModal, setFoodQuantityModal] = useState<FoodQuantityModalProps>({ open: false, foodId: '', foodName: '', quantity: 0, unit: '' })

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
    else if (!currentMeal.id) {
      setCurrentMeal(mealHelper.getDefaultMeal())
    }
  }, [searchParams, setCurrentMeal, currentMeal.id])

  function changeQuantity(foodId: string, newQuantity: number) {
    const newFoods = currentMeal.foods
      .map(food => {
        if (food.id === foodId) {
          food.quantity = newQuantity
        }
        return food
      })

    setCurrentMeal({ ...currentMeal, foods: newFoods })
  }

  function deleteFood(foodId: string) {
    const newFoods = currentMeal.foods.filter(food => food.id !== foodId)
    setCurrentMeal({ ...currentMeal, foods: newFoods })
  }

  function changeMeal(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setCurrentMeal({ ...currentMeal, [name]: value })
  }

  function saveMeal() {
    if (searchParams.get(MEAL_PARAM)) {
      mealService.update(currentMeal)
        .then(() => {
          getMeals()
          navigate('/')
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      mealService.add(currentMeal)
        .then(() => {
          getMeals()
          navigate('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  function deleteMeal() {
    mealService.remove(currentMeal.id)
      .then(() => {
        getMeals()
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function goToFoodPage() {
    const mealId = searchParams.get(MEAL_PARAM)
    navigate(`/meal/food${mealId ? `?${MEAL_PARAM}=${mealId}` : ''}`)
  }

  return (
    <Page className={styles.page} checkFirstLogin={true}>
      <Header
        className={styles.header}
        titleClassName={styles['header-title']}
        onBack={() => saveMeal()}
        title={searchParams.get(MEAL_PARAM) ? currentMeal.name : "Nova refeição"}
      >
        <div className={styles['header-actions']}>
          {searchParams.get(MEAL_PARAM) && (
            <button className="btn-icon" onClick={deleteMeal}>
              <Icon className={styles.icon} icon='trash' />
            </button>
          )}
        </div>
      </Header>
      <FoodQuantityModal
        open={foodQuantityModal.open}
        onClose={() => setFoodQuantityModal({ ...foodQuantityModal, open: false })}
        foodId={foodQuantityModal.foodId}
        foodName={foodQuantityModal.foodName}
        defaultQuantity={foodQuantityModal.quantity}
        unit={foodQuantityModal.unit}
        onSave={changeQuantity}
      />
      <section className={styles['meal-info']}>
        <h1>Informações</h1>
        <div className={styles.info}>
          <Input
            type="text"
            name="name"
            placeholder="Nome da refeição"
            value={currentMeal.name}
            onChange={changeMeal}
            maxLength={40}
          />
          <Input
            type="time"
            name="time"
            placeholder="Defina um horário para sua refeição"
            value={currentMeal.time}
            onChange={changeMeal}
          />
        </div>
      </section>
      <section className={styles['meal-foods']}>
        <h1>Alimentos</h1>
        <FoodList
          foods={currentMeal.foods}
          deleteFood={deleteFood}
          openFoodPage={() => goToFoodPage()}
          openFoodQuantityModal={(foodId, foodName, quantity, unit) => setFoodQuantityModal({ open: true, foodId, foodName, quantity, unit })}
        />
      </section>
      {currentMeal.foods && currentMeal.foods.length > 0 && (
        <section className={styles['meal-nutrients']}>
          <h1>Nutrientes</h1>
          <FoodNutrients foods={currentMeal.foods} />
        </section>
      )}
    </Page>
  )
}