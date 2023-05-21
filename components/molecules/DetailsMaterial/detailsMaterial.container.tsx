import { useState, useEffect } from 'react'

import Spinner from 'components/atoms/Spinner'
import { ResponseMaterial } from 'services/models/material.model'
import materialService from 'services/modules/material.module'

import { useNotification } from '../../../utils/hooks/notification'
import DetailsMaterialComponent from './detailsMaterial.component'

type Props = {
  idMaterial: number
  onClose: () => void
}

const DetailsMaterial = ({ idMaterial, onClose }: Props) => {
  const [dataApi, setDataApi] = useState<ResponseMaterial>()
  const { onError } = useNotification()

  useEffect(() => {
    async function getFrom() {
      try {
        const resTranslations = await materialService.getMaterialTranslations(idMaterial)
        setDataApi(resTranslations.data)
      } catch {
        onError('Error al cargar los datos')
      }
    }
    if (idMaterial) void getFrom()
  }, [idMaterial, onError])

  return dataApi ? (
    <DetailsMaterialComponent
      onClose={onClose}
      dataTabs={dataApi.content}
      detailMaterial={dataApi.content[0]}
    />
  ) : (
    <Spinner />
  )
}

export default DetailsMaterial
