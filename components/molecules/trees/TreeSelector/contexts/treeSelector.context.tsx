import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

import type { TreeSelectorNode } from '../treeSelector.models'

// Types
type Node = TreeSelectorNode

type ContextValue = {
  nodes: Node[]
  setNodes: Dispatch<SetStateAction<Node[]>>
}

type ProviderProps = {
  initialValue: Pick<ContextValue, 'nodes'>
  children: ReactNode
}

// Context
const Context = createContext({} as ContextValue)

// Provider
const TreeSelectorProvider = ({ children, initialValue }: ProviderProps) => {
  const [nodes, setNodes] = useState(initialValue.nodes)

  const value = useMemo(() => ({ nodes, setNodes }), [nodes])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

// Hook
const useTreeSelectorContext = () => useContext(Context)

export { TreeSelectorProvider, useTreeSelectorContext }
