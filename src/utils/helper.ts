import { IconProp } from '@fortawesome/fontawesome-svg-core'

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

const helper = {
  calculatePieChartPercentage,
  convertStringToIcon,
  getColorFromVariable,
  generateUUID,
  orderArrayByProperty
}

export default helper