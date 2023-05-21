import React from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { Modal, ModalProps } from 'components/molecules/modals/Modal'

import { AnnouncementDetaliModel } from './AnnouncementDetali.models'
import { AnnouncementDetaliStyles } from './AnnouncementDetali.styles'

type FormNewEditClassRoomProps = {
  modalProps: Omit<ModalProps, 'steps'>
  data: AnnouncementDetaliModel
  isNewForm: boolean
}
const { colors } = theme

export const AnnouncementDetaliComponent = (props: FormNewEditClassRoomProps) => {
  const { modalProps, data } = props

  const AnnouncementDetaliModal = (
    <div className="container-announcement ">
      <div className="title-announcement">
        <Typography color={colors.primary[500]} variant="s1">
          Información del anuncio
        </Typography>
      </div>
      <div className="content-announcement">
        <Typography variant="label" color={colors.neutrals[400]}>
          ASUNTO DEL ANUNCIO *
        </Typography>
        <Typography variant="s2" color={colors.neutrals[400]}>
          {data.announcement}
        </Typography>
        <Typography variant="label" color={colors.neutrals[400]}>
          Destinatario *
        </Typography>
        <Typography variant="s2" color={colors.neutrals[400]}>
          {data.destiny}
        </Typography>
        <Typography variant="label" color={colors.neutrals[400]}>
          Mensaje del anuncio *
        </Typography>
        <Typography variant="s2" color={colors.neutrals[400]}>
          {data.msg}
        </Typography>
      </div>

      <style jsx>{AnnouncementDetaliStyles}</style>
    </div>
  )
  const step = [{ id: 1, element: AnnouncementDetaliModal }]

  return <Modal steps={step} {...modalProps} />
}
