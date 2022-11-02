import { useState } from 'react'
import Input from '../Input'
import { FoodProps } from '../../types/FoodType'
import styles from './FoodSearch.module.css'
import Icon from '../Icon'
import FoodFilterModal from './FoodFilterModal'

interface FoodSearchProps {
  originalFoods: FoodProps[]
  selecteds: number[]
  onSearch: (foods: FoodProps[]) => void
}

interface FilterProps {
  orderBy: string
  category: number
  onlySelected: boolean
}

export default function FoodSearch({ originalFoods, selecteds, onSearch }: FoodSearchProps) {
  const [searchText, setSearchText] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterProps>({
    orderBy: 'A-Z',
    category: 0,
    onlySelected: false
  })

  function search(name: string, searchCriteria: string) {
    name = name.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').toLowerCase()
    searchCriteria = searchCriteria.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').toLowerCase()

    const splittedSearchCriteria = searchCriteria.split(' ')

    return splittedSearchCriteria.every(criteria => name.includes(criteria))
  }

  function searchFoods(searchCriteria: string) {
    setSearchText(searchCriteria)
    const filteredFoods = originalFoods.filter(food => search(food.name, searchCriteria))
    onSearch(filteredFoods)
  }

  function filterByCategory(foods: FoodProps[], category: number) {
    const filteredFoods = foods.filter(food => food.tacoApiCategoryId === category)
    return filteredFoods
  }

  function filterBySelecteds(foods: FoodProps[]) {
    const filteredFoods = foods.filter(food => selecteds.includes(food.tacoApiId))
    return filteredFoods
  }

  function filterByOrder(foods: FoodProps[], orderBy: string) {
    const filteredFoods = foods.sort((a, b) => {
      if (orderBy === 'A-Z') {
        return a.name.localeCompare(b.name)
      } else if (orderBy === 'Z-A') {
        return b.name.localeCompare(a.name)
      } else if (orderBy === 'energy-asc') {
        return a.attributes.energy.quantity - b.attributes.energy.quantity
      } else if (orderBy === 'energy-desc') {
        return b.attributes.energy.quantity - a.attributes.energy.quantity
      } else {
        return a.name.localeCompare(b.name)
      }
    })
    return filteredFoods
  }

  function applyFilters(filterProps: FilterProps) {
    let filteredFoods = originalFoods

    if (filterProps.category !== 0) {
      filteredFoods = filterByCategory(filteredFoods, filterProps.category)
    }

    if (filterProps.onlySelected) {
      filteredFoods = filterBySelecteds(filteredFoods)
    }

    filteredFoods = filterByOrder(filteredFoods, filterProps.orderBy)

    onSearch(filteredFoods)
    setFilters({ ...filters, ...filterProps })
  }

  return (
    <div className={styles['food-search']}>
      <FoodFilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onApplyFilters={applyFilters}
      />
      <Input
        type="text"
        placeholder="Nome do alimento"
        value={searchText}
        onChange={(e) => searchFoods(e.target.value)}
      />
      <button className={styles['filter-button']} onClick={() => setFilterOpen(true)}>
        <Icon className={styles.icon} icon="filter" />
        Filtrar
      </button>
    </div>
  )
}