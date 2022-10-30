import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "./Icon"
import styles from "./Header.module.css"

interface HeaderProps {
  title: string
  backTo: string
  className?: string
  children?: ReactNode
}

export default function Header({ backTo, title, className, children }: HeaderProps) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(backTo)
  }

  return (
    <header className={`${styles.header} ${className}`}>
      <button onClick={handleClick} >
        <Icon className={styles.icon} icon="arrow-left" />
      </button>
      <h3>{title}</h3>
      <div className={styles.actions}>
        {children}
      </div>
    </header>
  )
}