import styles from './TextInput.module.css';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export default function TextInput(props: TextInputProps) {
  return (
    <div className={styles['text-input']}>
      <input type="text" {...props} />
    </div>
  )
}