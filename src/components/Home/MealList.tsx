import Icon from '../Icon'
import { Item, List } from '../List'
import utilityHelper from '../../utils/helper/utilityHelper'
import { MealProps } from '../../types/MealType'
import styles from './MealList.module.css'
interface MealsProps {
  meals: MealProps[]
}

export default function MealList({ meals = [] }: MealsProps) {
  return (
    <List newItem="Nova refeição" to="/meal">
      {meals.map(meal => (
        <Item
          className={styles['meal-item']}
          key={meal.id}
          color={utilityHelper.getColorFromVariable(`--color-meal-${meal.color}`)}
          icon={meal.icon}
          name={meal.name}
          description={meal.time}
          to={`/meal?id=${meal.id}`}
          nutrients={{
            energy: `${utilityHelper.formatNumber(meal.totalEnergy, 0)} kcal`,
            protein: `${utilityHelper.formatNumber(meal.totalProtein, 2)} g`,
            carbohydrate: `${utilityHelper.formatNumber(meal.totalCarbohydrate, 2)} g`,
            fat: `${utilityHelper.formatNumber(meal.totalFat, 2)} g`
          }}
        >
          <Icon className={styles['icon']} icon='chevron-right' />
        </Item>
      ))}
    </List>
  )
}