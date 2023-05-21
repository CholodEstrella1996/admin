import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Divider } from '@mui/material'

import { InputText } from 'components/atoms/inputs/InputText'

import { FormLoad, FormLoadProps } from '../forms/components/FormLoad'
import { StoreAdmin } from '../forms/components/StoreAdmin'
import { FormNewEditEditorialStyles } from './formNewEditEditorial.styles'

const { colors } = theme

type FormNewEditEditorialProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>
}

const FormNewEditEditorial = ({ formLoadProps }: FormNewEditEditorialProps) => {
  const formEditTopic = (
    <>
      <section className="search__container">
        <div className="infoEditorial__content">
          <Typography variant="s1" color={colors.primary[500]}>
            Información de la Editorial
          </Typography>

          <InputText
            name="editorialName"
            label="Nombre de la editorial"
            rules={{ required: true, maxLength: 50 }}
          />
        </div>

        <Divider orientation="vertical" flexItem />

        <div className="admStore__content">
          <StoreAdmin
            inputs={[
              { type: 'disponibility', name: 'editorialDisponibility' },
              { type: 'icon', name: 'editorialIcon', rules: { required: true } },
            ]}
          />
        </div>
      </section>

      <style jsx>{FormNewEditEditorialStyles}</style>
    </>
  )
  const steps = [
    {
      id: 1,
      element: formEditTopic,
    },
  ]

  return <FormLoad steps={steps} {...formLoadProps} />
}

export default FormNewEditEditorial
