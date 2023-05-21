/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { ResponseTermsConditions } from 'services/models/user/response.model'
import userService from 'services/modules/user.module'
import { convertLanguageCode } from 'utils/helpers/convertLanguageCode'
import { useNotification } from 'utils/hooks/notification'

import { LanguageTypes } from '../forms/newAndEdit/Application/application.models'
import FormTermsCondition from './formTermsConditions.component'
import FormNewEditTermsConditionsService, {
  FieldsTermsCondition,
} from './formTermsConditions.service'

type FormTermsConditionProps = {
  isNewForm?: boolean
  idTermsCondition?: number
  onClose: () => void
}

const FormTermsConditionContainer = (props: FormTermsConditionProps) => {
  // Props
  const { isNewForm = false, onClose, idTermsCondition } = props

  // Hooks
  const router = useRouter()
  const { onSuccess, onError } = useNotification()
  const methods = useForm<FieldsTermsCondition>()

  // States
  const [loading, setLoading] = useState(true)

  // Data
  const { handleSubmit: handleSubmitFromLibrary, reset } = methods

  // Methods
  const getTabsValues = (TCData: ResponseTermsConditions) => {
    const tabValues = TCData.translations.map(({ description, language }) => {
      const ShortLanguageCode = convertLanguageCode(language.languageCode)
      return [ShortLanguageCode, description]
    })
    const tabs = Object.fromEntries(tabValues) as unknown as { [key in LanguageTypes]: string }
    return tabs
  }

  const getTermsConditionsData = async () => {
    if (!isNewForm && idTermsCondition !== undefined) {
      try {
        setLoading(true)

        const termsCondData = await userService.getTermAndCondition(idTermsCondition)

        if (termsCondData.data.translations[0]) {
          const tabs = getTabsValues(termsCondData.data)

          const dataSeted = {
            termsCondTitle: String(termsCondData.data.title),
            termsCondVersion: String(termsCondData.data.version),
            ...tabs,
          }

          reset(dataSeted)
        }
        setLoading(false)
      } catch {
        setLoading(false)
        onError('Error al cargar los datos de términos y condiciones')
        onClose()
      }
    }
  }

  // Handlers
  const handleSubmit: SubmitHandler<FieldsTermsCondition> = async (data) => {
    try {
      setLoading(true)

      const responseIdNewEditTermsCondition = await FormNewEditTermsConditionsService(
        data,
        isNewForm,
        Number(idTermsCondition),
      )
      if (responseIdNewEditTermsCondition !== -1) void router.push('/term_and_condition')

      setLoading(false)
      onSuccess(
        `Se ${isNewForm ? 'crearon' : 'actualizaron'} correctamente los términos y condiciones`,
      )
    } catch {
      setLoading(false)
      onError('Error al cargar datos de términos y condiciones')
    }

    onClose()
  }

  // Effects
  useEffect(() => {
    void getTermsConditionsData()
  }, [isNewForm, onClose])

  // Base props
  const formLoadProps = {
    title: isNewForm ? 'Crear términos y condiciones' : 'Editar términos y condiciones',
    finishButtonText: isNewForm ? 'Agregar' : 'Guardar cambios',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading: isNewForm ? false : loading,
  }

  // Render
  return (
    <FormProvider {...methods}>
      <FormTermsCondition formLoadProps={formLoadProps} />
    </FormProvider>
  )
}

export default FormTermsConditionContainer
