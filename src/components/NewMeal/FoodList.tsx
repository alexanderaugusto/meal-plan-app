import Card from '../Card'
import Icon from '../Icon'
import styles from './Food.module.css'
import { FoodProps } from '../../types/FoodType'
import helper from '../../utils/helper'
import Input from '../Input/Input'

interface FoodsProps {
  foods: FoodProps[]
  changeQuantity: (foodId: string, newQuantity: number) => void
  openFoodModal: () => void
}

export default function FoodList({ foods = [], changeQuantity, openFoodModal }: FoodsProps) {
  return (
    <ul className={styles.foods}>
      {foods.map(food => (
        <li key={food.id}>
          <Card className={styles['food-card']}>
            <div className={styles['food-description']}>
              <h3>{food.name}</h3>
              <p>{helper.formatQuantity(food.quantity)}</p>
            </div>
            <div className={styles.action}>
              <Input type="number" value={food.quantity} onChange={(e) => changeQuantity(food.id, Number(e.target.value))} />
            </div>
          </Card>
        </li>
      ))}
      <li>
        <button onClick={openFoodModal}>
          <Card className={`${styles['food-card']} ${styles['new-food-card']}`}>
            <Icon className={`${styles['icon']} ${styles['icon-add']}`} icon='plus' />
            <h3>Novo alimento</h3>
          </Card>
        </button>
      </li>
    </ul>
  )
}