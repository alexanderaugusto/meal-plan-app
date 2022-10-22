import styles from './TimeInput.module.css'

interface TimeInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export default function TimeInput(props: TimeInputProps) {
  return (
    <div className={styles['time-input']}>
      <input type="time" {...props} />
    </div>
  )
}