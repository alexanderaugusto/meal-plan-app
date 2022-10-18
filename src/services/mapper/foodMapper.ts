import { TacoApiProps, FoodProps, TacoApiAttrProps, FoodAttrProps } from '../../types/FoodType'

export function mapAttr(attr: any, key: string): any {
  const attrQty = (attr && attr !== "*") ? attr[key] : 0
  const attrUnit = attr ? attr.unit : "g"

  return [attrQty, attrUnit]
}

export function mapFat(fattyAcids: any): any {
  let saturated = 0
  let monounsaturated = 0
  let polyunsaturated = 0
  let saturatedUnit = "g"

  if (fattyAcids) {
    [saturated, saturatedUnit] = mapAttr(fattyAcids.saturated, 'qty')
    [monounsaturated] = mapAttr(fattyAcids.monounsaturated, 'qty')
    [polyunsaturated] = mapAttr(fattyAcids.polyunsaturated, 'qty')
  }

  const fatQty = Number(saturated) + Number(monounsaturated) + Number(polyunsaturated)

  return [fatQty, saturatedUnit]
}

export function mapAttrs(attrs: TacoApiAttrProps): FoodAttrProps {
  const [protein, proteinUnit] = mapAttr(attrs.protein, 'qty')
  const [carbohydrate, carbohydrateUnit] = mapAttr(attrs.carbohydrate, 'qty')
  const [energy] = mapAttr(attrs.energy, 'kcal')
  const [fat, fatUnit] = mapFat(attrs.fatty_acids)

  return {
    protein: {
      quantity: Number(protein),
      unit: proteinUnit
    },
    carbohydrate: {
      quantity: Number(carbohydrate),
      unit: carbohydrateUnit
    },
    fat: {
      quantity: Number(fat),
      unit: fatUnit
    },
    energy: {
      quantity: Number(energy),
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