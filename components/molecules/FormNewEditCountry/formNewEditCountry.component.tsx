import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Divider } from '@mui/material'

import { FormLoad, FormLoadProps } from '../forms/components/FormLoad'
import { LanguageTabs } from '../forms/components/LanguageTabs'
import { StoreAdmin } from '../forms/components/StoreAdmin'
import { FormNewEditCountryStyles } from './formNewEditCountry.styles'

const { colors } = theme

type FormNewEditCountryProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>
}

const FormNewEditCountry = (props: FormNewEditCountryProps) => {
  const { formLoadProps } = props

  const formEditTopic = (
    <>
      <section className="search__container">
        <div className="infoCountry__content">
          <Typography variant="s1" color={colors.primary[500]}>
            Información del País
          </Typography>

          <LanguageTabs
            inputs={[
              {
                label: 'Nombre del país',
                name: (code) => `countryName${code}`,
                type: 'title',
                rules: { required: true },
              },
            ]}
          />
        </div>

        <Divider orientation="vertical" flexItem />

        <div className="admStore__content">
          <StoreAdmin
            inputs={[
              { type: 'disponibility', name: 'countryDisponibility' },
              { type: 'icon', name: 'countryIcon', rules: { required: true } },
            ]}
          />
        </div>
      </section>

      <style jsx>{FormNewEditCountryStyles}</style>
    </>
  )
  const step = [{ id: 1, element: formEditTopic }]

  return <FormLoad steps={step} {...formLoadProps} />
}

export default FormNewEditCountry
