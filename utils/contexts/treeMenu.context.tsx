import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

import { TreeMenuData, TreeMenuNode } from 'components/molecules/trees/TreeMenu/treeMenu.model'

// Types
type ContextValue = {
  selectedNode: TreeMenuNode | null
  setSelectedNode: Dispatch<SetStateAction<TreeMenuNode | null>>

  treeMenuData: TreeMenuData | null
  setTreeMenuData: Dispatch<SetStateAction<TreeMenuData | null>>
}

type ProviderProps = {
  initialValue: Pick<ContextValue, 'selectedNode' | 'treeMenuData'>
  children: ReactNode
}

// Context
const Context = createContext({} as ContextValue)

// Provider
const TreeMenuProvider = ({ children, initialValue }: ProviderProps) => {
  const [selectedNode, setSelectedNode] = useState(initialValue.selectedNode)
  const [treeMenuData, setTreeMenuData] = useState(initialValue.treeMenuData)

  const value = useMemo(
    () => ({
      selectedNode,
      setSelectedNode,

      treeMenuData,
      setTreeMenuData,
    }),
    [selectedNode, treeMenuData],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

// Hook
const useTreeMenuContext = () => useContext(Context)

export { TreeMenuProvider, useTreeMenuContext }
