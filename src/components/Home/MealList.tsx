import { Link } from 'react-router-dom'
import Card from '../Card'
import Icon from '../Icon'
import styles from './MealList.module.css'
import { MealProps } from '../../types/MealType'
import helper from '../../utils/helper'

interface MealsProps {
  meals: MealProps[]
}

export default function MealList({ meals = [] }: MealsProps) {
  return (
    <ul className={styles.meals}>
      {meals.map(meal => (
        <li key={meal.id}>
          <Link to={`/meal?id=${meal.id}`}>
            <Card className={styles['meal-card']}>
              <div
                className={styles['icon-card-container']}
                style={{ background: helper.getColorFromVariable(`--color-meal-${meal.color}`) }}
              >
                <Icon
                  className={`${styles['icon']} ${styles['icon-card']}`}
                  icon={helper.convertStringToIcon(meal.icon)}
                />
              </div>
              <div className={styles['meal-description']}>
                <h3>{meal.name}</h3>
                <time>{meal.time}</time>
                <p>{helper.formatNumber(meal.totalEnergy, 0)} kcal</p>
              </div>
              <Icon className={`${styles['icon']} ${styles['icon-open']}`} icon='chevron-right' />
            </Card>
          </Link>
        </li>
      ))}
      <li>
        <Link to='/meal'>
          <Card className={`${styles['meal-card']} ${styles['new-meal-card']}`}>
            <Icon className={`${styles['icon']} ${styles['icon-add']}`} icon='plus' />
            <h3>Nova refeição</h3>
          </Card>
        </Link>
      </li>
    </ul >
  )
}