import { useState } from 'react'

import { SelectItemModalModel } from 'components/molecules/modals/SelectItemModal/selectItemModal.models'
import { labsService } from 'services/modules/labs.module'

import { useNotification } from './notification'

const useLabs = (parentId: string) => {
  // Hooks
  const { onError, onSuccess } = useNotification()

  // States
  const [labs, setLabs] = useState<SelectItemModalModel['category'][]>([])
  const [loading, setLoading] = useState(true)

  // Methods
  const getLabs = async () => {
    setLoading(true)
    try {
      const { data } = await labsService.getLabs(parentId)

      const { content: categories } = data
      const adaptedItems = categories.map(({ name: categoryName, contents: subcategories }) => ({
        name: categoryName,
        subcategories: subcategories.map(({ name: subcategoryName, contents: items }) => ({
          name: subcategoryName,
          items: items.map(({ marked, ...args }) => ({ ...args, selected: !!marked })),
        })),
      }))

      setLabs(adaptedItems)
    } catch {
      onError('Error al obtener laboratorios')
    }
    setLoading(false)
  }

  const searchLabs = async (value: string) => {
    setLoading(true)
    try {
      if (value === '') {
        void getLabs()
        return
      }

      const { data } = await labsService.searchLabs(parentId, value)
      const { content: categories } = data

      const adaptedItems = categories.map(({ name: categoryName, contents: subcategories }) => ({
        name: categoryName,
        subcategories: subcategories.map(({ name: subcategoryName, contents: items }) => ({
          name: subcategoryName,
          items: items.map(({ marked, ...args }) => ({ ...args, selected: !!marked })),
        })),
      }))

      setLabs(adaptedItems)
    } catch {
      onError('Error al obtener laboratorios')
    }
    setLoading(false)
  }

  const updateLabs = async (value: number[]) => {
    try {
      await labsService.saveLabs(parentId, { productUnitIds: value })
      onSuccess('Se actualizaron los laboratorios correctamente')
    } catch {
      onError('Ocurrió un error al guardar los cambios. Por favor, intenta nuevamente.')
    }
  }

  // Results
  return {
    getLabs,
    searchLabs,
    updateLabs,

    selectLabsProps: {
      content: {
        title: 'Seleccionar laboratorio',
        itemsTitle: 'Seleccione laboratorios',
      },
      categories: labs,
      loading,
      onSearch: searchLabs,
    },
  }
}

export default useLabs
