import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Divider } from '@mui/material'

import { InputSelect, InputSelectProps } from 'components/atoms/inputs/InputSelect'
import { InputText } from 'components/atoms/inputs/InputText'

import { FormLoad, FormLoadProps } from '../../components/FormLoad'
import { LanguageTabs } from '../../components/LanguageTabs'
import { StoreAdmin } from '../../components/StoreAdmin'
import { ApplicationStep1Styles } from './application.styles'

export type ApplicationComponentProps = {
  options: InputSelectProps['options']
  formLoadProps: Omit<FormLoadProps, 'steps'>
}

export const ApplicationComponent = ({ options, formLoadProps }: ApplicationComponentProps) => {
  // Render
  const step1 = (
    <div className="step1">
      <section className="general">
        <Typography variant="s1" color={theme.colors.primary[500]}>
          Información de la Aplicación
        </Typography>

        <section className="main-info">
          <InputSelect
            name="step1.applicationType"
            rules={{ required: true, disabled: options.length === 0 }}
            label="Tipo de aplicación"
            options={options}
            className="application-type"
          />

          <InputText
            name="step1.classroomCode"
            label="Código de Aula"
            rules={{ required: true }}
            className="classroom-code"
          />
        </section>

        <LanguageTabs
          inputs={[
            {
              label: 'Nombre de la Aplicación',
              name: (code: string) => `step1.tabs.${code}.name`,
              type: 'title',
              rules: { required: true },
            },
            {
              label: 'Descripción de la Aplicación',
              name: (code: string) => `step1.tabs.${code}.description`,
              type: 'description',
              rules: { required: true },
            },
            {
              label: 'Palabras Clave',
              name: (code: string) => `step1.tabs.${code}.keywords`,
              type: 'keywords',
              rules: { required: true },
            },
          ]}
        />
      </section>

      <Divider orientation="vertical" flexItem sx={{ margin: '0 2rem' }} />

      <StoreAdmin
        inputs={[
          {
            type: 'disponibility',
            name: 'step1.storeAdministration.disponibility',
          },
          {
            type: 'icon',
            name: 'step1.storeAdministration.icon',
            rules: { required: true },
          },
          {
            type: 'price',
            name: 'step1.storeAdministration.price',
            rules: { required: true },
          },
          {
            type: 'associatedMedia',
            name: 'step1.storeAdministration.associatedMedia',
            rules: { required: true },
          },
        ]}
        fullWidth={false}
      />

      <style jsx>{ApplicationStep1Styles}</style>
    </div>
  )

  const steps = [{ id: 1, element: step1 }]

  return <FormLoad steps={steps} {...formLoadProps} />
}
