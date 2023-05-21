export type TreeMenuData = {
  label: string
  content: TreeMenuNode[]
}

export type TreeMenuNode = {
  id: number
  name: string
  kind: string
  contents?: TreeMenuNode[]
  type?: {
    id: number
    name: string
  }
}
