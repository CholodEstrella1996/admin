type Status = 'checked' | 'unchecked' | 'indeterminate'

export type TreeSelectorNode = {
  id: number

  name: string
  displayName?: string
  disabled?: boolean

  children: TreeSelectorNode[]
  path: number[]

  status: Status
}
