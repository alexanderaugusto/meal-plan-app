import { useEffect, useState } from 'react'
import Input from '../Input'
import { Item, List } from '../List'
import FoodQuantityModal from '../Meal/FoodQuantityModal'
import mealHelper from '../../utils/helper/mealHelper'
import utilityHelper from '../../utils/helper/utilityHelper'
import { FoodProps } from '../../types/FoodType'
import styles from './FoodList.module.css'
import Pagination from '../List/Pagination'

interface FoodQuantityModalProps {
  open: boolean
  foodId: string
  foodName: string
  quantity: number
  unit: string
}

interface PaginationProps {
  page: number
  totalPages: number
}

interface FoodListProps {
  foods: FoodProps[]
  selecteds: number[]
  onSelectFood: (foodId: string, quantity: number) => void
  onRemoveFood: (foodId: string) => void
}

const ITEM_PER_PAGE = 10

export default function FoodList({ foods, selecteds, onSelectFood, onRemoveFood }: FoodListProps) {
  const [foodQuantityModal, setFoodQuantityModal] = useState<FoodQuantityModalProps>({ open: false, foodId: '', foodName: '', quantity: 0, unit: '' })
  const [foodList, setFoodList] = useState<FoodProps[]>([])
  const [pagination, setPagination] = useState<PaginationProps>({ page: 1, totalPages: 1 })

  useEffect(() => {
    setPagination({
      page: 1,
      totalPages: Math.ceil(foods.length / ITEM_PER_PAGE),
    })
  }, [foods])

  useEffect(() => {
    setFoodList(foods.slice((pagination.page - 1) * ITEM_PER_PAGE, pagination.page * ITEM_PER_PAGE))
  }, [pagination, setFoodList, foods])

  function changeSelected(food: FoodProps) {
    if (selecteds.includes(food.tacoApiId)) {
      onRemoveFood(food.tacoApiId.toString())
    } else {
      setFoodQuantityModal({ open: true, foodId: food.tacoApiId.toString(), foodName: food.name, quantity: food.baseQuantity.quantity, unit: food.baseQuantity.unit })
    }
  }

  function isSelected(foodId: number) {
    return selecteds.includes(foodId)
  }

  function selectFood(foodId: string, quantity: number) {
    onSelectFood(foodId, quantity)
  }

  function changePage(page: number) {
    setPagination({ ...pagination, page })
  }

  return (
    <>
      <FoodQuantityModal
        open={foodQuantityModal.open}
        onClose={() => setFoodQuantityModal({ ...foodQuantityModal, open: false })}
        foodId={foodQuantityModal.foodId}
        foodName={foodQuantityModal.foodName}
        defaultQuantity={foodQuantityModal.quantity}
        unit={foodQuantityModal.unit}
        onSave={selectFood}
      />
      <List className={styles.foods}>
        {foodList.map(food => (
          <Item
            className={styles['food-item']}
            cardClassName={styles['item-card']}
            key={food.id}
            name={food.name}
            description={`${food.baseQuantity.quantity} ${food.baseQuantity.unit}`}
            nutrients={{
              energy: `${utilityHelper.formatNumber(mealHelper.calculateNutrient(food.attributes.energy.quantity, food.baseQuantity.quantity, food.baseQuantity.quantity), 0)} ${food.attributes.energy.unit}`,
              protein: `${utilityHelper.formatNumber(mealHelper.calculateNutrient(food.attributes.protein.quantity, food.baseQuantity.quantity, food.baseQuantity.quantity), 2)} ${food.attributes.protein.unit}`,
              carbohydrate: `${utilityHelper.formatNumber(mealHelper.calculateNutrient(food.attributes.carbohydrate.quantity, food.baseQuantity.quantity, food.baseQuantity.quantity), 2)} ${food.attributes.carbohydrate.unit}`,
              fat: `${utilityHelper.formatNumber(mealHelper.calculateNutrient(food.attributes.fat.quantity, food.baseQuantity.quantity, food.baseQuantity.quantity), 2)} ${food.attributes.fat.unit}`
            }}
            onClick={() => changeSelected(food)}
          >
            <Input type="checkbox" checked={isSelected(food.tacoApiId)} />
          </Item>
        ))}
      </List>
      <Pagination
        className={styles.pagination}
        page={pagination.page}
        totalPages={pagination.totalPages}
        setPage={(page) => changePage(page)}
      />
    </>
  )
}