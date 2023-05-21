/* eslint-disable no-console */
import { useState } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

import { InputCheckbox } from '.'
import { InputCheckboxOption } from './inputCheckbox.component'

// Constants
const { colors } = theme

// Types
type Form = {
  default: InputCheckboxOption[]

  checkedEnabled: InputCheckboxOption[]
  checkedDisabled: InputCheckboxOption[]
}

export const InputCheckboxExamples = () => {
  const [formData, setFormData] = useState<Form>()

  const methods = useForm<Form>()

  // Get data from one field
  const value = useWatch({ name: 'default', control: methods.control })
  console.log({ inputValue: value })
  console.log({ formData })

  return (
    <>
      <Typography variant="h1" color={colors.neutrals[300]} weight="semibold">
        Formulario
      </Typography>

      <Typography variant="p1">
        {formData?.default?.map((item) => (
          <>
            {item.indeterminate ? `${item.name} - indeterminate` : item.name}
            <br />
          </>
        ))}
      </Typography>

      <FormProvider {...methods}>
        <form className="form" onSubmit={(e) => void methods.handleSubmit(setFormData)(e)}>
          <div className="container">
            <InputCheckbox
              name="default"
              label="default"
              options={[
                { id: 1, name: 'default', displayName: 'Predeterminado', disabled: false },
                { id: 2, name: 'checkedEnabled', displayName: 'Habilitado', disabled: false },
                { id: 3, name: 'checkedDisabled', displayName: 'Deshabilitado', disabled: true },
              ]}
              titlePosition="right"
            />
          </div>

          <button type="submit">Send</button>
        </form>
      </FormProvider>

      <style jsx>{`
        .form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1rem;
          background-color: #eee;
          width: 30rem;
          margin: 0 auto;
        }
      `}</style>
    </>
  )
}
