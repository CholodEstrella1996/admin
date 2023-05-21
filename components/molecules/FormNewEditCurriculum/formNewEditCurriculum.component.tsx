import FormNewEditCurriculums from '../FormNewEditCurriculums/formNewEditCurriculums.components'
import { FormLoadProps } from '../forms/components/FormLoad'

type FormNewEditCurriculumProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>
}
const FormNewEditCurriculum = (props: FormNewEditCurriculumProps) => {
  const { formLoadProps } = props

  const content = {
    title: 'Información del Currículo',
    name: 'Nombre del currículo',
    description: 'Descripción del currículo',
  }

  return (
    <FormNewEditCurriculums
      isYear
      isDescriptionRequired
      content={content}
      formLoadProps={formLoadProps}
    />
  )
}

export default FormNewEditCurriculum
