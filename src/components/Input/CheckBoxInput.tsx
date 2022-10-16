import Icon from '../Icon';
import styles from './CheckBoxInput.module.css';

interface CheckBoxInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export default function CheckBoxInput({ checked }: CheckBoxInputProps) {
  return (
    <div className={styles['checkbox-input']}>
      <div className={styles['box-container']}>
        {checked && <Icon icon="check" />}
      </div>
    </div>
  )
}