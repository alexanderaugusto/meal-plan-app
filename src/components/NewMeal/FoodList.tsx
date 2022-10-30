import Icon from '../Icon'
import { Item, List } from '../List'
import mealHelper from '../../utils/helper/mealHelper'
import utilityHelper from '../../utils/helper/utilityHelper'
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
    <List newItem="Novo alimento" onClick={openFoodModal}>
      {foods.map(food => (
        <Item
          className={styles['food-item']}
          key={food.id}
          name={food.name}
          description={`${food.quantity} ${food.baseQuantity.unit}`}
          nutrients={{
            energy: `${utilityHelper.formatNumber(mealHelper.calculateNutrient(food.attributes.energy.quantity, food.quantity, food.baseQuantity.quantity), 0)} ${food.attributes.energy.unit}`,
            protein: `${utilityHelper.formatNumber(mealHelper.calculateNutrient(food.attributes.protein.quantity, food.quantity, food.baseQuantity.quantity), 2)} ${food.attributes.protein.unit}`,
            carbohydrate: `${utilityHelper.formatNumber(mealHelper.calculateNutrient(food.attributes.carbohydrate.quantity, food.quantity, food.baseQuantity.quantity), 2)} ${food.attributes.carbohydrate.unit}`,
            fat: `${utilityHelper.formatNumber(mealHelper.calculateNutrient(food.attributes.fat.quantity, food.quantity, food.baseQuantity.quantity), 2)} ${food.attributes.fat.unit}`
          }}
        >
          <div className={styles.actions}>
            <button className={styles['edit-food']} onClick={() => openFoodQuantityModal(food.id, food.name, food.quantity, food.baseQuantity.unit)}>
              <Icon className={styles.icon} icon="pen" />
            </button>
            <button className={styles['delete-food']} onClick={() => deleteFood(food.id)}>
              <Icon className={styles.icon} icon="trash" />
            </button>
          </div>
        </Item>
      ))}
    </List>
  )
}