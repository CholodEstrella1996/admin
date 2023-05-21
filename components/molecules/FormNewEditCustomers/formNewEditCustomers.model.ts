import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { CustomerResponse } from 'services/models/customers/response.model'
import { RFile } from 'utils/models/reactFormFieldsTabs'

import { FormLoadProps } from '../forms/components/FormLoad'

export type FormNewEditCustomersProps = {
  isNewForm?: boolean
  idCustomer?: number
  optionCustomer?: InputSelectOption[]
  optionCountries?: InputSelectOption[]
  optionStates?: InputSelectOption[]
  optionStatesOrg?: InputSelectOption[]
  optionCities?: InputSelectOption[]
  optionCitiesOrg?: InputSelectOption[]
  optionUserIdentity?: InputSelectOption[]
  optionOrganizationIdentity?: InputSelectOption[]
  optionSectors?: InputSelectOption[]
  optionEducationKind?: InputSelectOption[]
  customer?: CustomerResponse['getCustomer']

  formLoadProps: Omit<FormLoadProps, 'steps'>
}

export type FormUserCustomerModel = {
  kind: InputSelectStringOption
  user: User
  avatar?: RFile[]
  logo?: RFile[]
  organization?: Organization
}

export type InputSelectStringOption = {
  id: string
  name: string
  displayName?: string
  disabled?: boolean
}

type User = {
  firstName: string
  surname: string
  country: InputSelectOption
  state?: InputSelectOption
  city?: InputSelectOption
  address: string
  postalCode: string
  phone: string
  identityType: InputSelectOption
  identityNumber: string
  email: string
  password: string
}

type Organization = {
  nameOrganization: string
  educationKindOrganization: InputSelectOption
  kindOrganization: InputSelectOption
  countryOrganization: InputSelectOption
  stateOrganization?: InputSelectOption
  cityOrganization?: InputSelectOption
  addressOrganization: string
  postalCodeOrganization?: string
  phoneOrganization: string
  identityTypeOrganization: InputSelectOption
  identityNumberOrganization: string
}
