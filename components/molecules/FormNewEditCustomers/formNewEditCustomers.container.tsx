/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import axios from 'axios'
import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { ClassroomResponse } from 'services/models/classroom/response.model'
import { CustomerResponse } from 'services/models/customers/response.model'
import { classroomService } from 'services/modules/classroom.module'
import { convertResourceToFile } from 'utils/helpers/convertResourceToFile'
import { useNotification } from 'utils/hooks/notification'
import { useLocation } from 'utils/hooks/useLocation'

import { FormNewEditCustomers } from './formNewEditCustomers.component'
import { FormUserCustomerModel } from './formNewEditCustomers.model'
import {
  FormCustomerService,
  getCustomerKind,
  getIdentityTypes,
  getOrganizationIdentityTypes,
  getUserCustomer,
} from './formNewEditCustomers.service'

export type FormContainerCustomersProps = {
  isNewForm: boolean
  onClose: () => void
  idCustomer?: number
}

const Customer = (props: FormContainerCustomersProps) => {
  const { isNewForm, onClose, idCustomer } = props
  const methods = useForm<FormUserCustomerModel>({
    shouldFocusError: true,
  })
  const { handleSubmit: handleSubmitFromLibrary, reset, watch, setValue, setError } = methods

  const [customer, setCustomer] = useState<CustomerResponse['getCustomer']>()
  const [kindsCustomers, setKindsCustomers] = useState<CustomerResponse['getKinds']>()
  const [countries, setCountries] = useState<InputSelectOption[]>()
  const [states, setStates] = useState<InputSelectOption[]>()
  const [statesOrg, setStatesOrg] = useState<InputSelectOption[]>()
  const [cities, setCities] = useState<InputSelectOption[]>()
  const [citiesOrg, setCitiesOrg] = useState<InputSelectOption[]>()
  const [userIdentity, setUserIdentity] = useState<CustomerResponse['getIdentity']>()
  const [organizationIdentity, setOrganizationIdentity] =
    useState<CustomerResponse['getIdentity']>()
  const [sectors, setSectors] = useState<ClassroomResponse['getSectors']>()
  const [educationKinds, setEducationKinds] = useState<ClassroomResponse['getEducationKinds']>()
  const [loading, setLoading] = useState(true)
  const [firstLoad, setFirstLoad] = useState({
    country: true,
    state: true,
    countryOrg: true,
    stateOrg: true,
  })

  const { onSuccess, onError, onWarning } = useNotification()
  const { getCountries, getStates, getCities } = useLocation()
  const router = useRouter()

  const valueKind = watch('kind') as unknown as InputSelectOption
  const userCountry = watch('user.country') as InputSelectOption
  const userState = watch('user.state') as InputSelectOption
  const userCity = watch('user.city') as InputSelectOption
  const organizationCountry = watch('organization.countryOrganization') as InputSelectOption
  const organizationState = watch('organization.stateOrganization') as InputSelectOption
  const organizationCity = watch('organization.cityOrganization') as InputSelectOption

  const getDefaultValues = async (_dataCustomer: CustomerResponse['getCustomer']) => {
    const optionalParams =
      _dataCustomer.kind === 'government' || _dataCustomer.kind === 'institution'
        ? {
            organization: {
              nameOrganization: _dataCustomer.organization.name,
              countryOrganization: {
                id: _dataCustomer.organization.countryId,
                name: _dataCustomer.organization.country,
              },
              stateOrganization: {
                id: _dataCustomer.organization.stateId,
                name: _dataCustomer.organization.state,
              },
              cityOrganization: {
                id: _dataCustomer.organization.cityId,
                name: _dataCustomer.organization.city,
              },
              phoneOrganization: _dataCustomer.organization.phone,
              addressOrganization: _dataCustomer.organization.address,
              identityTypeOrganization: {
                id: _dataCustomer.organization.identityType?.id,
                name: _dataCustomer.organization.identityType?.name,
              },
              identityNumberOrganization: _dataCustomer.organization.identityNumber,
              educationKindOrganization: {
                id: _dataCustomer.organization.educationKind?.id,
                name: _dataCustomer.organization.educationKind?.name,
                displayName: _dataCustomer.organization.educationKind?.displayName,
              },
              kindOrganization: {
                id: _dataCustomer.organization.sector?.id,
                name: _dataCustomer.organization.sector?.name,
                displayName: _dataCustomer.organization.sector?.displayName,
              },
              postalCodeOrganization: _dataCustomer.organization.postalCode,
            },
            logo: _dataCustomer.organization.logoUrl
              ? await convertResourceToFile({ url: _dataCustomer.organization.logoUrl })
              : undefined,
          }
        : undefined
    return {
      kind: { id: _dataCustomer.kind, name: _dataCustomer.displayName },
      user: {
        firstName: _dataCustomer.user.firstName,
        surname: _dataCustomer.user.surname,
        country: { id: _dataCustomer.user.countryId, name: _dataCustomer.user.country },
        state: { id: _dataCustomer.user.stateId, name: _dataCustomer.user.state },
        city: { id: _dataCustomer.user.cityId, name: _dataCustomer.user.city },
        address: _dataCustomer.user.address,
        postalCode: _dataCustomer.user.postalCode,
        phone: _dataCustomer.user.phone,
        identityType: {
          id: _dataCustomer.user.identityType.id,
          name: _dataCustomer.user.identityType.name,
        },
        identityNumber: _dataCustomer.user.identityNumber,
        email: _dataCustomer.user.email,
        password: _dataCustomer.user.password,
      },
      ...optionalParams,
      avatar: _dataCustomer.user.avatarUrl
        ? await convertResourceToFile({ url: _dataCustomer.user.avatarUrl })
        : undefined,
    }
  }

  const initialCall = async () => {
    setLoading(true)
    try {
      const [kinds, countrie] = await Promise.all([getCustomerKind(), getCountries()])
      setKindsCustomers(kinds)
      setCountries(countrie)
    } catch {
      onError('Error al cargar los datos del cliente')
      return false
    }

    setLoading(false)
    return true
  }

  const getClient = async () => {
    setLoading(true)
    try {
      const [user, country] = await Promise.all([
        getUserCustomer(Number(idCustomer)),
        getCountries(),
      ])
      setCustomer(user)
      setCountries(country)

      const defaultValues = await getDefaultValues(user)
      if (defaultValues) {
        void reset(defaultValues)
      }
    } catch {
      onError('Error al cargar los datos del cliente')
    }
    setLoading(false)
  }

  const getSelectIdentityTypes = async () => {
    try {
      if (
        valueKind?.name === 'institution' ||
        Number(valueKind?.id) === 4 ||
        valueKind?.name === 'government' ||
        Number(valueKind?.id) === 5
      ) {
        const orgIdentities = await getOrganizationIdentityTypes()
        setOrganizationIdentity(orgIdentities)
      }
      const userIdentities = await getIdentityTypes()
      setUserIdentity(userIdentities)
    } catch {
      onError('Error al cargar los tipos de identidad')
    }
  }

  const getSelectInstitution = async () => {
    if (Number(valueKind?.id) === 5 || !isNewForm) {
      try {
        const [sector, educationKind] = await Promise.all([
          classroomService.getSectors(),
          classroomService.getEducationKind(),
        ])
        setSectors(sector.data)
        setEducationKinds(educationKind.data)
      } catch {
        onError('Error al cargar los datos')
      }
    }
  }

  const handleServices = async () => {
    if (isNewForm) {
      void initialCall()
    }

    if (!isNewForm) {
      void getClient()
    }
  }

  // Calls initial
  useEffect(() => {
    void handleServices()
  }, [])

  // Set Select identity-type / sector / educationKind
  useEffect(() => {
    if (valueKind) {
      void getSelectIdentityTypes()
      void getSelectInstitution()
    }
  }, [valueKind])

  // Select newEdit State and Cities User
  useEffect(() => {
    if (!userCountry) return
    if (userCountry) void getStates(userCountry?.id).then((state) => setStates(state))

    if (firstLoad.country) {
      setFirstLoad((prevValues) => ({ ...prevValues, country: false }))
      return
    }

    const isCountryChanged = !!(userCountry && userState)

    if (isCountryChanged) {
      setValue('user.state', undefined)
      setValue('user.city', undefined)
    }
  }, [userCountry])

  useEffect(() => {
    if (!userState) return
    if (userState) void getCities(userState?.id).then((city) => setCities(city))
    if (firstLoad.state) {
      setFirstLoad((prevValues) => ({ ...prevValues, state: false }))
      return
    }

    const isStateChanged = userState && userCity

    if (isStateChanged) {
      setValue('user.city', undefined)
    }
  }, [userState])

  // Select State and Cities Organization
  useEffect(() => {
    if (!organizationCountry) return

    if (organizationCountry)
      void getStates(organizationCountry?.id).then((state) => setStatesOrg(state))

    if (firstLoad.countryOrg) {
      setFirstLoad((prevValues) => ({ ...prevValues, countryOrg: false }))
      return
    }
    const isCountryOrgChanged = !!(organizationCountry && organizationState)

    if (isCountryOrgChanged) {
      setValue('organization.stateOrganization', undefined)
      setValue('organization.cityOrganization', undefined)
    }
  }, [organizationCountry])

  useEffect(() => {
    if (!organizationState) return
    if (organizationState) void getCities(organizationState?.id).then((city) => setCitiesOrg(city))
    if (firstLoad.stateOrg) {
      setFirstLoad((prevValues) => ({ ...prevValues, stateOrg: false }))
      return
    }

    const isStateOrgChanged = organizationState && organizationCity

    if (isStateOrgChanged) {
      setValue('organization.cityOrganization', undefined)
    }
  }, [organizationState])

  const handleSubmit: SubmitHandler<FormUserCustomerModel> = async (data) => {
    setLoading(true)

    try {
      const responseIdCustomer = await FormCustomerService(data, customer, isNewForm, idCustomer)

      setLoading(false)
      onSuccess(`Has ${isNewForm ? 'agregado' : 'modificado'} el cliente correctamente`)
      void router.push(`/customer/${Number(responseIdCustomer)}`)
      onClose()
    } catch (error) {
      setLoading(false)

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          onWarning('La dirección de correo electónico ya se encuentra registrada')
          setError('user.email', { type: 'custom' }, { shouldFocus: true })
          setValue('user.email', '')
        } else if (error.response?.status === 404) {
          onWarning('No se encontró un atributo seleccionado')
        } else if (error.response?.status === 500) {
          onError(`Hubo un error al ${isNewForm ? 'agregar' : 'modificar'} un cliente`)
        }
      }
    }
  }

  // Base props
  const formLoadProps = {
    title: isNewForm ? 'Agregar nuevo cliente' : `Editar cliente (${customer?.displayName ?? ''})`,
    finishButtonText: isNewForm ? 'Agregar cliente' : 'Guardar cambios',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading,
  }

  return (
    <FormProvider {...methods}>
      <FormNewEditCustomers
        isNewForm={isNewForm}
        optionCustomer={kindsCustomers ? kindsCustomers.content : []}
        optionUserIdentity={userIdentity ? userIdentity.content : []}
        optionOrganizationIdentity={organizationIdentity ? organizationIdentity.content : []}
        optionCountries={countries}
        optionStates={states}
        optionStatesOrg={statesOrg}
        optionCities={cities}
        optionCitiesOrg={citiesOrg}
        optionSectors={sectors ? sectors.content : []}
        optionEducationKind={educationKinds ? educationKinds.content : []}
        customer={customer}
        formLoadProps={formLoadProps}
      />
    </FormProvider>
  )
}

export const FormNewEditCustomerContainer = (props: FormContainerCustomersProps) => (
  <Customer {...props} />
)
