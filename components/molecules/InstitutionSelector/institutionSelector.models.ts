import { TreeSelectorNode } from '../trees/TreeSelector/treeSelector.models'

export type InstitutionSelectorForm = {
  search: string
  institutions: Omit<TreeSelectorNode, 'children'>[]
}
