/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useId } from 'react'

import { useFormContext } from 'react-hook-form'

import { InputBaseProps } from 'components/atoms/inputs/InputBase'
import Spinner from 'components/atoms/Spinner'

import { TreeSelectorProvider, useTreeSelectorContext } from './contexts/treeSelector.context'
import { TreeSelectorComponent } from './treeSelector.component'
import type { TreeSelectorNode } from './treeSelector.models'

export type TreeSelectorContainerProps = {
  id?: InputBaseProps['id']
  name: InputBaseProps['name']
  rules?: InputBaseProps['rules']

  className?: string

  loading?: boolean
  searchValue?: string
}

const Component = (props: TreeSelectorContainerProps) => {
  // Props
  const {
    id: idProp,
    name,
    rules = { required: false, disabled: false },
    className = '',

    loading = false,
    searchValue: searchValueProp = '',
  } = props

  // Hooks
  const selectorId = useId()
  const { register, setValue, watch } = useFormContext()
  const { setNodes } = useTreeSelectorContext()

  // Data
  const { onChange } = register(name, rules)
  const watchedValue = watch(name) as TreeSelectorNode[] | undefined

  // Handlers
  const handleChange = (newValue: TreeSelectorNode[]) => {
    const value = newValue.length ? newValue : watchedValue

    void onChange({ target: { value } })
    setValue(name, value)
  }

  // Effects
  useEffect(() => {
    if (!watchedValue) return

    setNodes(watchedValue)
  }, [watchedValue])

  // Render
  if (loading || !watchedValue) return <Spinner />

  return (
    <div id={idProp ?? selectorId} className={className}>
      <TreeSelectorComponent searchValue={searchValueProp} onChange={handleChange} />
    </div>
  )
}

export const TreeSelectorContainer = (props: TreeSelectorContainerProps) => (
  <TreeSelectorProvider initialValue={{ nodes: [] }}>
    <Component {...props} />
  </TreeSelectorProvider>
)
