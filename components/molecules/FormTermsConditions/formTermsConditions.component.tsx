import { FormLoad, FormLoadProps } from '../forms/components/FormLoad'
import TermsCondition from './components/termsCondition.component'
import FormTermConditionStyles from './formTermsConditions.styles'

type FormTermsConditionProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>
}

const FormTermsCondition = ({ formLoadProps }: FormTermsConditionProps) => {
  const steps = [{ id: 1, element: <TermsCondition /> }]

  return (
    <>
      <FormLoad steps={steps} {...formLoadProps} />

      <style jsx>{FormTermConditionStyles}</style>
    </>
  )
}

export default FormTermsCondition
