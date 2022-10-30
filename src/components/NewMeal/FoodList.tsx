import Card from '../Card'
import Icon from '../Icon'
import helper from '../../utils/helper'
import { FoodProps } from '../../types/FoodType'
import styles from './FoodList.module.css'

interface FoodsProps {
  foods: FoodProps[]
  deleteFood: (foodId: string) => void
  openFoodQuantityModal: (foodId: string, foodName: string, quantity: number, unit: string) => void
  openFoodModal: () => void
}

export default function FoodList({ foods = [], deleteFood, openFoodModal, openFoodQuantityModal }: FoodsProps) {
  return (
    <ul className={styles.foods}>
      {foods.map(food => (
        <li key={food.id}>
          <Card className={styles['food-card']}>
            <div className={styles['food-description']}>
              <h3>{food.name}</h3>
              <h4>{`${food.quantity} ${food.baseQuantity.unit}`}</h4>
              <p>{`${helper.formatNumber(helper.calculateNutrient(food.attributes.energy.quantity, food.quantity, food.baseQuantity.quantity), 0)} ${food.attributes.energy.unit}`}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles['edit-food']} onClick={() => openFoodQuantityModal(food.id, food.name, food.quantity, food.baseQuantity.unit)}>
                <Icon className={styles.icon} icon="pen" />
              </button>
              <button className={styles['delete-food']} onClick={() => deleteFood(food.id)}>
                <Icon className={styles.icon} icon="trash" />
              </button>
            </div>
          </Card>
        </li>
      ))}
      <li>
        <Card className={`${styles['food-card']} ${styles['new-food-card']}`} onClick={openFoodModal}>
          <Icon className={`${styles['icon']} ${styles['icon-add']}`} icon='plus' />
          <h3>Novo alimento</h3>
        </Card>
      </li>
    </ul>
  )
}