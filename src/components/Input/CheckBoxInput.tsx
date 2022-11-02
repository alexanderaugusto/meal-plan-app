import Icon from '../Icon'
import styles from './CheckBoxInput.module.css'

interface CheckBoxInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export default function CheckBoxInput({ checked, onClick }: CheckBoxInputProps) {
  return (
    <div className={styles['checkbox-input']} onClick={onClick}>
      {checked && <Icon icon="check" />}
    </div>
  )
}