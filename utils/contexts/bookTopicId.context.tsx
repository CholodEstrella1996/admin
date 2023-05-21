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
const BookTopicIdProvider = ({ children, value }: ProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
)

// Hook
const useBookTopicIdContext = () => useContext(Context)

export { BookTopicIdProvider, useBookTopicIdContext }
