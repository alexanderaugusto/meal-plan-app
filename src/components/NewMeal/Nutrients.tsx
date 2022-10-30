import { useEffect, useState } from 'react'
import Card from '../Card'
import PieChart from '../PieChart'
import helper from '../../utils/helper'
import { FoodProps } from '../../types/FoodType'
import styles from './Nutrients.module.css'

interface NutrientsProps {
  foods: FoodProps[]
}

export default function Nutrients({ foods }: NutrientsProps) {
  const [nutrients, setNutrients] = useState<(string | number)[][]>([])
  const options = {
    slices: {
      0: { color: helper.getColorFromVariable('--color-protein').trim() },
      1: { color: helper.getColorFromVariable('--color-carbohydrate').trim() },
      2: { color: helper.getColorFromVariable('--color-fat').trim() }
    }
  }

  useEffect(() => {
    const totalProtein = foods.reduce((total, food) => total + helper.calculateNutrient(food.attributes.protein.quantity, food.quantity, food.baseQuantity.quantity), 0)
    const totalCarbohydrate = foods.reduce((total, food) => total + helper.calculateNutrient(food.attributes.carbohydrate.quantity, food.quantity, food.baseQuantity.quantity), 0)
    const totalFat = foods.reduce((total, food) => total + helper.calculateNutrient(food.attributes.fat.quantity, food.quantity, food.baseQuantity.quantity), 0)

    const totalNutrients = [
      ['Nutrientes', 'Macronutrientes'],
      [`Proteína (${helper.formatNumber(totalProtein)})`, totalProtein],
      [`Carboidrato (${helper.formatNumber(totalCarbohydrate)})`, totalCarbohydrate],
      [`Gordura (${helper.formatNumber(totalFat)})`, totalFat]
    ]

    setNutrients(totalNutrients)
  }, [foods])

  return (
    <Card className={styles.nutrients}>
      <h2>Macronutrientes</h2>
      <p>Porcentagem de macronutrientes baseadas nos alimentos adicionados</p>
      <PieChart data={nutrients} options={options} />
    </Card>
  )
}