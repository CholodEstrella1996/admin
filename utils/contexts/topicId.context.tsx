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
const TopicIdProvider = ({ children, value }: ProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
)

// Hook
const useTopicIdContext = () => useContext(Context)

export { TopicIdProvider, useTopicIdContext }
