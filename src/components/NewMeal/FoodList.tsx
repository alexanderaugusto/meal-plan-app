import Card from '../Card'
import Icon from '../Icon'
import styles from './FoodList.module.css'
import { FoodProps } from '../../types/FoodType'
import Input from '../Input/Input'
import helper from '../../utils/helper'

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
              <h4>{`${food.baseQuantity.quantity} ${food.baseQuantity.unit}`}</h4>
              <p>{`${helper.formatNumber(food.attributes.energy.quantity, 0)} ${food.attributes.energy.unit}`}</p>
            </div>
            <div className={styles.action}>
              <Input type="number" value={food.quantity} onChange={(e) => changeQuantity(food.id, Number(e.target.value))} />
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