import { useCallback, useEffect, useState } from 'react'
import foodService from '../../services/foodService'
import { FoodProps } from '../../types/FoodType'
import helper from '../../utils/helper'
import CheckBoxInput from '../Input/CheckBoxInput'
import TextInput from '../Input/TextInput'
import Modal from '../Modal'
import styles from './FoodModal.module.css'

interface FoodModalProps {
  open: boolean
  onClose: () => void
  foods: FoodProps[]
  onSave: (foods: FoodProps[]) => void
}

export default function FoodModal({ open, onClose, onSave, foods }: FoodModalProps) {
  const [originalTacoApiFoods, setOriginalTacoApiFoods] = useState<FoodProps[]>([])
  const [tacoApiFoods, setTacoApiFoods] = useState<FoodProps[]>([])
  const [selecteds, setSelecteds] = useState<number[]>([])

  const getFoods = useCallback(() => {
    foodService.getFoods()
      .then((foods) => {
        setTacoApiFoods(foods)
        setOriginalTacoApiFoods(foods)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    getFoods()
  }, [getFoods])

  useEffect(() => {
    setSelecteds(foods.map((food) => food.tacoApiId))
  }, [foods, open])

  function changeSelected(foodId: number) {
    if (selecteds.includes(foodId)) {
      setSelecteds(selecteds.filter(id => id !== foodId))
    } else {
      setSelecteds([...selecteds, foodId])
    }
  }

  function isSelected(foodId: number) {
    return selecteds.includes(foodId)
  }

  function saveFoods() {
    const newFoods = originalTacoApiFoods
      .filter(food => isSelected(food.tacoApiId))
      .map(food => {
        const existingFood = foods.find(f => f.tacoApiId === food.tacoApiId)
        return existingFood ? existingFood : { ...food, quantity: food.baseQuantity.quantity }
      })
    onSave(newFoods)
    close()
  }

  function close() {
    setSelecteds([])
    onClose()
  }

  function searchFoods(search: string) {
    const filteredFoods = originalTacoApiFoods.filter(food => food.name.toLowerCase().includes(search.toLowerCase()))
    setTacoApiFoods(filteredFoods)
  }

  return (
    <Modal className={styles['food-modal']} open={open} title="Buscar alimentos" onClose={close}>
      <div className={styles.search}>
        <TextInput
          placeholder="Nome do alimento"
          onChange={(e) => searchFoods(e.target.value)}
        />
      </div>
      <ul className={styles.foods}>
        {tacoApiFoods.map((food) => {
          return (
            <li key={food.tacoApiId} onClick={() => changeSelected(food.tacoApiId)}>
              <div className={styles.description}>
                <h3>{food.name}</h3>
                <h4>{`${food.baseQuantity.quantity} ${food.baseQuantity.unit}`}</h4>
                <p>{`${helper.formatNumber(food.attributes.energy.quantity, 0)} ${food.attributes.energy.unit}`}</p>
              </div>
              <CheckBoxInput checked={isSelected(food.tacoApiId)} />
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