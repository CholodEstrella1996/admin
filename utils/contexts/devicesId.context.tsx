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
const DevicesIdProvider = ({ children, value }: ProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
)

// Hook
const useDevicesIdContext = () => useContext(Context)

export { DevicesIdProvider, useDevicesIdContext }
