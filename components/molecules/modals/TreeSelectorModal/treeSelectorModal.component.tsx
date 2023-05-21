import { Search } from '@easy-eva-icons/react'
import { useFormContext } from 'react-hook-form'

import { InputText } from 'components/atoms/inputs/InputText'
import { TreeSelector } from 'components/molecules/trees/TreeSelector'

export type TreeSelectorModalComponentProps = {
  selectorName: string
  searchInputName: string
  loading?: boolean
}

export const TreeSelectorModalComponent = ({
  selectorName,
  searchInputName,
  loading = false,
}: TreeSelectorModalComponentProps) => {
  // Hooks
  const { watch } = useFormContext()

  // Data
  const searchValue = watch(searchInputName) as string | undefined

  // Render
  return (
    <div className="container">
      <InputText
        name={searchInputName}
        placeholder="Buscar"
        icon={<Search />}
        withAutocomplete={false}
        rules={{ disabled: loading }}
      />

      <TreeSelector name={selectorName} searchValue={searchValue ?? ''} />

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          width: 55rem;
          gap: 1rem;
          height: 55vh;
          overflow-y: auto;
          padding-right: 0.5rem;
        }
      `}</style>
    </div>
  )
}
