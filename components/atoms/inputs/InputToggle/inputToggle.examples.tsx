/* eslint-disable no-console */
import { useState } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

import { InputToggle } from '.'

// Constants
const { colors } = theme

// Types
type Form = {
  default: boolean

  checkedEnabled: boolean
  checkedDisabled: boolean | undefined

  error: boolean
  warn: boolean
  success: boolean
}

export const InputToggleExamples = () => {
  const [formData, setFormData] = useState<Form>()

  const methods = useForm<Form>({
    defaultValues: {
      default: true,
      error: true,
    },
  })

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
        Default: {formData?.default !== undefined ? String(formData.default) : ''}
        <br />
        Checked Enabled:
        {formData?.checkedEnabled !== undefined ? String(formData.checkedEnabled) : ''}
        <br />
        Checked Disabled:
        {formData?.checkedDisabled !== undefined ? String(formData.checkedDisabled) : ''}
        <br />
        Error: {formData?.error !== undefined ? String(formData.error) : ''}
        <br />
        Warn: {formData?.warn !== undefined ? String(formData.warn) : ''}
        <br />
        Success: {formData?.success !== undefined ? String(formData.success) : ''}
      </Typography>

      <FormProvider {...methods}>
        <form className="form" onSubmit={(e) => void methods.handleSubmit(setFormData)(e)}>
          <InputToggle name="default" label="default" title="Esto es un título" />
          <br />

          <InputToggle name="checkedEnabled" label="checkedEnabled" title="Mostrar en el Store" />
          <br />

          <InputToggle
            name="checkedDisabled"
            label="checkedDisabled"
            title="Mostrar en el Store"
            rules={{ disabled: true }}
          />
          <br />

          <InputToggle
            name="error"
            label="error"
            title="Mostrar en el Store"
            colors={{
              checked: colors.semantic.danger,
              unchecked: colors.semantic.danger,
            }}
          />
          <br />

          <InputToggle
            name="warn"
            label="warn"
            title="Mostrar en el Store"
            colors={{
              checked: colors.semantic.warning,
              unchecked: colors.semantic.warning,
            }}
          />
          <br />

          <InputToggle
            name="success"
            label="success"
            title="Mostrar en el Store"
            colors={{
              checked: colors.semantic.success,
              unchecked: colors.semantic.success,
            }}
          />
          <br />

          <button type="submit">Send</button>
        </form>
      </FormProvider>
    </>
  )
}
