import { useNavigate } from "react-router-dom"
import Icon from "./Icon"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import styles from "./Header.module.css"

interface HeaderProps {
  title: string
  to: string
  actionEnabled?: boolean
  action: () => void
  actionIcon: IconProp
}

export default function Header({ to, title, actionEnabled, action, actionIcon }: HeaderProps) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(to)
  }

  return (
    <header className={styles.header}>
      <button onClick={handleClick} >
        <Icon className={styles.icon} icon="arrow-left" />
      </button>
      <h3>{title}</h3>
      {actionEnabled && (
        <button className={styles.action} onClick={action}>
          <Icon className={styles.icon} icon={actionIcon} />
        </button>
      )}
    </header>
  )
}