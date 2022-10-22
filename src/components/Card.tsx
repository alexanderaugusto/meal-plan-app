import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Card.module.css'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  to?: string
}

export default function Card({ children, className, onClick, to }: CardProps) {
  const navigate = useNavigate()

  function handleClick() {
    if (onClick) {
      onClick()
    }
    else if (to) {
      navigate(to)
    }
  }

  return (
    <div
      className={`${styles.card} ${className}`}
      onClick={handleClick}
      style={{
        cursor: (onClick || to) ? 'pointer' : 'default'
      }}>
      {children}
    </div>
  )
}