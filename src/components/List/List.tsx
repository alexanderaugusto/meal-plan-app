import { ReactNode } from 'react'
import Card from '../Card'
import Icon from '../Icon'
import styles from './List.module.css'

interface ListProps {
  newItem: string
  to?: string
  onClick?: () => void
  className?: string
  children: ReactNode[]
}

export default function List({ newItem, to, onClick, className, children }: ListProps) {
  return (
    <ul className={`${styles.list} ${className}`}>
      {children}
      <li className={styles['new-item']}>
        <Card className={styles['new-item-card']} to={to} onClick={onClick}>
          <Icon className={`${styles['icon']} ${styles['icon-add']}`} icon='plus' />
          <h3>{newItem}</h3>
        </Card>
      </li>
    </ul>
  )
}