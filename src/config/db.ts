import Dexie, { Table } from 'dexie';
import { MealProps } from '../types/MealType'

export class IndexedDB extends Dexie {
  meal!: Table<MealProps>

  constructor() {
    super('meal-db');
    this.version(1).stores({
      meal: '++id, name, time, totalEnergy, totalProtein, totalCarbohydrate, totalFat, icon, color, foods'
    })
  }
}

export const db = new IndexedDB();