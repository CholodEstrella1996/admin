/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useTreeMenuContext } from 'utils/contexts/treeMenu.context'
import { getSectionByRoute } from 'utils/hooks/useTreeMenu'

import { TreeMenuNode } from '../subMenu.model'
import { Node } from './Node/node.component'

type ItemProps = {
  node: TreeMenuNode
  children: ReactNode
}

export const Item = ({ node, children }: ItemProps) => {
  // Data
  const { contents } = node

  // Hooks
  const { selectedNode, setSelectedNode } = useTreeMenuContext()
  const router = useRouter()

  // States
  const [expanded, setExpanded] = useState(false)

  // Flags
  const selected = selectedNode?.id === node.id
  const withIcon = !!contents?.length
  const withAvatar = getSectionByRoute(node.kind) === 'area' && !contents

  // Methods
  const getSelectedChild = ({ kind, id, contents: childItems }: TreeMenuNode) => {
    const url = `/${kind}/${id}`
    if (router.asPath === url) {
      setExpanded(true)
      return true
    }

    if (!childItems) return false

    const hasSelectedChild = childItems.some((childItem) => getSelectedChild(childItem))

    return hasSelectedChild
  }

  // Handlers
  const handleClick = () => {
    if (router.asPath !== `/${node.kind}/${node.id}`) {
      const url = `/${node.kind}/${node.id}`
      void router.push(url)

      return
    }
    setSelectedNode(node)
  }

  const handleExpand = () => setExpanded((prev) => !prev)

  // Effects
  useEffect(() => {
    if (router.asPath === `/${node.kind}/${node.id}`) setSelectedNode(node)

    getSelectedChild(node)
  }, [router.asPath])

  // Render
  return (
    <li className={`item ${withAvatar ? 'item--with-avatar' : ''}`}>
      <Node
        node={node}
        expanded={expanded}
        selected={selected}
        withIcon={withIcon}
        withAvatar={withAvatar}
        onClick={handleClick}
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

        .item--with-avatar {
          padding-left: 2.5rem;
        }
      `}</style>
    </li>
  )
}
