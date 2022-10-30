import { useEffect, useState } from 'react'
import Card from '../Card'
import PieChart from '../PieChart'
import mealHelper from '../../utils/helper/mealHelper'
import utilityHelper from '../../utils/helper/utilityHelper'
import { FoodProps } from '../../types/FoodType'
import styles from './FoodNutrients.module.css'

interface FoodNutrientsProps {
  foods: FoodProps[]
}

export default function FoodNutrients({ foods }: FoodNutrientsProps) {
  const [nutrients, setNutrients] = useState<(string | number)[][]>([])
  const options = {
    slices: {
      0: { color: utilityHelper.getColorFromVariable('--color-protein').trim() },
      1: { color: utilityHelper.getColorFromVariable('--color-carbohydrate').trim() },
      2: { color: utilityHelper.getColorFromVariable('--color-fat').trim() }
    }
  }

  useEffect(() => {
    const totalProtein = foods.reduce((total, food) => total + mealHelper.calculateNutrient(food.attributes.protein.quantity, food.quantity, food.baseQuantity.quantity), 0)
    const totalCarbohydrate = foods.reduce((total, food) => total + mealHelper.calculateNutrient(food.attributes.carbohydrate.quantity, food.quantity, food.baseQuantity.quantity), 0)
    const totalFat = foods.reduce((total, food) => total + mealHelper.calculateNutrient(food.attributes.fat.quantity, food.quantity, food.baseQuantity.quantity), 0)

    const totalNutrients = [
      ['Nutrientes', 'Macronutrientes'],
      [`Proteína (${utilityHelper.formatNumber(totalProtein, 2)})`, totalProtein],
      [`Carboidrato (${utilityHelper.formatNumber(totalCarbohydrate, 2)})`, totalCarbohydrate],
      [`Gordura (${utilityHelper.formatNumber(totalFat, 2)})`, totalFat]
    ]

    setNutrients(totalNutrients)
  }, [foods])

  return (
    <Card className={styles.nutrients}>
      <h2>Macronutrientes</h2>
      <p>Porcentagem de macronutrientes diárias baseadas nos alimentos adicionados</p>
      <PieChart data={nutrients} options={options} />
    </Card>
  )
}