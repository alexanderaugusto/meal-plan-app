import { ReactNode } from "react"
import Icon from "./Icon"
import styles from "./Header.module.css"

interface HeaderProps {
  title: string
  onBack?: () => void
  className?: string
  titleClassName?: string
  children?: ReactNode
}

export default function Header({ onBack, title, className, titleClassName, children }: HeaderProps) {
  return (
    <header className={`${styles.header} ${className}`}>
      {onBack && (
        <button className="btn-icon" onClick={onBack}>
          <Icon className={styles.icon} icon="arrow-left" />
        </button>
      )}
      <h3 className={titleClassName}>{title}</h3>
      <div className={styles.actions}>
        {children}
      </div>
    </header>
  )
}