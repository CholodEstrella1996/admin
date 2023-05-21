import { TreeSelectorNode } from '../treeSelector.models'

// Types
// - General
type Status = TreeSelectorNode['status']

type BaseArgs = {
  nodes: TreeSelectorNode[]
  status: Status
}

type NodesArg = Pick<BaseArgs, 'nodes'>

// - Args
type UpdateChildrenStatusArgs = BaseArgs

type CountNodesByStatusArgs = NodesArg & {
  prevCount?: Record<Status, number>
}

type GetStatusArgs = NodesArg

type CheckIsSelectedNodeArgs = {
  currentNode: TreeSelectorNode
  selectedNode: TreeSelectorNode
}

type TraverseAndUpdateTreeArgs = BaseArgs & {
  selectedNode: TreeSelectorNode
}

type SearchNodesArgs = NodesArg & {
  searchValue: string
}

type GetNodeIdsByStatusArgs = BaseArgs & {
  type: 'withoutCheckedChildren' | 'withCheckedChildren' | 'onlyLeaves'
  prevNodeIds?: number[]
}

// Hook
export const useTreeSelector = () => {
  // Traversal and Update of tree
  const updateChildrenStatus = (args: UpdateChildrenStatusArgs): TreeSelectorNode[] => {
    const { nodes, status } = args

    return nodes.map((node) => {
      const children = updateChildrenStatus({ nodes: node.children, status })

      return { ...node, children, status }
    })
  }

  const countNodesByStatus = (args: CountNodesByStatusArgs) => {
    const { nodes, prevCount = { checked: 0, unchecked: 0, indeterminate: 0 } } = args

    return nodes.reduce((count, node) => {
      const { checked, unchecked, indeterminate } = count

      if (node.status === 'checked') return { ...count, checked: checked + 1 }
      if (node.status === 'unchecked') return { ...count, unchecked: unchecked + 1 }
      return { ...count, indeterminate: indeterminate + 1 }
    }, prevCount)
  }

  const getStatus = (args: GetStatusArgs): Status => {
    const { nodes: children } = args

    const nodesCount = countNodesByStatus({ nodes: children })

    const allChildrenChecked = nodesCount.checked === children.length
    if (allChildrenChecked) return 'checked'

    const allChildrenUnchecked = nodesCount.unchecked === children.length
    if (allChildrenUnchecked) return 'unchecked'

    return 'indeterminate'
  }

  const checkIsSelectedNode = (args: CheckIsSelectedNodeArgs) => {
    const { currentNode, selectedNode } = args

    const sameId = currentNode.id === selectedNode.id
    const sameName = currentNode.name === selectedNode.name
    const sameDisplayName = currentNode.displayName === selectedNode.displayName

    const hasSameParents = currentNode.path.every((parent) => selectedNode.path.includes(parent))

    return sameId && sameName && sameDisplayName && hasSameParents
  }

  const traverseAndUpdateTree = (args: TraverseAndUpdateTreeArgs): TreeSelectorNode[] => {
    const { nodes, selectedNode, status } = args

    const updateSelectedAndChildren = (node: TreeSelectorNode) => {
      const isSelectedNode = checkIsSelectedNode({ currentNode: node, selectedNode })
      if (!isSelectedNode) return null

      const updatedChildren = updateChildrenStatus({ nodes: node.children, status })

      return { ...node, children: updatedChildren, status }
    }

    const updateParents = (node: TreeSelectorNode) => {
      const hasChildren = node.children.length !== 0
      if (!hasChildren) return null

      const updatedChildren = traverseAndUpdateTree({ nodes: node.children, selectedNode, status })
      const parentStatus = getStatus({ nodes: updatedChildren })

      return { ...node, children: updatedChildren, status: parentStatus }
    }

    return nodes.map((node) => {
      // Update selected node and its children if it is the selected node
      const updatedSelectedAndChildren = updateSelectedAndChildren(node)

      // Update parent status if it has children
      const updatedParents = updateParents(node)

      // If the node is not selected and has no children, return the node as is
      return updatedSelectedAndChildren ?? updatedParents ?? node
    })
  }

  // Others operations
  const searchNodes = (args: SearchNodesArgs): TreeSelectorNode[] => {
    const { nodes, searchValue } = args

    return nodes.flatMap((node) => {
      const { displayName, name: defaultName, children } = node

      const name = (displayName || defaultName).toLowerCase()

      const isMatch = name.includes(searchValue.toLowerCase())
      if (isMatch) return node

      const filteredChildren = searchNodes({ nodes: children, searchValue })

      if (filteredChildren.length) return { ...node, children: filteredChildren }

      return []
    })
  }

  const getNodeIdsByStatus = (args: GetNodeIdsByStatusArgs): number[] => {
    const { nodes, type, status, prevNodeIds = [] } = args

    const types = {
      withCheckedChildren: (node: TreeSelectorNode) => {
        const sameStatus = node.status === status

        const ids = sameStatus ? [...prevNodeIds, node.id] : prevNodeIds
        if (!node.children.length) return ids

        return getNodeIdsByStatus({
          nodes: node.children,
          type,
          status,
          prevNodeIds: ids,
        })
      },

      withoutCheckedChildren: (node: TreeSelectorNode) => {
        const sameStatus = node.status === status

        if (sameStatus) return [node.id]
        if (!node.children.length) return []

        return getNodeIdsByStatus({ nodes: node.children, type, status })
      },

      onlyLeaves: (node: TreeSelectorNode) => {
        const sameStatus = node.status === status
        const isLeaf = !node.children.length && sameStatus

        if (isLeaf) return [node.id]

        return getNodeIdsByStatus({ nodes: node.children, type, status })
      },
    }

    const flattenNodes = nodes.flatMap(types[type])
    const nodeWithoutDuplicates = Array.from(new Set(flattenNodes))
    return nodeWithoutDuplicates
  }

  return { traverseAndUpdateTree, searchNodes, getNodeIdsByStatus }
}
