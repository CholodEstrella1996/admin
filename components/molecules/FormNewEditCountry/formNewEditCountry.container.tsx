/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { GroupsByIdResponse } from 'services/models/groups.model'
import { groupsService } from 'services/modules/groups.module'
import { addValidationFieldsCountry } from 'utils/helpers/addValidationFields'
import { convertResourceToFile } from 'utils/helpers/convertResourceToFile'
import { useNotification } from 'utils/hooks/notification'
import { Languages } from 'utils/models/reactFormFieldsTabs'

import FormNewEditCountry from './formNewEditCountry.component'
import { FormNewEditCountryModel } from './formNewEditCountry.model'
import FormNewEditCountryService from './formNewEditCountry.service'

type FormNewEditCountryContainerProps = {
  isNewForm: boolean
  countryId?: number
  onClose: () => void
}

const FormNewEditCountryContainer = (props: FormNewEditCountryContainerProps) => {
  // Props
  const { isNewForm = false, countryId, onClose } = props

  // Hooks
  const router = useRouter()
  const { onSuccess, onError } = useNotification()
  const methods = useForm<FormNewEditCountryModel>()

  // States
  const [loading, setLoading] = useState(true)

  // Data
  const { handleSubmit: handleSubmitFromLibrary, reset } = methods

  // Methods
  const getDefaultValues = async (
    _dataCountry: GroupsByIdResponse,
    _dataTranslations: Languages[],
  ) => ({
    countryNameEN: _dataTranslations[0].content.name,
    countryNameES: _dataTranslations[1].content.name,
    countryNamePT: _dataTranslations[2].content.name,
    countryNameTR: _dataTranslations[3] ? _dataTranslations[3].content.name : '',
    countryIcon: _dataCountry.iconUrl
      ? await convertResourceToFile({ url: _dataCountry.iconUrl })
      : [],
    countryDisponibility: _dataCountry.visible,
  })

  const getCountryApiData = async () => {
    if (!isNewForm && countryId !== undefined) {
      try {
        setLoading(true)
        const [countries, translations] = await Promise.all([
          groupsService.getGroupsById(countryId),
          groupsService.getTranslations(countryId),
        ])

        const translationsFields = addValidationFieldsCountry(translations)

        if (countries) {
          const dataSetted = await getDefaultValues(countries.data, translationsFields)
          reset(dataSetted)
        }
        setLoading(false)
      } catch {
        setLoading(false)
        onError('Error al cargar los datos del país')
        onClose()
      }
    }
  }

  // Handlers
  const handleSubmit: SubmitHandler<FormNewEditCountryModel> = async (data) => {
    try {
      setLoading(true)
      const respIdCountry = await FormNewEditCountryService(data, isNewForm, Number(countryId))
      if (respIdCountry !== -1) {
        setLoading(false)
        onSuccess(`Se ${isNewForm ? 'agregó' : 'actualizó'} correctamente el país`)
        void router.push(`/country/${respIdCountry}`)
      }
      return
    } catch {
      setLoading(false)
      onError('Error al cargar datos del país')
    }
    onClose()
  }

  // Effects
  useEffect(() => {
    if (!isNewForm) void getCountryApiData()
  }, [countryId, isNewForm, onClose])

  // Base props
  const formLoadProps = {
    title: isNewForm ? 'Agregar nuevo país' : 'Editar país',
    finishButtonText: isNewForm ? 'Agregar país' : 'Guardar cambios',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading: isNewForm ? false : loading,
  }

  // Render
  return (
    <FormProvider {...methods}>
      <FormNewEditCountry formLoadProps={formLoadProps} />
    </FormProvider>
  )
}

export default FormNewEditCountryContainer
