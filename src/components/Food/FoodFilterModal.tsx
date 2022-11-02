import { useEffect, useState } from 'react'
import foodService from '../../services/foodService'
import Input from '../Input'
import SelectInput from '../Input/SelectInput'
import Modal from '../Modal'
import styles from './FoodFilterModal.module.css'

interface FoodFilterModalProps {
  open: boolean
  onClose: () => void
  filters: FilterProps
  onApplyFilters: (filters: FilterProps) => void
}

interface FilterProps {
  orderBy: string
  category: number
  onlySelected: boolean
}

interface OptionProps {
  value: any
  label: string
}

export default function FoodFilterModal({ open, onClose, filters, onApplyFilters }: FoodFilterModalProps) {
  const [categoryOptions, setCategoryOptions] = useState<OptionProps[]>([])
  const [orderByOptions] = useState<OptionProps[]>([
    { label: 'A-Z', value: 'A-Z', },
    { label: 'Z-A', value: 'Z-A', },
    { label: 'Calorias Crescente', value: 'energy-asc' },
    { label: 'Calorias Decrescente', value: 'energy-desc' },
  ])
  const [category, setCategory] = useState(filters.category)
  const [orderBy, setOrderBy] = useState(filters.orderBy)
  const [onlySelected, setOnlySelected] = useState(filters.onlySelected)

  useEffect(() => {
    setCategory(filters.category)
    setOrderBy(filters.orderBy)
    setOnlySelected(filters.onlySelected)
  }, [filters])

  useEffect(() => {
    foodService.getCategories()
      .then((categories) => {
        const newCategoryOptions = categories.map((category) => {
          return { value: category.id, label: category.category }
        })
        newCategoryOptions.unshift({ value: 0, label: 'Todas' })
        setCategoryOptions(newCategoryOptions)
        localStorage.setItem('taco-api-categories', JSON.stringify(categories))
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  function handleChangeOnlySelected() {
    setOnlySelected(!onlySelected)
  }

  function resetFilters() {
    setCategory(0)
    setOrderBy('A-Z')
    setOnlySelected(false)
  }

  function applyFilters() {
    onApplyFilters({
      category,
      orderBy,
      onlySelected
    })
    onClose()
  }

  return (
    <Modal
      className={styles['food-filter-modal']}
      title="Filtrar alimentos"
      open={open}
      onClose={onClose}
    >
      <div className={styles['modal-container']}>
        <div className={styles['input-group']}>
          <label>Ordenar por</label>
          <SelectInput
            className={styles.input}
            options={orderByOptions}
            noOptionsMessage={() => 'Nenhuma opção encontrada'}
            value={orderByOptions.find(option => option.value === orderBy)}
            onChange={(option: OptionProps) => setOrderBy(option.value)}
          />
        </div>
        <div className={styles['input-group']}>
          <label>Categoria</label>
          <SelectInput
            className={styles.input}
            options={categoryOptions}
            noOptionsMessage={() => 'Nenhuma opção encontrada'}
            value={categoryOptions.find(option => option.value === category)}
            onChange={(option: OptionProps) => setCategory(option.value)}
            isLoading={categoryOptions.length === 0}
          />
        </div>
        <div className={`${styles['input-group']} ${styles['input-group-checkbox']}`}>
          <label>Somente alimentos selecionados</label>
          <Input type="checkbox" checked={onlySelected} onClick={handleChangeOnlySelected} />
        </div>
        <div className={styles.actions}>
          <button className={styles['btn-reset']} onClick={resetFilters}>Restaurar ao padrão</button>
          <button className={styles['btn-apply']} onClick={applyFilters}>Aplicar filtros</button>
        </div>
      </div>
    </Modal>
  )
}