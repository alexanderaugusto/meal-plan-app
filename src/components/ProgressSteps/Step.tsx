import { ReactNode } from 'react'
import Icon from '../Icon'
import styles from './Step.module.css'

interface StepProps {
  children: ReactNode
  className?: string
  onNext: () => void
  onPrevious?: () => void
}

export default function Step({ className, children, onNext, onPrevious }: StepProps) {
  return (
    <div className={`${styles.step} ${className}`}>
      {children}

      <div className={styles['step-buttons']}>
        {onPrevious && (
          <button className={styles['step-button-previous']} onClick={onPrevious}>
            <Icon icon="chevron-left" />
          </button>
        )}
        <button className={styles['step-button-next']} onClick={onNext}>
          <Icon icon="chevron-right" />
        </button>
      </div>
    </div>
  )
}