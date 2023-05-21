/* eslint-disable no-console */
import { useState } from 'react'

import { Globe2Outline } from '@easy-eva-icons/react'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { FormProvider, useForm } from 'react-hook-form'

import { InputText } from '.'

// Constants
const { colors } = theme

// Types
type Form = {
  countryFrom: string
  user: string
  countryTo: string
  reason: string
}

export const InputTextExamples = () => {
  const [formData, setFormData] = useState<Form>()

  const methods = useForm<Form>({
    defaultValues: { user: 'John Doe' },
  })

  // Get data from one field
  const value = methods.watch('countryFrom')
  console.log({ inputValue: value })

  return (
    <>
      <Typography variant="h1" color={colors.neutrals[300]} weight="semibold">
        Formulario
      </Typography>
      <Typography variant="p1">
        País de origen: {formData?.countryFrom} <br />
        Usuario: {formData?.user} <br />
        País de destino: {formData?.countryTo} <br />
        Razón de viaje: {formData?.reason}
      </Typography>

      <FormProvider {...methods}>
        <form className="form" onSubmit={(e) => void methods.handleSubmit(setFormData)(e)}>
          <div className="container">
            <Typography variant="label" color={colors.neutrals[300]} weight="semibold">
              required - small
            </Typography>

            <InputText
              name="countryFrom"
              label="País de Origen"
              placeholder="Ingresa un país"
              size="small"
            />
          </div>

          <div className="container">
            <Typography variant="label" color={colors.neutrals[300]} weight="semibold">
              withDefaultValue - medium
            </Typography>

            <InputText
              name="user"
              label="Usuario"
              placeholder="Ingresa un nombre de usuario"
              size="medium"
              rules={{ maxLength: 10 }}
            />
          </div>

          <div className="container">
            <Typography variant="label" color={colors.neutrals[300]} weight="semibold">
              disabled - withIcon - large
            </Typography>

            <InputText
              name="countryTo"
              label="País de Destino"
              placeholder="Ingresa un país"
              size="large"
              icon={<Globe2Outline />}
              rules={{ disabled: true }}
            />
          </div>

          <div className="container">
            <Typography variant="label" color={colors.neutrals[300]} weight="semibold">
              TextArea
            </Typography>

            <InputText
              name="reason"
              label="Razón"
              placeholder="Ingresa la razón del viaje"
              multiline
              rows={5}
              cols={10}
              rules={{ required: true }}
            />
          </div>

          <button type="submit">Send</button>
        </form>
      </FormProvider>

      <style jsx>{`
        .form {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          gap: 1rem;
        }

        .container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-bottom: 1rem;
        }
      `}</style>
    </>
  )
}
