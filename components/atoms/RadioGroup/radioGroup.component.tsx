import { Divider } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

import { RadioComponent } from '../inputs/InputRadio/radio.component'
import { RadioGroupProps } from './radioGroup.model'

const RadioGroupComponent = (props: RadioGroupProps) => {
  const { control } = useFormContext()
  const { type, options } = props

  return (
    <Controller
      control={control}
      name={type}
      render={({ field: { onChange } }) => (
        <div>
          {options.map(({ name: nameRef, displayName }, index) => (
            <>
              <RadioComponent
                label={displayName}
                key={String(nameRef)}
                name={type}
                onChange={onChange}
                value={nameRef}
              />
              {options.length - 1 !== index && <Divider />}
            </>
          ))}
        </div>
      )}
    />
  )
}
export default RadioGroupComponent
