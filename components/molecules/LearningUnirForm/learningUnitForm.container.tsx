import { useEffect, useState } from 'react'

import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { ParamsPutAplication } from 'services/models/learningUnit.model'
import { TopicResponse } from 'services/models/topic.model'
import { learningUnitsService } from 'services/modules/learningUnits.module'
import { Content } from 'utils/models/modelsBase'

import LearningUnitForm from './learningUnitForm.component'
import { CheckResultsModel } from './learningUnitForm.model'

type LearningUnitFormContainerProps = {
  onClose: () => unknown
}

export const LearningUnitFormContainer = (props: LearningUnitFormContainerProps) => {
  // Props
  const { onClose } = props

  // Hooks
  const router = useRouter()
  const methods = useForm<CheckResultsModel>()

  // States
  const [searchResultsApi, setSearchResultsApi] = useState<Content[]>([])
  const [loading, setLoading] = useState(false)

  // Data
  const { idApplication } = router.query

  const { handleSubmit: handleSubmitFromLibrary, control } = methods
  const listSelected = useFieldArray({ control, name: 'selelectedOptions' })

  // Handlers
  const handleSubmit: SubmitHandler<CheckResultsModel> = async (data) => {
    if (data.selelectedOptions.length > 0) {
      setLoading(true)
      const { selelectedOptions } = data
      let params: ParamsPutAplication
      const respPutApplications: AxiosResponse<TopicResponse>[] = []
      selelectedOptions.map(async ({ productUnitId }, index) => {
        if (productUnitId) {
          params = {
            parentApplicationId: Number(idApplication),
          }
          respPutApplications[index] = await learningUnitsService.putApplications(
            Number(productUnitId),
            params,
          )
        }
      })
      await router.push(`/application/${Number(idApplication)}`)
    }
    setLoading(false)
  }

  // Effects
  useEffect(() => {
    async function getSearch() {
      const results = await learningUnitsService.getApplications('')
      setSearchResultsApi(results.data.content)
    }
    void getSearch()
  }, [])

  // Base props
  const formLoadProps = {
    title: 'Seleccionar unidad de aprendizaje',
    finishButtonText: 'Confirmar',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading: loading || !searchResultsApi.length,
  }

  // Render
  return (
    <FormProvider {...methods}>
      <LearningUnitForm
        apiData={searchResultsApi}
        onUpdate={(data) => listSelected.replace(data)}
        formLoadProps={formLoadProps}
      />
    </FormProvider>
  )
}
