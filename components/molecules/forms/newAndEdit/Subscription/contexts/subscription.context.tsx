import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'

// Types
type Value = SubscriptionsResponse['getSubscriptionDraft']

type ContextValue = {
  value: Value | null
  setSubscriptionDraft: Dispatch<SetStateAction<Value | null>>
}

type ProviderProps = {
  initialValue: Pick<ContextValue, 'value'>
  children: ReactNode
}

// Context
const Context = createContext({} as ContextValue)

// Provider
const SubscriptionProvider = ({ children, initialValue }: ProviderProps) => {
  const [value, setSubscriptionDraft] = useState(initialValue.value)

  const currentValue = useMemo(() => ({ value, setSubscriptionDraft }), [value])

  return <Context.Provider value={currentValue}>{children}</Context.Provider>
}

// Hook
const useSubscriptionContext = () => useContext(Context)

export { SubscriptionProvider, useSubscriptionContext }
