import { mapAttr, mapAttrs, mapFat, mapFood, mapFoods } from '../../../src/services/mapper/foodMapper'
import { TacoApiProps, FoodProps } from '../../../src/types/FoodType'
import TACO_API_DATA from '../../utils/foods.json'

function calculateAttr(attr: number | string) {
  if (!isNaN(Number(attr))) {
    return Number(attr)
  } else {
    return 0
  }
}

function expectedFood(tacoApiFood: TacoApiProps): FoodProps {
  const fatQty = calculateAttr(tacoApiFood.attributes.fatty_acids.saturated.qty) + calculateAttr(tacoApiFood.attributes.fatty_acids.monounsaturated.qty) + calculateAttr(tacoApiFood.attributes.fatty_acids.polyunsaturated.qty)

  return {
    id: `${tacoApiFood.id}-temp`,
    name: tacoApiFood.description,
    quantity: 1,
    baseQuantity: {
      quantity: tacoApiFood.base_qty,
      unit: tacoApiFood.base_unit
    },
    tacoApiId: tacoApiFood.id,
    tacoApiCategoryId: tacoApiFood.category_id,
    attributes: {
      protein: {
        quantity: calculateAttr(tacoApiFood.attributes.protein.qty),
        unit: tacoApiFood.attributes.protein.unit,
      },
      carbohydrate: {
        quantity: calculateAttr(tacoApiFood.attributes.carbohydrate.qty),
        unit: tacoApiFood.attributes.carbohydrate.unit
      },
      energy: {
        quantity: calculateAttr(tacoApiFood.attributes.energy.kcal),
        unit: 'kcal'
      },
      fat: {
        quantity: fatQty,
        unit: tacoApiFood.attributes.fatty_acids.saturated.unit
      }
    }
  }
}

describe('Food Mapper Testing', () => {
  it('Should map a single attr from taco-api', () => {
    const attr = mapAttr(TACO_API_DATA[0].attributes.protein, 'qty')
    expect(attr).toEqual({
      qty: TACO_API_DATA[0].attributes.protein.qty,
      unit: TACO_API_DATA[0].attributes.protein.unit
    })
  })

  it('Should map a list of attrs from taco-api', () => {
    const attrs = mapAttrs(TACO_API_DATA[0].attributes)
    expect(attrs).toEqual({
      protein: {
        quantity: TACO_API_DATA[0].attributes.protein.qty,
        unit: TACO_API_DATA[0].attributes.protein.unit
      },
      carbohydrate: {
        quantity: TACO_API_DATA[0].attributes.carbohydrate.qty,
        unit: TACO_API_DATA[0].attributes.carbohydrate.unit
      },
      fat: {
        quantity: calculateAttr(TACO_API_DATA[0].attributes.fatty_acids.saturated.qty) + calculateAttr(TACO_API_DATA[0].attributes.fatty_acids.monounsaturated.qty) + calculateAttr(TACO_API_DATA[0].attributes.fatty_acids.polyunsaturated.qty),
        unit: TACO_API_DATA[0].attributes.fatty_acids.saturated.unit
      },
      energy: {
        quantity: TACO_API_DATA[0].attributes.energy.kcal,
        unit: 'kcal'
      }
    })
  })

  it('Should map fat from taco-api', () => {
    const fat = mapFat(TACO_API_DATA[0].attributes.fatty_acids)
    expect(fat).toEqual({
      qty: calculateAttr(TACO_API_DATA[0].attributes.fatty_acids.saturated.qty) + calculateAttr(TACO_API_DATA[0].attributes.fatty_acids.monounsaturated.qty) + calculateAttr(TACO_API_DATA[0].attributes.fatty_acids.polyunsaturated.qty),
      unit: TACO_API_DATA[0].attributes.fatty_acids.saturated.unit
    })
  })

  it('Should map a single food from taco-api', () => {
    let tacoApiFood = TACO_API_DATA[0]
    const mappedFood = mapFood(tacoApiFood)

    expect(mappedFood).toEqual(expectedFood(tacoApiFood))
  })

  it('Should map a list of foods from taco-api', () => {
    const mappedFoods = mapFoods(TACO_API_DATA)

    expect(mappedFoods).toHaveLength(TACO_API_DATA.length)
    expect(mappedFoods).toEqual(TACO_API_DATA.map(food => expectedFood(food)))
  })
})