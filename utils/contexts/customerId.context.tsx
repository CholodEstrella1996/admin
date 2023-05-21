import { createContext, ReactNode, useContext } from 'react'

// Types
type Value = number

type ProviderProps = {
  value: Value
  children: ReactNode
}

// Context
const Context = createContext<Value>(0)

// Provider
const CustomerIdProvider = ({ children, value }: ProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
)

// Hook
const useCustomerIdContext = () => useContext(Context)

export { CustomerIdProvider, useCustomerIdContext }
