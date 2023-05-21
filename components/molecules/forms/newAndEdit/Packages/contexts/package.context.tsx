import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

import { PackageResponse } from 'services/models/packages/response.model'
// Types
type Value = PackageResponse['getPackageDraft']

type ContextValue = {
  value: Value | null
  setPackageDraft: Dispatch<SetStateAction<Value | null>>
}

type ProviderProps = {
  initialValue: Pick<ContextValue, 'value'>
  children: ReactNode
}

// Context
const Context = createContext({} as ContextValue)

// Provider
const PackageProvider = ({ children, initialValue }: ProviderProps) => {
  const [value, setPackageDraft] = useState(initialValue.value)

  const currentValue = useMemo(() => ({ value, setPackageDraft }), [value])

  return <Context.Provider value={currentValue}>{children}</Context.Provider>
}

// Hook
const usePackageContext = () => useContext(Context)

export { PackageProvider, usePackageContext }
