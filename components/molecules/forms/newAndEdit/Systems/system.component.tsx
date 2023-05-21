/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { InputFile } from 'components/atoms/inputs/InputFile'
import { InputText } from 'components/atoms/inputs/InputText'
import { OSSvgs } from 'constants/svgImages'
import { useNotification } from 'utils/hooks/notification'

import { FormLoad, FormLoadProps } from '../../components/FormLoad'
import { systemStyles } from './system.styles'

type FormNewEditSystemProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>

  isNewForm: boolean
}
const executables = [{ icon: OSSvgs.windows, name: 'executable', accept: '.exe' }]

const { colors } = theme

export const SystemComponent = (props: FormNewEditSystemProps) => {
  const { formLoadProps, isNewForm } = props

  const { onError } = useNotification()

  const getDataApiData = async () => {
    if (isNewForm) {
      try {
        // data
      } catch {
        onError('Error al cargar las suscripción')
      }
    }
  }
  useEffect(() => {
    void getDataApiData()
  }, [])

  const SystemForm = (
    <div className="container-classroom ">
      <div className="title-subscription">
        <Typography color={colors.primary[500]} variant="s1">
          Datos de la versión
        </Typography>
      </div>
      <div className="content-subscription">
        <InputText
          name="title"
          label="Título"
          rules={{ required: true, maxLength: 50 }}
          size="medium"
          withClear
        />

        <InputText
          name="description"
          label="DESCRIPCIÓN"
          rules={{ required: true, maxLength: 50 }}
          size="medium"
          withClear
        />
        <InputText
          name="version"
          label="VERSIÓN"
          rules={{ required: true }}
          size="medium"
          withClear
        />
        {!isNewForm ? (
          <>
            {executables.map(({ icon, ...executable }) => (
              <div className="executable" key={executable.name}>
                {icon}

                <InputFile
                  {...executable}
                  name={executable.name}
                  rules={{ required: true }}
                  className="executable-input"
                />
              </div>
            ))}
          </>
        ) : (
          <InputFile name="executable" rules={{ required: true }} className="executable-input" />
        )}
      </div>

      <style jsx>{systemStyles}</style>
    </div>
  )
  const step = [{ id: 1, element: SystemForm }]

  return <FormLoad steps={step} {...formLoadProps} />
}
