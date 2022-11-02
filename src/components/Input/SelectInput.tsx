import Select from 'react-select'
import utilityHelper from '../../utils/helper/utilityHelper'


export default function SelectInput({ ...props }) {
  const customStyles = {
    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      backgroundColor: state.isSelected ? utilityHelper.getColorFromVariable('--color-primary') : utilityHelper.getColorFromVariable('--color-light'),
      color: state.isSelected ? utilityHelper.getColorFromVariable('--color-light') : utilityHelper.getColorFromVariable('--color-dark'),
      ':active': {
        ...provided[':active'],
        backgroundColor: utilityHelper.getColorFromVariable('--color-primary'),
        color: utilityHelper.getColorFromVariable('--color-light'),
      },
      cursor: 'pointer'
    }),
    control: (provided: any, state: { isFocused: any }) => ({
      ...provided,
      backgroundColor: utilityHelper.getColorFromVariable('--color-light'),
      borderColor: state.isFocused ? utilityHelper.getColorFromVariable('--color-primary') : utilityHelper.getColorFromVariable('--color-grey-light'),
      boxShadow: state.isFocused ? `0 0 0 1px ${utilityHelper.getColorFromVariable('--color-primary')}` : 'none',
      ':hover': {
        ...provided[':hover'],
        borderColor: utilityHelper.getColorFromVariable('--color-primary'),
      }
    }),
  }

  return (
    <Select styles={customStyles} {...props} />
  )
}