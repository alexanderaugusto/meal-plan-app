import Icon from './Icon'
import styles from './Modal.module.css'

interface ModalProps {
  className?: string
  open: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
}

export default function Modal({ className, open, title, children, onClose }: ModalProps) {

  if (!open) {
    return null
  }

  return (
    <div className={`${styles.modal} ${className}`}>
      <div className={styles['modal-container']}>
        <header className={styles['modal-header']}>
          <h3>{title}</h3>
          <button onClick={onClose}>
            <Icon className={styles.icon} icon='times' />
          </button>
        </header>
        <div className={styles['modal-body']}>
          {children}
        </div>
      </div>
    </div>
  )
}