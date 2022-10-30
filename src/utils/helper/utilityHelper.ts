import { IconProp } from '@fortawesome/fontawesome-svg-core'

function calculateCircularProgressPercentage(value: number, total: number, decimalPlaces: number = 0): number {
  const percentage = Number(((value / total) * 100).toFixed(decimalPlaces))
  return percentage >= 100 ? 100 : percentage
}

function convertStringToIcon(icon: string): IconProp {
  return icon as IconProp
}

function formatNumber(number: number, decimalPlaces: number = 2): string {
  const numberToFormat = number || 0
  return numberToFormat.toFixed(decimalPlaces).replace('.', ',')
}

function formatNumberInput(value: string): string {
  let number = Number(value.replace(/[^0-9]/g, '')).toString()

  if (number.length <= 2) {
    number = `00${number}`
  }

  const numberStart = number.substring(0, number.length - 2)
  const numberEnd = number.slice(-2)

  return `${numberStart},${numberEnd}`
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function getColorFromVariable(property: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(property)
}

function getTimeNow(): string {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
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

const utilityHelper = {
  calculateCircularProgressPercentage,
  convertStringToIcon,
  formatNumber,
  formatNumberInput,
  generateUUID,
  getColorFromVariable,
  getTimeNow,
  orderArrayByProperty
}

export default utilityHelper
