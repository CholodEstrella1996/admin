export type SelectItemModalModel = {
  category: Category
  subcategory: Subcategory
  item: Item
}

type Category = {
  name: string
  subcategories: Subcategory[]
}

type Subcategory = {
  name: string
  items: Item[]
}

type Item = {
  id: number
  name: string
  iconUrl: string | null
  selected: boolean
}
