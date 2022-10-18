import Icon from '../Icon';
import styles from './CheckBoxInput.module.css';

interface CheckBoxInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export default function CheckBoxInput({ checked }: CheckBoxInputProps) {
  return (
    <div className={styles['checkbox-input']}>
      {checked && <Icon icon="check" />}
    </div>
  )
}