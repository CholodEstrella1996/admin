/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import { useNotification } from 'utils/hooks/notification'

import { AnnouncementDetaliComponent } from './AnnouncementDetali.component'
import { AnnouncementDetaliModel } from './AnnouncementDetali.models'
import { mock } from './mock'

type AnnouncementDetaliContainerProps = {
  isNewForm: boolean
  onClose: () => void
  idSuscription?: number
}

export const AnnouncementDetaliContainer = (props: AnnouncementDetaliContainerProps) => {
  const { isNewForm = false, onClose } = props
  const [loading, setLoading] = useState(true)
  const [announcement, setAnnouncement] = useState<AnnouncementDetaliModel>()

  const methods = useForm<AnnouncementDetaliModel>()
  const { onError } = useNotification()

  const getDataApiData = async () => {
    try {
      setAnnouncement(mock)
      setLoading(false)
    } catch {
      setLoading(false)
      onError('Error al obtener datos del Aula')
      onClose()
    }
  }

  useEffect(() => {
    void getDataApiData()
  })

  const modalProps = {
    title: 'Anuncio',
    onClose,
    loading,
  }

  if (announcement) {
    return (
      <FormProvider {...methods}>
        <AnnouncementDetaliComponent
          modalProps={modalProps}
          data={announcement}
          isNewForm={isNewForm}
        />
      </FormProvider>
    )
  }
  return null
}
