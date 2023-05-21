import { useState } from 'react'

import { AxiosResponse } from 'axios'

import { SelectItemModalModel } from 'components/molecules/modals/SelectItemModal/selectItemModal.models'
import { ParamsPutAplication } from 'services/models/learningUnit.model'
import { TopicResponse } from 'services/models/topic.model'
import { learningUnitsService } from 'services/modules/learningUnits.module'

import { useNotification } from './notification'

const useLearningUnits = (parentId: string) => {
  // Hooks
  const { onError, onSuccess } = useNotification()

  // States
  const [learningUnits, setLearningUnits] = useState<SelectItemModalModel['category'][]>([])
  const [loading, setLoading] = useState(true)

  // Methods
  const getLearningUnits = async () => {
    setLoading(true)
    try {
      const { data } = await learningUnitsService.getLearningUnits(parentId)

      const { content: categories } = data
      const adaptedItems = categories.map(({ name: categoryName, contents: subcategories }) => ({
        name: categoryName,
        subcategories: subcategories.map(({ name: subcategoryName, contents: items }) => ({
          name: subcategoryName,
          items: items.map(({ marked, ...args }) => ({ ...args, selected: !!marked })),
        })),
      }))

      setLearningUnits(adaptedItems)
    } catch {
      onError('Error al obtener unidades de aprendizaje')
    }
    setLoading(false)
  }

  const searchLearningUnits = async (value: string) => {
    setLoading(true)
    try {
      if (value === '') {
        void getLearningUnits()
        return
      }

      const { data } = await learningUnitsService.searchLearningUnits(parentId, value)
      const { content: categories } = data

      const adaptedItems = categories.map(({ name: categoryName, contents: subcategories }) => ({
        name: categoryName,
        subcategories: subcategories.map(({ name: subcategoryName, contents: items }) => ({
          name: subcategoryName,
          items: items.map(({ marked, ...args }) => ({ ...args, selected: !!marked })),
        })),
      }))

      setLearningUnits(adaptedItems)
    } catch {
      onError('Error al obtener unidades de aprendizaje')
    }
    setLoading(false)
  }

  const updateLearningUnits = async (value: number[]) => {
    try {
      let params: ParamsPutAplication
      const respPutApplications: AxiosResponse<TopicResponse>[] = []
      value.map(async (id) => {
        if (id) {
          params = {
            parentApplicationId: Number(parentId),
          }
          // eslint-disable-next-line no-console
          console.log(params)
          respPutApplications[id] = await learningUnitsService.putApplications(Number(id), params)
        }
      })
      onSuccess('Se actualizaron las unidades de aprendizaje correctamente')
    } catch {
      onError('Ocurrió un error al guardar los cambios. Por favor, intenta nuevamente.')
    }
  }

  // Results
  return {
    getLearningUnits,
    searchLearningUnits,
    updateLearningUnits,

    selectLearningUnitsProps: {
      content: {
        title: 'Seleccionar unidad de aprendizaje',
        itemsTitle: 'Seleccione unidades de aprendizaje',
      },
      categories: learningUnits,
      loading,
      onSearch: searchLearningUnits,
    },
  }
}

export default useLearningUnits
