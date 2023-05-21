/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { ResponseMaterial } from 'services/models/material.model'
import materialService from 'services/modules/material.module'
import { addValidationFieldsMaterial } from 'utils/helpers/addValidationFields'
import { convertResourceToFile } from 'utils/helpers/convertResourceToFile'
import { useNotification } from 'utils/hooks/notification'
import { Languages, Options, RFormFieldsTabs } from 'utils/models/reactFormFieldsTabs'

import FormNewEditMaterialComponent from './formNewEditMaterial.component'
import FormNewEditMaterialService from './formNewEditMaterial.service'

type Props = {
  isNewForm: boolean
  idMaterial?: number
  idApplication?: number
  onClose: () => void
}

const FormNewEditMaterialContainer = (props: Props) => {
  // Props
  const { isNewForm, idMaterial, idApplication, onClose } = props

  // Hooks
  const router = useRouter()
  const { onSuccess, onError } = useNotification()
  const methods = useForm<RFormFieldsTabs>()

  // States
  const [translations, setTranslations] = useState<AxiosResponse<ResponseMaterial>>()
  const [listType, setListType] = useState<{ id: number; name: string }[]>([])
  const [listAuth, setListAuth] = useState<{ id: number; name: string }[]>([])

  const [loading, setLoading] = useState(true)

  // Data
  const { handleSubmit: handleSubmitFromLibrary, setValue } = methods

  // Methods
  const getSelect = async () => {
    const [resListType, resListAuth] = await Promise.all([
      materialService.getMaterialType(),
      materialService.getMaterialAuth(),
    ])
    resListAuth.push({ id: 3, name: `Estudiantes y Profesores` })
    setListType(resListType)
    setListAuth(resListAuth)
  }

  const getDefaultValues = async (data: Languages[]) => ({
    fileEN: data[0].content.content?.url
      ? await convertResourceToFile({ url: data[0].content.content.url })
      : [],
    fileES: data[1].content.content?.url
      ? await convertResourceToFile({ url: data[1].content.content.url })
      : [],
    filePT: data[2].content.content?.url
      ? await convertResourceToFile({ url: data[2].content.content.url })
      : [],
    fileTR: data[3]?.content.content?.url
      ? await convertResourceToFile({ url: data[3].content.content.url })
      : [],
    materialNameEN: data[0].content.name,
    materialDescriptionEN: data[0].content.description,
    materialNameES: data[1].content.name,
    materialDescriptionES: data[2].content.description,
    materialNamePT: data[2].content.name,
    materialDescriptionPT: data[2].content.description,
    materialNameTR: data[3] ? data[3].content.name : '',
    materialDescriptionTR: data[3] ? data[3].content.description : '',
    materialType: {
      id: data[0].content.type?.id,
      name: data[0].content.type?.name,
    },
    materialAuthorities:
      data[0].content?.authorities && data[0].content?.authorities?.length < 2
        ? { id: data[0]?.content?.authorities[0]?.id, name: data[0]?.content?.authorities[0]?.name }
        : { id: 3, name: `Estudiantes y Profesores` },
  })

  const getMaterialData = async (id: number) => {
    const resTranslations = await materialService.getMaterialTranslations(id)
    setTranslations(resTranslations)

    const translationsFields = addValidationFieldsMaterial(resTranslations)
    const defaultValues = await getDefaultValues(translationsFields)
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([name, value]) =>
        setValue(name as keyof RFormFieldsTabs, value as Options),
      )
    }
  }

  const getSelectedOption = (options: Options[], selectedOption: { id: number; name: string }) => {
    const editedOptions = options.map((item: Options) => ({
      ...item,
      selected: item.id === selectedOption.id,
      disabled: false,
    }))
    return editedOptions
  }

  // Handlers
  const handleSubmit: SubmitHandler<RFormFieldsTabs> = async (formData) => {
    setLoading(true)

    let resp
    if (isNewForm)
      resp = await FormNewEditMaterialService(formData, isNewForm, listAuth, idApplication)
    else
      resp = await FormNewEditMaterialService(
        formData,
        isNewForm,
        listAuth,
        idApplication,
        idMaterial,
      )
    setLoading(false)
    if (resp === 200 && idApplication) {
      if (isNewForm) onSuccess('Se agregó correctamente el material')
      else if (!isNewForm) onSuccess('Se actualizó correctamente el material')
      void router.push(`/application/${idApplication}`)
    } else if (resp !== 200) onError('Error al actualizar material')

    onClose()
  }

  // Effects
  useEffect(() => {
    void (async () => {
      setLoading(true)
      await getSelect()
      if (!isNewForm && idMaterial) {
        await getMaterialData(idMaterial)
      }

      setLoading(false)
    })()
  }, [isNewForm, idMaterial, idApplication])

  // Other data
  const type = isNewForm
    ? listType
    : translations?.data.content[0].type &&
      getSelectedOption(listType, translations.data.content[0].type)

  const authorities = isNewForm
    ? listAuth
    : translations?.data.content[0].authorities &&
      getSelectedOption(
        listAuth,
        translations.data.content[0].authorities.length === 2
          ? listAuth[listAuth.length - 1]
          : translations.data.content[0].authorities[0],
      )

  // Base props
  const formLoadProps = {
    finishButtonText: 'Confirmar',
    title: isNewForm ? 'Nuevo Material' : 'Editar Material',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading,
  }

  // Render
  return (
    <FormProvider {...methods}>
      <FormNewEditMaterialComponent
        typeOptions={type ?? []}
        authoritiesOptions={authorities ?? []}
        formLoadProps={formLoadProps}
      />
    </FormProvider>
  )
}

export default FormNewEditMaterialContainer
