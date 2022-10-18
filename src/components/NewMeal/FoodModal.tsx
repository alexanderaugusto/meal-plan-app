import { useEffect, useState } from 'react'
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
  const [tacoApiFoods, setTacoApiFoods] = useState<FoodProps[]>([])
  const [selecteds, setSelecteds] = useState<number[]>([])

  useEffect(() => {
    foodService.getFoods()
      .then((foods) => {
        setTacoApiFoods(foods)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

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
    const newFoods = tacoApiFoods
      .filter(food => isSelected(food.tacoApiId))
      .map(food => {
        const existingFood = foods.find(f => f.tacoApiId === food.tacoApiId)
        return existingFood ? existingFood : { ...food, quantity: 1 }
      })
    onSave(newFoods)
    close()
  }

  function close() {
    setSelecteds([])
    onClose()
  }

  return (
    <Modal className={styles['food-modal']} open={open} title="Buscar alimentos" onClose={close}>
      <div className={styles.search}>
        <TextInput placeholder="Nome do alimento" />
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