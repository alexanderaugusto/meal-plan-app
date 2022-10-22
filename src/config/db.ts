import Dexie, { Table } from 'dexie';
import { MealProps } from '../types/MealType'
import { UserProps } from '../types/UserType'

export class IndexedDB extends Dexie {
  meal!: Table<MealProps>
  user!: Table<UserProps>

  constructor() {
    super('meal-plan-db')
    this.version(1).stores({
      meal: '++id, name, time, totalEnergy, totalProtein, totalCarbohydrate, totalFat, icon, color, foods',
      user: '++id, gender, weight, baseEnergy'
    })
  }
}

export const db = new IndexedDB();