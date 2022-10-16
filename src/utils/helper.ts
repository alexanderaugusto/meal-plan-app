import { COLORS, ICONS } from './constants'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { MealProps } from '../types/MealType'

function calculatePieChartPercentage(value: number, total: number, decimalPlaces: number = 0): number {
  const percentage = Number(((value / total) * 100).toFixed(decimalPlaces))
  return percentage >= 100 ? 100 : percentage
}

function convertStringToIcon(icon: string): IconProp {
  return icon as IconProp
}

function getColorFromVariable(property: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(property)
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function orderArrayByProperty(array: any[], property: string, order: string = 'asc'): any[] {
  return array.sort((a, b) => {
    if (order === 'asc') {
      return a[property] > b[property] ? 1 : -1
    } else {
      return a[property] < b[property] ? 1 : -1
    }
  })
}

function formatQuantity(quantity: number): string {
  return quantity > 1 ? `${quantity} unidades` : `${quantity} unidade`
}

function getTimeNow(): string {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
}

function getRandomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

function getRandomIcon(): string {
  return ICONS[Math.floor(Math.random() * ICONS.length)]
}

function getDefaultMeal(): MealProps {
  return {
    id: generateUUID(),
    name: '',
    time: getTimeNow(),
    totalEnergy: 0,
    totalProtein: 0,
    totalCarbohydrate: 0,
    totalFat: 0,
    icon: getRandomIcon(),
    color: getRandomColor(),
    foods: [],
  }
}

const helper = {
  calculatePieChartPercentage,
  convertStringToIcon,
  getColorFromVariable,
  generateUUID,
  orderArrayByProperty,
  formatQuantity,
  getTimeNow,
  getRandomColor,
  getRandomIcon,
  getDefaultMeal
}

export default helper