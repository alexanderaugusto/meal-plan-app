import TextInput from './TextInput'
import NumberInput from './NumberInput'
import CheckBoxInput from './CheckBoxInput'
import DateInput from './TimeInput'

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