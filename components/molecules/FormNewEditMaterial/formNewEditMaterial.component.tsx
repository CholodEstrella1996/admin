import { Options } from 'utils/models/reactFormFieldsTabs'

import { FormLoad, FormLoadProps } from '../forms/components/FormLoad'
import FormMaterial from './components/formMaterial.component'
import FormEditMaterialStyles from './formNewEditMaterial.styles'

type FormNewEditMaterialProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>

  typeOptions: Options[]
  authoritiesOptions: Options[]
}

const FormNewEditMaterial = ({
  authoritiesOptions,
  typeOptions,
  formLoadProps,
}: FormNewEditMaterialProps) => {
  const formEditMaterial = (
    <FormMaterial typeOptions={typeOptions} authoritiesOptions={authoritiesOptions} />
  )

  const steps = [{ id: 1, element: formEditMaterial }]

  return (
    <>
      <FormLoad steps={steps} {...formLoadProps} />

      <style jsx>{FormEditMaterialStyles}</style>
    </>
  )
}

export default FormNewEditMaterial
