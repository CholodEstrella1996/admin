/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useState } from 'react'

import type { TreeSelectorNode } from '../treeSelector.models'
import { Node } from './Node/node.component'

type ItemProps = {
  node: TreeSelectorNode
  children: ReactNode
  onClick: () => unknown
}

export const Item = (props: ItemProps) => {
  // Props
  const { node, children, onClick } = props

  // States
  const [expanded, setExpanded] = useState(false)

  // Data
  const hasChildren = !!node.children?.length

  // Handlers
  const handleExpand = () => setExpanded((prevState) => !prevState)

  // Render
  return (
    <li className="item">
      <Node
        node={node}
        expanded={expanded}
        status={node.status}
        withIcon={hasChildren}
        onClick={onClick}
        onExpand={handleExpand}
      />

      {expanded && children}

      <style jsx>{`
        .item {
          all: unset;
          display: flex;
          flex-wrap: wrap;
          width: 100%;
        }
      `}</style>
    </li>
  )
}
