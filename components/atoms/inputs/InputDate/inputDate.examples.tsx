/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

import { InputDate } from '.'
import { InputText } from '../InputText'

// Constants
const { colors } = theme

// Types
type Form = {
  endDate: string
  startDate: string
  dayCount: number
}

export const InputDateComposition = () => {
  const [formData, setFormData] = useState<Form>()

  const methods = useForm<Form>({
    // defaultValues: { startDate: '2022/11/09', endDate: '2022/12/01' },
  })

  // Get data from one field
  const valueStart = useWatch({ name: 'startDate', control: methods.control })
  const valueEnd = useWatch({ name: 'endDate', control: methods.control })
  console.log('watch:', methods.watch())

  // calcular diferencias de días
  const fechaInicio = new Date(valueStart).getTime()
  const fechaFin = new Date(valueEnd).getTime()

  const diff = fechaFin - fechaInicio ?? null

  useEffect(() => {
    if (diff) {
      const days = diff / (1000 * 60 * 60 * 24)
      methods.setValue('dayCount', days)
    }
  }, [diff])

  console.log('diferencia', diff / (1000 * 60 * 60 * 24))

  return (
    <>
      <Typography variant="h1" color={colors.neutrals[300]} weight="semibold">
        Formulario Input-Date
      </Typography>
      <Typography variant="h4">
        Fecha de inicio: {formData?.startDate} <br />
        Fecha de finalización: {formData?.endDate} <br />
      </Typography>

      <FormProvider {...methods}>
        <form className="form" onSubmit={(e) => void methods.handleSubmit(setFormData)(e)}>
          <div className="container">
            <InputDate
              name="startDate"
              label="Fecha de inicio"
              placeholder="Ingresa una fecha"
              // rules={{ disabled: true }}
            />
            <InputText name="dayCount" label="diferencias de días" />
          </div>

          <div className="container">
            <InputDate
              name="endDate"
              label="Fecha de finalizacion"
              placeholder="Ingresa una fecha"
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
          flex-direction: row;
          gap: 1rem;
          padding-bottom: 1rem;
        }
      `}</style>
    </>
  )
}
