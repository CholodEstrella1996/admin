import { InputText } from 'components/atoms/inputs/InputText'
import { FormLoad, FormLoadProps } from 'components/molecules/forms/components/FormLoad'

import { TechnicalDetailsStyles } from './technicalDetails.styles'

type Props = {
  formLoadProps: Omit<FormLoadProps, 'steps'>
}

const TechnicalDetails = (props: Props) => {
  const { formLoadProps } = props

  const formEditorialBook = (
    <>
      <section className="metadata">
        <InputText
          name="appleUrl"
          label="Enlace AppStore"
          rules={{ required: true }}
          className="appstore-link"
        />
        <InputText name="version" label="Versión" rules={{ required: true }} />
        <InputText name="securityVersion" label="Versión de Seguridad" rules={{ required: true }} />
        <InputText
          name="AndroidPackageName"
          label="Package Name Android"
          rules={{ required: true }}
          className="android-package-name"
        />
      </section>
      <style jsx>{TechnicalDetailsStyles}</style>
    </>
  )

  const steps = [{ id: 1, element: formEditorialBook }]

  return <FormLoad steps={steps} {...formLoadProps} />
}

export default TechnicalDetails
