import { FormLoad, FormLoadProps } from '../forms/components/FormLoad'
import FormTopic from './components/formTopic.component'
import FormEditTopicStyles from './formNewEditTopic.styles'

type FormNewEditTopicProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>
}

const FormNewEditTopic = ({ formLoadProps }: FormNewEditTopicProps) => {
  const steps = [{ id: 1, element: <FormTopic /> }]

  return (
    <>
      <FormLoad steps={steps} {...formLoadProps} />

      <style jsx>{FormEditTopicStyles}</style>
    </>
  )
}

export default FormNewEditTopic
