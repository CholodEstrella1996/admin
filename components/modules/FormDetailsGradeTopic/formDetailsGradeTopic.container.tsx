/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { ApiResponseTopicLabs } from 'services/models/book.model'
import { ApiResponseAssignature } from 'services/models/curriculums'
import { bookService } from 'services/modules/book.module'
import { curriculumService } from 'services/modules/curriculums'
import { useNotification } from 'utils/hooks/notification'

import FormDetailsGradeTopicComponent from './formDetailsGradeTopic.component'

type Props = {
  gradeTopicId: string
}
const FormDetailsCurriculumAssignature = ({ gradeTopicId }: Props) => {
  const [dataGradeTopic, setDataGradeTopic] = useState<ApiResponseAssignature>()
  const [dataLabs, setDataLabs] = useState<ApiResponseTopicLabs>()

  const { onError } = useNotification()

  useEffect(() => {
    const getDetailGradeTopic = async () => {
      try {
        if (!gradeTopicId) return
        const [gradeTopic, labs] = await Promise.all([
          curriculumService.getAssignature(Number(gradeTopicId)),
          bookService.getLabsTopic(Number(gradeTopicId)),
        ])
        setDataGradeTopic(gradeTopic.data)
        setDataLabs(labs.data)
      } catch {
        onError('Error al cargar los datos')
      }
    }
    if (gradeTopicId) void getDetailGradeTopic()
  }, [])

  return !!dataGradeTopic && !!dataLabs ? (
    <FormDetailsGradeTopicComponent
      dataAssignature={dataGradeTopic}
      dataLabsTopic={dataLabs}
      idAssignature={Number(gradeTopicId)}
    />
  ) : null
}

export default FormDetailsCurriculumAssignature
