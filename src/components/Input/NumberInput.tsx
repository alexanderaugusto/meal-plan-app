import Icon from '../Icon';
import styles from './NumberInput.module.css';

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export default function NumberInput({ onChange, value = 0, ...props }: NumberInputProps) {
  function addNumber() {
    if (onChange) {
      onChange({
        target: {
          value: Number(value) + 1
        }
      } as any)
    }
  }

  function subtractNumber() {
    if (onChange) {
      onChange({
        target: {
          value: Number(value) - 1
        }
      } as any)
    }
  }

  return (
    <div className={styles['number-input']}>
      <button onClick={subtractNumber}>
        <Icon className={styles.icon} icon="subtract" />
      </button>
      <p>{value}</p>
      <button onClick={addNumber}>
        <Icon className={styles.icon} icon="plus" />
      </button>
    </div>
  )
}