import FormNewEditCurriculums from '../FormNewEditCurriculums/formNewEditCurriculums.components'
import { FormLoadProps } from '../forms/components/FormLoad'

type FormNewEditCurriculoAssignutureProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>
}

const FormNewEditCurriculoAssignuture = (props: FormNewEditCurriculoAssignutureProps) => {
  const { formLoadProps } = props

  const content = {
    title: 'Información de la asignatura',
    name: 'Nombre de la asignatura',
    description: 'Descripción de la asignatura',
  }

  return <FormNewEditCurriculums content={content} formLoadProps={formLoadProps} />
}

export default FormNewEditCurriculoAssignuture
