/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { Dialog } from 'components/atoms/Dialog'

import { Items } from './components/items.component'
import { useTreeSelectorContext } from './contexts/treeSelector.context'
import { useTreeSelector } from './hooks/useTreeSelector'
import type { TreeSelectorNode } from './treeSelector.models'

export type TreeSelectorComponentProps = {
  searchValue?: string

  onChange: (nodes: TreeSelectorNode[]) => unknown
}

export const TreeSelectorComponent = (props: TreeSelectorComponentProps) => {
  // Props
  const { searchValue: searchValueProp, onChange } = props

  // Hooks
  const { nodes: nodesFromContext } = useTreeSelectorContext()
  const { searchNodes } = useTreeSelector()

  // States
  const [filteredNodes, setFilteredNodes] = useState<TreeSelectorNode[]>([])

  // Effects
  useEffect(() => {
    if (!searchValueProp) {
      setFilteredNodes(nodesFromContext)
      return
    }

    const filteredNodesBySearchValue = searchNodes({
      nodes: nodesFromContext,
      searchValue: searchValueProp,
    })

    setFilteredNodes(filteredNodesBySearchValue)
  }, [searchValueProp, nodesFromContext])

  // Render
  if (filteredNodes.length === 0)
    return (
      <Dialog
        message={searchValueProp ? 'No se encontraron resultados' : 'No hay opciones cargadas'}
        type="warning"
      />
    )

  return (
    <div className="container">
      <Items nodes={filteredNodes} onChange={onChange} />

      <style jsx>{`
        .container > :global(.items) {
          padding-left: 0;
        }
      `}</style>
    </div>
  )
}
