import { TacoApiProps, FoodProps, TacoApiAttrProps, FoodAttrProps } from '../../types/FoodType'

export function mapAttr(attr: any, key: string): { qty: number, unit: string } {
  let attrQty = 0
  let attrUnit = 'g'

  if (attr && attr !== "*" && !isNaN(Number(attr[key]))) {
    attrQty = Number(attr[key])
    attrUnit = attr.unit || 'g'
  }

  return {
    qty: attrQty,
    unit: attrUnit
  }
}

export function mapFat(fattyAcids: any): any {
  let saturatedAttr = { qty: 0, unit: 'g' }
  let monounsaturatedAttr = { qty: 0, unit: 'g' }
  let polyunsaturatedAttr = { qty: 0, unit: 'g' }

  if (fattyAcids) {
    saturatedAttr = mapAttr(fattyAcids.saturated, 'qty')
    monounsaturatedAttr = mapAttr(fattyAcids.monounsaturated, 'qty')
    polyunsaturatedAttr = mapAttr(fattyAcids.polyunsaturated, 'qty')
  }

  const fatQty = saturatedAttr.qty + monounsaturatedAttr.qty + polyunsaturatedAttr.qty

  return {
    qty: fatQty,
    unit: saturatedAttr.unit
  }
}

export function mapAttrs(attrs: TacoApiAttrProps): FoodAttrProps {
  const proteinAttr = mapAttr(attrs.protein, 'qty')
  const carbohydrateAttr = mapAttr(attrs.carbohydrate, 'qty')
  const energyAttr = mapAttr(attrs.energy, 'kcal')
  const fatAttr = mapFat(attrs.fatty_acids)

  return {
    protein: {
      quantity: proteinAttr.qty,
      unit: proteinAttr.unit
    },
    carbohydrate: {
      quantity: carbohydrateAttr.qty,
      unit: carbohydrateAttr.unit
    },
    fat: {
      quantity: fatAttr.qty,
      unit: fatAttr.unit
    },
    energy: {
      quantity: energyAttr.qty,
      unit: 'kcal'
    }
  }
}

export function mapFood(food: TacoApiProps): FoodProps {
  return {
    id: `${food.id.toString()}-temp`,
    name: food.description,
    quantity: 1,
    baseQuantity: {
      quantity: food.base_qty,
      unit: food.base_unit,
    },
    tacoApiId: food.id,
    tacoApiCategoryId: food.category_id,
    attributes: mapAttrs(food.attributes)
  }
}

export function mapFoods(foods: TacoApiProps[]): FoodProps[] {
  return foods.map((food) => mapFood(food))
}