import FormNewEditCurriculums from '../FormNewEditCurriculums/formNewEditCurriculums.components'
import { FormLoadProps } from '../forms/components/FormLoad'

type FormNewEditGradeTopicProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>
}

const FormNewEditGradeTopic = (props: FormNewEditGradeTopicProps) => {
  const { formLoadProps } = props

  const content = {
    title: 'Información del Tema',
    name: 'Nombre del tema',
    description: 'Descripción del tema',
  }

  return (
    <FormNewEditCurriculums isDescriptionRequired content={content} formLoadProps={formLoadProps} />
  )
}

export default FormNewEditGradeTopic
