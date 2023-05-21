/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { SelectItemModalComponent } from './selectItemModal.component'
import { SelectItemModalModel } from './selectItemModal.models'

type Form = {
  selectedItems: number[]
}

export type SelectItemModalContainerProps = {
  loading: boolean
  content: {
    title: string
    itemsTitle: string
  }
  categories: SelectItemModalModel['category'][]

  onClose: () => unknown
  onSearch: (value: string) => unknown
  onSubmit: (value: number[]) => unknown
}

export const SelectItemModalContainer = (props: SelectItemModalContainerProps) => {
  // Props
  const {
    loading,
    content,
    categories = [],

    onClose,
    onSearch,
    onSubmit,
  } = props

  // Hooks
  const methods = useForm<Form>({ defaultValues: { selectedItems: [] } })
  const { handleSubmit: handleSubmitFromLibrary, setValue } = methods

  // States
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  // Methods
  const getSelectedItems = () => {
    const items = categories
      .flatMap((category) => category.subcategories)
      .flatMap((subcategory) => subcategory.items)

    const filteredItems = items.filter((item) => item.selected)
    const adaptedItems = filteredItems.map((item) => item.id)

    setSelectedItems(adaptedItems)
  }

  const getAdaptedItems = () =>
    categories.map((category) => {
      const subcategories = category.subcategories.map((subcategory) => {
        const items = subcategory.items.map((item) => {
          const selected = selectedItems.includes(item.id)

          return { ...item, selected }
        })

        return { ...subcategory, items }
      })

      return { ...category, subcategories }
    })

  // Handlers
  const handleSubmit: SubmitHandler<Form> = async (data) => {
    onSubmit(data.selectedItems)
    setSelectedItems([])
  }

  const handleClickItem = (selectedId: number) => {
    const isAlreadySelected = selectedItems.includes(selectedId)

    const removeItem = selectedItems.filter((id) => id !== selectedId)
    const addItem = [...selectedItems, selectedId]

    setSelectedItems(isAlreadySelected ? removeItem : addItem)
  }

  // Effects
  useEffect(() => {
    if (selectedItems.length) return
    getSelectedItems()
  }, [categories])

  useEffect(() => {
    setValue('selectedItems', selectedItems)
  }, [selectedItems])

  // Render
  return (
    <FormProvider {...methods}>
      <SelectItemModalComponent
        // Data
        loading={loading}
        categories={getAdaptedItems()}
        // Events
        onClickItem={handleClickItem}
        onSearch={(event) => onSearch(event.target.value)}
        // Content
        formLoadProps={{
          title: content.title,
          onClose,
          onSubmit: (e) => void handleSubmitFromLibrary(handleSubmit)(e),
        }}
      />
    </FormProvider>
  )
}
