import { TreeSelectorNode } from 'components/molecules/trees/TreeSelector/treeSelector.models'

// Types
// - General
type Status = TreeSelectorNode['status']

type GenericNode = {
  id: number
  name: string
  contents?: GenericNode[]
  content?: GenericNode[]
  marked?: boolean
}

// - Args
type GetStatusArgs = {
  isMarked: boolean
  content: GenericNode[]
  parentStatus: Status
}

type ConvertResponseToTreeArgs = {
  nodes: GenericNode[]
  parentStatus?: Status
  path?: number[]
}

// Hook
export const useTreeConversions = () => {
  const checkIfIndeterminate = (children: GenericNode[]): boolean =>
    children.some(
      (child) =>
        child.marked === true || checkIfIndeterminate(child.contents ?? child.content ?? []),
    )

  const checkIfChecked = (children: GenericNode[]): boolean =>
    children.length !== 0 &&
    children.every(
      (child) => child.marked === true || checkIfChecked(child.contents ?? child.content ?? []),
    )

  const getStatus = (args: GetStatusArgs): Status => {
    const { isMarked, content, parentStatus } = args

    if (checkIfChecked(content)) return 'checked'
    if (checkIfIndeterminate(content)) return 'indeterminate'

    if (parentStatus === 'checked') return 'checked'
    return isMarked ? 'checked' : 'unchecked'
  }

  const convertResponseToTree = (args: ConvertResponseToTreeArgs): TreeSelectorNode[] => {
    const { nodes, parentStatus = 'unchecked', path = [] } = args

    return nodes.map((node) => {
      const { id, name, content, contents } = node
      const children = content ?? contents ?? []

      const isMarked = Boolean(node.marked)
      const status = getStatus({ isMarked, content: children, parentStatus })

      const convertedChildren = convertResponseToTree({
        nodes: children,
        parentStatus: status,
        path: [...path, id],
      })

      return { id, name, status, path, children: convertedChildren }
    })
  }

  return { convertResponseToTree }
}
