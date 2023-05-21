/* eslint-disable no-console */
import { useState } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

import { InputChip } from '.'

// Constants
const { colors } = theme

const keywords = [
  'keyword 1',
  'keyword 2',
  'keyword 3',
  'keyword 4',
  'keyword 5',
  'keyword 6',
  'keyword 7',
  'keyword 8',
  'keyword 9',
  'keyword 10',
]

const countries = [
  'Argentina',
  'Brasil',
  'Chile',
  'Colombia',
  'Ecuador',
  'Perú',
  'Uruguay',
  'Venezuela',
]

// Types
type Form = {
  keywords: string[]
  country: string[]
  disabled: string[]
}

export const InputChipExamples = () => {
  const [formData, setFormData] = useState<Form>()

  const methods = useForm<Form>({
    defaultValues: { country: ['Brasil', 'Ecuador', 'Perú'] },
  })

  // Get data from one field
  const value = useWatch({ name: 'keywords', control: methods.control })
  console.log({ inputValue: value })
  console.log({ formData })

  return (
    <>
      <Typography variant="h1" color={colors.neutrals[300]} weight="semibold">
        Formulario
      </Typography>

      <Typography variant="p1">
        Keywords: {formData?.keywords.map((keyword) => `${keyword}, `)} <br />
        Country: {formData?.country.map((country) => `${country}, `)}
      </Typography>

      <FormProvider {...methods}>
        <form className="form" onSubmit={(e) => void methods.handleSubmit(setFormData)(e)}>
          <InputChip
            name="keywords"
            label="Keywords"
            options={keywords}
            rules={{ required: true }}
          />

          <InputChip
            name="country"
            label="Countries"
            options={countries}
            maxSelectedOptions={4}
            placeholder="Ingresa un país"
          />

          <InputChip
            name="disabled"
            label="Disabled"
            options={['disabled']}
            rules={{ disabled: true }}
          />

          <button type="submit">Send</button>
          <button type="button" onClick={() => methods.reset({ keywords: ['hola'] })}>
            Reset
          </button>
        </form>
      </FormProvider>
    </>
  )
}
