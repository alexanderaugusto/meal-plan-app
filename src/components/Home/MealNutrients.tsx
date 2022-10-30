import { useEffect, useState } from 'react'
import Card from '../Card'
import PieChart from '../PieChart'
import utilityHelper from '../../utils/helper/utilityHelper'
import { MealProps } from '../../types/MealType'
import styles from './MealNutrients.module.css'

interface MealNutrientsProps {
  meals: MealProps[]
}

export default function MealNutrients({ meals }: MealNutrientsProps) {
  const [nutrients, setNutrients] = useState<(string | number)[][]>([])
  const options = {
    slices: {
      0: { color: utilityHelper.getColorFromVariable('--color-protein').trim() },
      1: { color: utilityHelper.getColorFromVariable('--color-carbohydrate').trim() },
      2: { color: utilityHelper.getColorFromVariable('--color-fat').trim() }
    }
  }

  useEffect(() => {
    let totalProtein = 0
    let totalCarbohydrate = 0
    let totalFat = 0

    meals.forEach((meal) => {
      totalProtein += meal.totalProtein
      totalCarbohydrate += meal.totalCarbohydrate
      totalFat += meal.totalFat
    })

    const totalNutrients = [
      ['Nutrientes', 'Macronutrientes'],
      [`Proteína (${utilityHelper.formatNumber(totalProtein, 2)})`, totalProtein],
      [`Carboidrato (${utilityHelper.formatNumber(totalCarbohydrate, 2)})`, totalCarbohydrate],
      [`Gordura (${utilityHelper.formatNumber(totalFat, 2)})`, totalFat]
    ]

    setNutrients(totalNutrients)
  }, [meals])

  return (
    <Card className={styles.nutrients}>
      <h2>Macronutrientes</h2>
      <p>Porcentagem de macronutrientes diárias baseadas nas refeições adicionados</p>
      <PieChart data={nutrients} options={options} />
    </Card>
  )
}