import { useFormContext } from 'react-hook-form'

import { StoreData } from 'utils/models/reactFormFieldsTabs'

import { FormLoad, FormLoadProps } from '../forms/components/FormLoad'
import FormArea from './components/formArea.component'
import { FormNewEditAreaLocalStyles } from './formNewEditArea.styles'

type FormNewEditAreaProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>
  storeData: StoreData
}

const FormNewEditArea = ({ formLoadProps, storeData }: FormNewEditAreaProps) => {
  const { setValue } = useFormContext()

  const formEditArea = (
    <FormArea
      storeData={storeData}
      onChangeColorBase={(colors) => {
        if (setValue !== undefined) setValue('areaColor', colors)
      }}
      onChangeColorDark={(colors) => {
        if (setValue !== undefined) setValue('areaColorDark', colors)
      }}
      onChangeColorLight={(colors) => {
        if (setValue !== undefined) setValue('areaColorLight', colors)
      }}
    />
  )

  const steps = [{ id: 1, element: formEditArea }]

  return (
    <>
      <FormLoad steps={steps} {...formLoadProps} />

      <style jsx>{FormNewEditAreaLocalStyles}</style>
    </>
  )
}

export default FormNewEditArea
