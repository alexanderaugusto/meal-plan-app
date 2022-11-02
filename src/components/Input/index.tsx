import TimeInput from './TimeInput'
import CheckBoxInput from './CheckBoxInput'
import TextInput from './TextInput'

interface InputTypeProps {
  [text: string]: typeof TextInput
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string
}

export default function Input({ type, ...props }: InputProps) {
  const inputType = {
    text: TextInput,
    checkbox: CheckBoxInput,
    time: TimeInput,
  } as InputTypeProps

  const InputType = inputType[type]

  return <InputType {...props} />
}