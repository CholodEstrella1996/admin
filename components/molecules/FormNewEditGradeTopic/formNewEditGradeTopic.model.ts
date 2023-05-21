import { UseFormReturn } from 'react-hook-form'

import { FormNewEditCurriculumsModel } from '../FormNewEditCurriculums/formNewEditCurriculums.model'

export type FormNewEditGradeTopicProps = {
  parentId?: number
  idTopic?: number
  isNewForm: boolean
  onSubmit?: () => Promise<void>
  onClose: () => void
  methods?: UseFormReturn<FormNewEditCurriculumsModel, object>
}
