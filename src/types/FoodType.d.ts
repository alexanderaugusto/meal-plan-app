export interface TacoApiAttrProps {
  protein: {
    qty: number | string
    unit: string
  }
  carbohydrate: {
    qty: number | string
    unit: string
  }
  energy: {
    kcal: number | string
    kj: number | string
  }
  fatty_acids: {
    saturated: {
      qty: number | string
      unit: string
    }
    monounsaturated: {
      qty: number | string
      unit: string
    }
    polyunsaturated: {
      qty: number | string
      unit: string
    }
  }
}

export interface FoodAttrProps {
  protein: {
    quantity: number
    unit: string
  }
  carbohydrate: {
    quantity: number
    unit: string
  }
  fat: {
    quantity: number
    unit: string
  }
  energy: {
    quantity: number
    unit: string
  }
}

export interface FoodProps {
  id: string
  name: string
  quantity: number
  baseQuantity: {
    quantity: number
    unit: string
  }
  tacoApiId: number
  tacoApiCategoryId: number
  attributes: FoodAttrProps
}

export interface TacoApiProps {
  id: number
  description: string
  base_qty: number
  base_unit: string
  category_id: number
  attributes: TacoApiAttrProps
}

export interface TacoApiCategoryProps {
  id: number
  category: string
}