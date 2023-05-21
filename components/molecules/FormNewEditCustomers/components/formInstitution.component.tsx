/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { InputFile } from 'components/atoms/inputs/InputFile'
import { InputSelect } from 'components/atoms/inputs/InputSelect'
import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { InputText } from 'components/atoms/inputs/InputText'

import {
  FormNewEditCustomersGlobalStyles,
  FormNewEditCustomersLocalStyles,
} from '../formNewEditCustomers.styles'

type FormInstitutionProps = {
  optionEducation?: InputSelectOption[]
  optionInstitution?: InputSelectOption[]
  optionCountries?: InputSelectOption[]
  optionCities?: InputSelectOption[]
  optionIdentity?: InputSelectOption[]
  optionStates?: InputSelectOption[]
}

const { colors } = theme

const FormInstitution = (props: FormInstitutionProps) => {
  const {
    optionEducation,
    optionInstitution,
    optionCountries,
    optionStates,
    optionCities,
    optionIdentity,
  } = props

  return (
    <>
      <div className="container-institution">
        <Typography color={colors.primary[500]} variant="s1">
          Datos de la institución
        </Typography>
        <div className="content-user">
          <div className="input-user2">
            <InputText
              name="organization.nameOrganization"
              label="Nombre de la institución"
              rules={{ required: true, maxLength: 100 }}
            />
          </div>
        </div>
        <div className="content-user">
          <div className="input-user2">
            <InputSelect
              name="organization.educationKindOrganization"
              label="Tipo de educación"
              options={optionEducation!}
              rules={{ required: true }}
              className="select-width"
            />
          </div>
          <div className="input-user2">
            <InputSelect
              name="organization.kindOrganization"
              label="Tipo de institución"
              options={optionInstitution!}
              rules={{ required: true }}
              className="select-width"
            />
          </div>
        </div>
        <div className="content-user">
          <div className="input-user1">
            <InputSelect
              name="organization.countryOrganization"
              options={optionCountries ?? []}
              label="País"
              className="select-width"
              rules={{ required: true }}
              withSearch
              size="small"
            />
          </div>
          <div className="input-user1">
            <InputSelect
              name="organization.stateOrganization"
              options={optionStates ?? []}
              label="Provincia/Estado"
              rules={{ required: true }}
              withSearch
              size="small"
              className="select-width"
            />
          </div>
          <div className="input-user1">
            <InputSelect
              name="organization.cityOrganization"
              options={optionCities ?? []}
              label="Ciudad"
              rules={{ required: true }}
              withSearch
              size="small"
              className="select-width"
            />
          </div>
        </div>
        <div className="content-user">
          <div className="input-user2">
            <InputText
              name="organization.addressOrganization"
              label="Domicilio"
              rules={{ required: true, maxLength: 100 }}
            />
          </div>
          <div className="input-user1">
            <InputText
              name="organization.postalCodeOrganization"
              label="Código postal"
              rules={{ required: true, maxLength: 10 }}
            />
          </div>
        </div>
        <div className="content-user">
          <div className="input-user1">
            <InputText
              name="organization.phoneOrganization"
              label="Teléfono"
              rules={{ required: true }}
            />
          </div>
          <div className="input-user1">
            <InputSelect
              name="organization.identityTypeOrganization"
              options={optionIdentity ?? []}
              label="Tipo de id"
              className="select-width"
              rules={{ required: true }}
            />
          </div>
          <div className="input-user1">
            <InputText
              name="organization.identityNumberOrganization"
              label="ID"
              rules={{ required: true }}
            />
          </div>
        </div>
        <div className="content-avatar">
          <InputFile name="logo" accept="image/*" maxUploads={1} label="Logo" />
        </div>
      </div>
      <style jsx>{FormNewEditCustomersLocalStyles}</style>
      <style jsx global>
        {FormNewEditCustomersGlobalStyles}
      </style>
    </>
  )
}
export default FormInstitution
