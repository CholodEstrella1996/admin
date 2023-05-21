import FormNewEditCurriculums from '../FormNewEditCurriculums/formNewEditCurriculums.components'
import { FormLoadProps } from '../forms/components/FormLoad'

type FormNewEditCurriculumGradeProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>
}

const FormNewEditCurriculumGrade = (props: FormNewEditCurriculumGradeProps) => {
  const { formLoadProps } = props

  const content = {
    title: 'Información del Grado',
    name: 'Nombre del grado',
    description: 'Descripción del grado',
  }

  return <FormNewEditCurriculums content={content} formLoadProps={formLoadProps} />
}

export default FormNewEditCurriculumGrade
