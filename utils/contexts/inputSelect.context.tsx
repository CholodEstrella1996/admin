import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'

// Types
type Value = { [key: string]: InputSelectOption[] }

type ContextValue = {
  options: Value | null
  setOptions: Dispatch<SetStateAction<Value | null>>
}

type ProviderProps = {
  initialValue: Pick<ContextValue, 'options'>
  children: ReactNode
}

// Context
const Context = createContext({} as ContextValue)

// Provider
const InputSelectProvider = ({ children, initialValue }: ProviderProps) => {
  const [options, setOptions] = useState(initialValue.options)

  const value = useMemo(() => ({ options, setOptions }), [options])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

// Hook
const useInputSelectContext = () => useContext(Context)

export { InputSelectProvider, useInputSelectContext }
