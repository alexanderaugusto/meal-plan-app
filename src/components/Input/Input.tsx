import DateInput from './TimeInput'
import CheckBoxInput from './CheckBoxInput'
import NumberInput from './NumberInput'
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
    number: NumberInput,
    checkbox: CheckBoxInput,
    time: DateInput,
  } as InputTypeProps

  const InputType = inputType[type]

  return <InputType {...props} />
}