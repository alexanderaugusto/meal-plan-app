import { useCallback, useEffect, useState } from 'react'
import Input from '../Input'
import FoodQuantityModal from './FoodQuantityModal'
import Modal from '../Modal'
import cacheStorage from '../../services/cacheStorage'
import foodService from '../../services/foodService'
import utilityHelper from '../../utils/helper/utilityHelper'
import { FoodProps } from '../../types/FoodType'
import styles from './FoodModal.module.css'

interface FoodModalProps {
  open: boolean
  onClose: () => void
  foods: FoodProps[]
  onSave: (foods: FoodProps[]) => void
}

interface FoodQuantityModalProps {
  open: boolean
  foodId: string
  foodName: string
  quantity: number
  unit: string
}

export default function FoodModal({ open, onClose, onSave, foods }: FoodModalProps) {
  const [originalTacoApiFoods, setOriginalTacoApiFoods] = useState<FoodProps[]>([])
  const [tacoApiFoods, setTacoApiFoods] = useState<FoodProps[]>([])
  const [selecteds, setSelecteds] = useState<number[]>([])
  const [foodQuantityModal, setFoodQuantityModal] = useState<FoodQuantityModalProps>({ open: false, foodId: '', foodName: '', quantity: 0, unit: '' })

  const getFoods = useCallback(() => {
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
    getFoods()
  }, [getFoods, open])

  useEffect(() => {
    setSelecteds(foods.map((food) => food.tacoApiId))
  }, [foods, open])

  function changeSelected(food: FoodProps) {
    if (selecteds.includes(food.tacoApiId)) {
      setSelecteds(selecteds.filter(id => id !== food.tacoApiId))
    } else {
      setFoodQuantityModal({ open: true, foodId: food.tacoApiId.toString(), foodName: food.name, quantity: food.baseQuantity.quantity, unit: food.baseQuantity.unit })
    }
  }

  function selectFood(foodId: string, quantity: number) {
    setSelecteds([...selecteds, Number(foodId)])

    const newFoods = tacoApiFoods.map(food => {
      if (food.tacoApiId === Number(foodId)) {
        food.quantity = quantity
      }
      return food
    })

    setTacoApiFoods(newFoods)
  }

  function isSelected(foodId: number) {
    return selecteds.includes(foodId)
  }

  function saveFoods() {
    const newFoods = originalTacoApiFoods
      .filter(food => isSelected(food.tacoApiId))
      .map(food => {
        const existingFood = foods.find(f => f.tacoApiId === food.tacoApiId)
        return existingFood ? existingFood : { ...food, quantity: food.quantity }
      })
    console.log(newFoods)
    onSave(newFoods)
    close()
  }

  function close() {
    setSelecteds([])
    onClose()
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

  return (
    <Modal className={styles['food-modal']} open={open} title="Buscar alimentos" onClose={close}>
      <FoodQuantityModal
        open={foodQuantityModal.open}
        onClose={() => setFoodQuantityModal({ ...foodQuantityModal, open: false })}
        foodId={foodQuantityModal.foodId}
        foodName={foodQuantityModal.foodName}
        defaultQuantity={foodQuantityModal.quantity}
        unit={foodQuantityModal.unit}
        onSave={selectFood}
      />

      <div className={styles.search}>
        <Input
          type="text"
          placeholder="Nome do alimento"
          onChange={(e) => searchFoods(e.target.value)}
        />
      </div>
      <ul className={styles.foods}>
        {tacoApiFoods.map((food) => {
          return (
            <li key={food.tacoApiId} onClick={() => changeSelected(food)}>
              <div className={styles.description}>
                <h3>{food.name}</h3>
                <h4>{`${food.baseQuantity.quantity} ${food.baseQuantity.unit}`}</h4>
                <p>{`${utilityHelper.formatNumber(food.attributes.energy.quantity, 0)} ${food.attributes.energy.unit}`}</p>
              </div>
              <Input type="checkbox" checked={isSelected(food.tacoApiId)} />
            </li>
          )
        })}
      </ul>
      <div className={styles.actions}>
        <button onClick={saveFoods}>Salvar</button>
      </div>
    </Modal>
  )
}