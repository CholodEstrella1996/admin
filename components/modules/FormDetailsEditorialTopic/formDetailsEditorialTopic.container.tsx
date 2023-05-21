/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { ApiResponseBookTopic, ApiResponseTopicLabs } from 'services/models/book.model'
import { bookService } from 'services/modules/book.module'
import { useNotification } from 'utils/hooks/notification'

import FormDetailsEditorialTopicComponent from './formDetailsEditorialTopic.component'

type Props = {
  idBookTopic: string
  idBook?: string
}
const FormDetailsEditorialTopic = ({ idBookTopic, idBook }: Props) => {
  const [dataBookTopic, setDataBookTopic] = useState<ApiResponseBookTopic>()
  const [dataLabs, setDataLabs] = useState<ApiResponseTopicLabs>()

  const { onError } = useNotification()

  useEffect(() => {
    const getDetailBookTopic = async () => {
      try {
        if (idBookTopic) {
          const [topic, labs] = await Promise.all([
            bookService.getBookTopic(Number(idBookTopic)),
            bookService.getLabsTopic(Number(idBookTopic)),
          ])
          setDataBookTopic(topic.data)
          setDataLabs(labs.data)
        }
      } catch {
        onError('Error al cargar los datos')
      }
    }
    if (idBookTopic) void getDetailBookTopic()
  }, [idBookTopic])
  return !!dataBookTopic && !!dataLabs ? (
    <FormDetailsEditorialTopicComponent
      dataBookTopic={dataBookTopic}
      dataLabsTopic={dataLabs}
      idBookTopic={Number(idBookTopic)}
      idBook={Number(idBook)}
    />
  ) : null
}

export default FormDetailsEditorialTopic
