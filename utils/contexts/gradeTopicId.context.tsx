import { createContext, ReactNode, useContext } from 'react'

// Types
type Value = string

type ProviderProps = {
  value: Value
  children: ReactNode
}

// Context
const Context = createContext<Value>('')

// Provider
const GradeTopicIdProvider = ({ children, value }: ProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
)

// Hook
const useGradeTopicIdContext = () => useContext(Context)

export { GradeTopicIdProvider, useGradeTopicIdContext }
