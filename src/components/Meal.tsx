import React from 'react'
import Card from './Card'
import Icon from './Icon'
import styles from './Meal.module.css'
import { MealProps } from '../types/MealType'
import helper from '../utils/helper'

interface MealsProps {
  meals: MealProps[]
}

export default function Meal({ meals = [] }: MealsProps) {
  return (
    <ul className={styles.meals}>
      {meals.map(meal => (
        <li key={meal.id}>
          <Card className={styles['meal-card']}>
            <Icon
              className={`${styles['icon']} ${styles['icon-card']}`}
              icon={helper.convertStringToIcon(meal.icon)}
              style={{ background: helper.getColorFromVariable(`--color-meal-${meal.color}`) }}
            />
            <div className={styles['meal-description']}>
              <h3>{meal.name}</h3>
              <time>{meal.time}</time>
              <p>{meal.totalEnergy}</p>
            </div>
            <button className={styles.action}>
              <Icon className={`${styles['icon']} ${styles['icon-delete']}`} icon='trash' />
            </button>
          </Card>
        </li>
      ))}
      <li>
        <Card className={`${styles['meal-card']} ${styles['new-meal-card']}`}>
          <Icon className={`${styles['icon']} ${styles['icon-add']}`} icon='plus' />
          <h3>Nova refeição</h3>
        </Card>
      </li>
    </ul>
  )
}