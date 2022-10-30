import { ReactNode } from 'react'
import Card from '../Card'
import Icon from '../Icon'
import utilityHelper from '../../utils/helper/utilityHelper'
import styles from './Item.module.css'

interface ItemProps {
  color?: string
  icon?: string
  name: string
  description: string
  to?: string
  className?: string
  nutrients: {
    energy: string
    protein: string
    carbohydrate: string
    fat: string
  }
  children?: ReactNode
}

export default function Item({ color, icon, name, description, to, className, nutrients, children }: ItemProps) {
  return (
    <li className={`${styles.item} ${className}`}>
      <Card className={styles['item-card']} to={to}>
        {icon && (
          <div
            className={styles['item-icon']}
            style={{ background: color }}
          >
            <Icon
              className={styles['icon']}
              icon={utilityHelper.convertStringToIcon(icon)}
            />
          </div>
        )}
        <div className={styles['item-description']}>
          <h3>{name}</h3>
          <h4>{description}</h4>
          <div className={styles['item-nutrients']}>
            <p
              data-toggle="tooltip"
              title="Calorias"
            >
              <b style={{ color: utilityHelper.getColorFromVariable('--color-energy') }}>•</b> {nutrients.energy}
            </p>
            <p
              data-toggle="tooltip"
              title="Proteínas"
            >
              <b style={{ color: utilityHelper.getColorFromVariable('--color-protein') }}>•</b> {nutrients.protein}
            </p>
            <p
              data-toggle="tooltip"
              title="Carboidratos"
            >
              <b style={{ color: utilityHelper.getColorFromVariable('--color-carbohydrate') }}>•</b> {nutrients.carbohydrate}
            </p>
            <p
              data-toggle="tooltip"
              title="Gorduras"
            >
              <b style={{ color: utilityHelper.getColorFromVariable('--color-fat') }}>•</b> {nutrients.fat}
            </p>
          </div>
        </div>
        {children && (
          <div className={styles['item-action']}>
            {children}
          </div>
        )}
      </Card>
    </li>
  )
}