import styles from './TextInput.module.css';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export default function TextInput({ className, ...props }: TextInputProps) {
  return (
    <div className={`${styles['text-input']} ${className}`}>
      <input type="text" {...props} />
    </div>
  )
}