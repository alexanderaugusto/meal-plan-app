import styles from './TextInput.module.css'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export default function TextInput({ className, value = '', ...props }: TextInputProps) {
  return (
    <div className={`${styles['text-input']} ${className}`}>
      <input type="text" {...props} value={value} />
    </div>
  )
}