import { useTreeSelectorContext } from '../contexts/treeSelector.context'
import { useTreeSelector } from '../hooks/useTreeSelector'
import type { TreeSelectorNode } from '../treeSelector.models'
import { Item } from './item.component'

// Types
type ItemsProps = {
  nodes?: TreeSelectorNode[]

  onChange: (nodes: TreeSelectorNode[]) => unknown
}

export const Items = (props: ItemsProps) => {
  // Props
  const { nodes: nodesProp, onChange } = props

  // Hooks
  const { nodes: contextNodes } = useTreeSelectorContext()

  // Data
  const nodes = nodesProp ?? contextNodes

  // Handlers
  const { traverseAndUpdateTree } = useTreeSelector()

  const handleClick = (selectedNode: TreeSelectorNode) => {
    const status = selectedNode.status === 'checked' ? 'unchecked' : 'checked'

    const updatedTree = traverseAndUpdateTree({ nodes: contextNodes, selectedNode, status })

    onChange(updatedTree)
  }

  // Render
  return (
    <ul className="items">
      {nodes.map((node) => (
        <Item key={node.id} node={node} onClick={() => handleClick(node)}>
          <Items nodes={node.children ?? []} onChange={onChange} />
        </Item>
      ))}

      <style jsx>{`
        .items {
          all: unset;
          display: flex;
          flex-wrap: wrap;
          width: 100%;

          padding-left: 2rem;
        }
      `}</style>
    </ul>
  )
}
