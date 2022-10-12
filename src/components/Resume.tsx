import React from 'react'
import helper from '../utils/helper'
import Card from './Card'
import Icon from './Icon'
import CircularProgress from './CircularProgress'
import styles from './Resume.module.css'

interface ResumeProps {
  baseEnergy: number
  foodEnergy: number
}

export default function Resume({ baseEnergy, foodEnergy }: ResumeProps) {
  return (
    <Card className={styles.resume}>
      <h2>Calorias</h2>
      <p>Porcentagem de calorias baseadas nas refeições adicionadas</p>
      <div className={styles.container}>
        <CircularProgress
          value={helper.calculatePieChartPercentage(foodEnergy, baseEnergy)}
          colors={{
            path: helper.getColorFromVariable('--color-primary'),
            trail: helper.getColorFromVariable('--color-grey-light'),
            text: helper.getColorFromVariable('--color-grey')
          }}
        />
        <ul>
          <li>
            <Icon className={`${styles['icon']} ${styles['icon-energy']}`} icon='fire' />
            <p>
              Calorias Base <br />
              <b>{baseEnergy.toString()}</b>
            </p>
          </li>
          <li>
            <Icon className={`${styles['icon']} ${styles['icon-food']}`} icon='utensils' />
            <p>
              Alimentos <br />
              <b>{foodEnergy.toString()}</b>
            </p>
          </li>
        </ul>
      </div>
    </Card>
  )
}