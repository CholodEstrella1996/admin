import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { useFormContext } from 'react-hook-form'

import { InputSelect } from 'components/atoms/inputs/InputSelect'
import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'

import { FormLoad } from '../forms/components/FormLoad'
import FormGorvernment from './components/formGovernment.component'
import FormInstitution from './components/formInstitution.component'
import FormUsers from './components/formUsers.component'
import { FormNewEditCustomersProps } from './formNewEditCustomers.model'
import { FormNewEditCustomersLocalStyles } from './formNewEditCustomers.styles'

const { colors } = theme

export const FormNewEditCustomers = (props: FormNewEditCustomersProps) => {
  const {
    isNewForm,
    optionCustomer,
    optionCountries,
    optionCities,
    optionCitiesOrg,
    optionStates,
    optionStatesOrg,
    optionUserIdentity,
    optionOrganizationIdentity,
    optionSectors,
    optionEducationKind,
    customer,
    formLoadProps,
  } = props

  const methods = useFormContext()
  const { watch } = methods

  const selectCustomer = watch('kind') as InputSelectOption | undefined

  const stepKinds = (
    <>
      <div className="container-kinds">
        <Typography color={colors.primary[500]} variant="s1">
          Información del Cliente
        </Typography>

        <div className="content-kinds">
          <Typography color={colors.neutrals[400]} variant="label">
            Tipo de cliente
          </Typography>
          <InputSelect
            name="kind"
            options={optionCustomer ?? []}
            rules={{ required: true, disabled: !isNewForm }}
          />
        </div>
      </div>
      <style jsx>{FormNewEditCustomersLocalStyles}</style>
    </>
  )

  const stepUser = (
    <FormUsers
      isNewForm={isNewForm}
      optionCities={optionCities}
      optionCountries={optionCountries}
      optionIdentity={optionUserIdentity}
      optionStates={optionStates}
    />
  )

  const stepInstitution = (
    <FormInstitution
      optionEducation={optionEducationKind}
      optionInstitution={optionSectors}
      optionCountries={optionCountries}
      optionStates={optionStatesOrg}
      optionCities={optionCitiesOrg}
      optionIdentity={optionOrganizationIdentity}
    />
  )

  const stepGovernment = (
    <FormGorvernment
      optionCountries={optionCountries}
      optionStates={optionStatesOrg}
      optionCities={optionCitiesOrg}
      optionIdentity={optionOrganizationIdentity}
    />
  )

  const stepsUser = [
    { id: 1, element: stepKinds },
    { id: 2, element: stepUser },
  ]
  const stepsUserEdit = [{ id: 2, element: stepUser }]
  const stepsInstitution = [
    { id: 1, element: stepKinds },
    { id: 2, element: stepInstitution },
    { id: 3, element: stepUser },
  ]
  const stepsInstitutionEdit = [
    { id: 2, element: stepInstitution },
    { id: 3, element: stepUser },
  ]
  const stepsGovernment = [
    { id: 1, element: stepKinds },
    { id: 2, element: stepGovernment },
    { id: 3, element: stepUser },
  ]
  const stepsGovernmentEdit = [
    { id: 2, element: stepGovernment },
    { id: 3, element: stepUser },
  ]

  const getSteps = () => {
    if (Number(selectCustomer?.id) === 5 || customer?.kind === 'institution') {
      return isNewForm ? stepsInstitution : stepsInstitutionEdit
    }
    if (Number(selectCustomer?.id) === 4 || customer?.kind === 'government') {
      return isNewForm ? stepsGovernment : stepsGovernmentEdit
    }
    return isNewForm ? stepsUser : stepsUserEdit
  }

  return <FormLoad steps={getSteps()} {...formLoadProps} />
}
