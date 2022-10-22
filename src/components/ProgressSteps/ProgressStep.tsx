import { ReactNode } from 'react'
import styles from './ProgressStep.module.css'

interface ProgressStepProps {
  children: ReactNode[]
  className?: string
  step: number
}

export default function ProgressStep({ className, children, step }: ProgressStepProps) {
  return (
    <div className={`${styles['progress-step']} ${className}`}>
      {children && children.map((child, index) => {
        if (index === step - 1) {
          return child
        }

        return null
      })}
    </div>
  )
}