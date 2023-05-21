/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { useTreeSelector } from 'components/molecules/trees/TreeSelector/hooks/useTreeSelector'
import { TreeSelectorNode } from 'components/molecules/trees/TreeSelector/treeSelector.models'
import { CustomerResponse } from 'services/models/customers/response.model'
import { classroomService } from 'services/modules/classroom.module'
import { CustomerParams, customerService } from 'services/modules/customers.module'
import { subscriptionsService } from 'services/modules/subscriptions.module'
import { InputSelectProvider, useInputSelectContext } from 'utils/contexts/inputSelect.context'
import { useNotification } from 'utils/hooks/notification'
import { useLocation } from 'utils/hooks/useLocation'

import { FormLoadProps } from '../../components/FormLoad'
import { SubscriptionProvider, useSubscriptionContext } from './contexts/subscription.context'
import { SubscriptionComponent } from './subscription.component'
import { useSubscription as useSubscriptionForm } from './subscription.hook'
import { SubscriptionFormModel } from './subscription.models'

export type SubscriptionContainerProps = {
  isNewForm: boolean
  onClose: () => void
  idSuscription?: number
  initialStep?: number
  institution?: boolean
  idCustomer?: number
  isLmsLti?: boolean
}

const Component = (props: SubscriptionContainerProps) => {
  // Props
  const {
    isNewForm,
    onClose,
    idSuscription,
    initialStep = 0,
    institution,
    idCustomer,
    isLmsLti,
  } = props

  // Hooks
  const router = useRouter()
  const { setSubscriptionDraft } = useSubscriptionContext()
  const methods = useForm<SubscriptionFormModel>()
  const { watch, handleSubmit: handleSubmitFromLibrary, reset, getValues, setValue } = methods
  const { getNodeIdsByStatus } = useTreeSelector()
  const {
    defaultValues: { getBillingStep, getAllSteps },
    getApplicationTree,
    convertCustomerToSelectOption,
    clearBillingStep,
    setValuesDefault,
    convertOneCustomer,
    setValuesCustomer,
    clearSteps235,
  } = useSubscriptionForm()

  const { getCountries, getStates, getCities } = useLocation()
  const { setOptions } = useInputSelectContext()
  const { onError, onWarning, onSuccess } = useNotification()

  // States
  const [loading, setLoading] = useState(true)
  const [customerList, setCustomerList] = useState<CustomerResponse['getCustomerList']>()
  const [firstLoad, setFirstLoad] = useState({ country: true, state: true })
  const [oldCustomer, setOldCustomer] = useState({ id: -1, name: '' })
  const [params] = useState<CustomerParams>({
    institution,
  })

  // Data
  const valueCustomer = watch('step1.customer')
  const valueInvoicingKind = watch('step2.kind')
  const valueCountry = watch('step2.country')
  const valueState = watch('step2.state')
  const valueCity = watch('step2.city')
  const fillFields = watch('step2.fillFields')
  const valueSubscriptionKind = watch('step3.kind')

  // Methods
  const getInitialData = async () => {
    try {
      setLoading(true)

      const [customers, invoicing, countries, identities, identitiesOrg, status] =
        await Promise.all([
          customerService.getCustomerList(params),
          subscriptionsService.getInvoicingKind(),
          getCountries(),
          customerService.getIdentityType(),
          classroomService.getIdentityTypes(),
          subscriptionsService.getSubcriptionStatus(),
        ])

      setCustomerList(customers.data)

      if (idCustomer) {
        const customer = customers.data.content.find((item) => item.id === idCustomer)

        setOptions({
          customers: Array(convertOneCustomer(customer!)),
          invoicingKinds: invoicing.data,
          identities: identities.data.content,
          identitiesOrg: identitiesOrg.data.content,
          countries,
          states: [],
          cities: [],
          subscriptionStatus: status.data.content,
          customerKind: [],
        })

        const defaultValues = setValuesCustomer(
          status.data,
          invoicing.data,
          convertOneCustomer(customer!),
        )
        reset(defaultValues)
      } else {
        setOptions({
          customers: convertCustomerToSelectOption(customers.data),
          invoicingKinds: invoicing.data,
          identities: identities.data.content,
          identitiesOrg: identitiesOrg.data.content,
          countries,
          states: [],
          cities: [],
          subscriptionStatus: status.data.content,
          customerKind: [],
        })
        const defaultValues = setValuesDefault(status.data, invoicing.data)
        reset(defaultValues)
      }
    } catch {
      onError('Se produjo un error al obtener datos')
      setLoading(false)
      return false
    }

    if (isNewForm) setLoading(false)
    return true
  }

  const getSubscriptionKind = async (id: number) => {
    try {
      const paramsLms = { lti: isLmsLti }
      const subscription = await subscriptionsService.getSubcriptionKind(id, paramsLms)

      const customerKind =
        customerList?.content.find((item) => item.id === valueCustomer.id)?.kind ?? undefined

      setOptions((prevValues) => ({
        ...prevValues,
        subscriptionKinds: subscription.data,
        customerKind: customerKind ? [customerKind] : [],
      }))

      if (isNewForm) {
        methods.setValue('step3.kind', subscription.data[0])
      }
    } catch {
      onError('Error al obtener tipo de suscripciones')
    }
  }

  const getApplications = async (packageId?: number) => {
    try {
      const applications = await getApplicationTree(packageId)
      reset((prevValues) => ({ ...prevValues, step4: { search: '', applications } }))
    } catch {
      onError('Error al obtener las aplicaciones')
    }
  }

  const getSubscription = async (id: number) => {
    try {
      const [suscription, invoicing] = await Promise.all([
        subscriptionsService.getSubscription(id),
        subscriptionsService.getInvoincing(id),
      ])
      const invites = suscription?.data.activeInvites
      const members = suscription?.data.activeMembers
      const minUsers = invites && members ? invites + members : 0

      setOptions((prevValues) => ({
        ...prevValues,
        limitAdditionalusers: [
          {
            id: minUsers,
            name: 'limitAdditionalusers',
          },
        ],
      }))
      void getApplications(suscription.data.packageId)
      const defaultValues = getAllSteps(suscription.data, invoicing.data)
      reset((prevValues) => ({ ...prevValues, ...defaultValues }))
    } catch {
      onError('Error al obtener datos de la suscripción')
      onClose()
    }
  }

  const fillCustomerStep = async (id: number, kind: string, suscription?: number) => {
    try {
      const body = { invoicingDataKind: kind }
      const customerFill = await customerService.postInvoicingData(id, body)
      if (suscription) {
        const invoicing = await subscriptionsService.getInvoincing(suscription)
        const invoicingMail = invoicing.data.email
        if (customerFill.data.businessName !== undefined && customerFill.data.businessName !== '')
          customerFill.data.email = invoicingMail
      }

      const defaultValues = { step2: getBillingStep(customerFill.data, valueInvoicingKind) }

      reset((prevValues) => ({ ...prevValues, ...defaultValues }))
    } catch {
      onError('Error al llenar los datos desde cliente')
    }
  }

  // Handlers
  const handleStepChange = async (currentStep: number) => {
    if (isNewForm) {
      if (currentStep !== 4) {
        return 'continue'
      }
    }
    if (!isNewForm) {
      if (currentStep !== 3) {
        return 'continue'
      }
    }
    const { step1, step2, step3, step4, step5 } = getValues()

    // Step 4
    const hasAllUnchecked = step4.applications.every(({ status }) => status === 'unchecked')

    if (hasAllUnchecked) {
      onWarning('Tiene que seleccionar al menos una aplicación')
      return 'stop'
    }

    const selectedTreeNodes = getNodeIdsByStatus({
      nodes: step4.applications as TreeSelectorNode[],
      type: 'withoutCheckedChildren',
      status: 'checked',
    })

    const { data: subscriptionDraftResponse } = await subscriptionsService.getSubscriptionDraft({
      kind: step3.kind.name,
      installationCount: Number(step3.installationCount),
      startDate: step3.startDate.replaceAll('/', '-'),
      endDate: dayjs(step3.endDate).isValid() ? step3.endDate?.replaceAll('/', '-') ?? null : null,
      status: step3.status.name,
      packageIds: selectedTreeNodes,
      userCount: step3.userCount,
      allowedAccess: step3.allowedAccess,
      customerId: step1.customer.id,
      invoicingData: {
        kind: step2.kind.name,
        businessName: step2.businessName ?? '',
        email: step2.email,
        cityId: Number(step2.city?.id),
        address: step2.address,
        postalCode: String(step2.postalCode),
        phoneNumber: step2.phoneNumber,
        identityType: step2.identityType.name,
        identityNumber: step2.identityNumber,
      },
    })

    // Step 5
    setSubscriptionDraft(subscriptionDraftResponse)
    reset((prevValues) => ({
      ...prevValues,
      step5: {
        finalPrice:
          idSuscription !== undefined
            ? Number(step5.finalPrice)
            : subscriptionDraftResponse.finalPrice,
      },
    }))
    setFirstLoad(() => ({ country: true, state: true }))

    return 'continue'
  }

  const handleSubmit: SubmitHandler<SubscriptionFormModel> = async () => {
    const { step1, step2, step3, step4, step5 } = getValues()

    const selectedTreeNodes = getNodeIdsByStatus({
      nodes: step4.applications as TreeSelectorNode[],
      type: 'withoutCheckedChildren',
      status: 'checked',
    })

    try {
      setLoading(true)

      const subscriptionDataBody = {
        kind: step3.kind.name,
        installationCount: Number(step3.installationCount),
        startDate: step3.startDate,
        endDate: dayjs(step3.endDate).isValid() ? step3.endDate ?? null : null,
        status: step3.status.name,
        packageIds: selectedTreeNodes,
        customerId: step1.customer.id,
        finalPrice: step5.finalPrice,
        accessCount: step3.accessCount,
        userCount: Number(step3.userCount),
        allowedAccess: step3.allowedAccess,
        ltiServerLocation: step3.ltiServerLocation?.name,
        ltiSupportForAndroid: step3.ltiSupportForAndroid?.name === 'si',
        ltiErrorMessage: step3.ltiErrorMessage,
        isLtiServerExternal: step3.isLtiServerExternal?.length === 1,
        invoicingData: {
          kind: step2.kind.name,
          businessName: step2.businessName ?? '',
          email: step2.email,
          cityId: Number(step2.city?.id),
          address: step2.address,
          postalCode: String(step2.postalCode),
          phoneNumber: step2.phoneNumber,
          identityType: step2.identityType.name,
          identityNumber: step2.identityNumber,
          firstName: step2.firstName ?? '',
          surname: step2.surname ?? '',
          country: step2.country.name ?? '',
          status: step2.state?.name ?? '',
        },
      }

      const isEditForm = !isNewForm && idSuscription

      const subsResponse = isEditForm
        ? await subscriptionsService.putSubscription(idSuscription, subscriptionDataBody)
        : await subscriptionsService.postSubscription(subscriptionDataBody)

      const id = subsResponse?.data.id
      onSuccess(`Has ${!isEditForm ? 'creado' : 'actualizado'} la suscripción correctamente.`)
      void router.push(`/subscription/${id}`)
    } catch {
      onError('No logramos crear la suscripción. Por favor intenta nuevamente más tarde.')
    }
    setLoading(false)
    onClose()
  }

  // - Get initial data and suscription data if is edit form
  const handleServices = async () => {
    const respAllServices = await getInitialData()

    if (respAllServices) {
      if (isNewForm) {
        void getApplications()

        return
      }

      if (idSuscription) void getSubscription(idSuscription)
    }
  }

  // Effects

  // - Get subscription kind id according to the customer
  useEffect(() => {
    if (!valueCustomer) return
    setOldCustomer(valueCustomer)

    if (valueCustomer && !valueSubscriptionKind) void getSubscriptionKind(valueCustomer.id)

    const diferentCustomer = oldCustomer.id !== valueCustomer.id
    if (diferentCustomer && oldCustomer.id !== -1) {
      const emptySteps235 = clearSteps235(watch('step2.kind'))
      reset(({ step1, step4 }) => ({ step1, step4, ...emptySteps235 }))
      void getSubscriptionKind(valueCustomer.id)
    }
  }, [valueCustomer])

  // - Initial useEffect
  useEffect(() => {
    void handleServices()
  }, [])

  // - Get states and cities when country or state change
  useEffect(() => {
    if (!valueCountry) return

    getStates(valueCountry.id)
      .then((states) => setOptions((prevValues) => ({ ...prevValues, states })))
      .catch(() => onError('Error al obtener estados'))

    if (firstLoad.country) {
      setFirstLoad((prevValues) => ({ ...prevValues, country: false }))
      return
    }

    const isCountryChanged = !!(valueCountry && valueState)

    if (isCountryChanged) {
      setValue('step2.state', undefined)
      setValue('step2.city', undefined)
    }
  }, [valueCountry])

  useEffect(() => {
    if (!valueState) return

    getCities(valueState.id)
      .then((cities) => setOptions((prevValues) => ({ ...prevValues, cities })))
      .catch(() => onError('Error al obtener ciudades'))

    if (firstLoad.state) {
      setFirstLoad((prevValues) => ({ ...prevValues, state: false }))
      return
    }

    const isStateChanged = !!(valueState && valueCity)

    if (isStateChanged) {
      setValue('step2.city', undefined)
    }
  }, [valueState])

  // - Fill fields when "fillFields" toggle is active & inactive
  useEffect(() => {
    if (!fillFields) {
      const defaultValues = { step2: clearBillingStep(valueInvoicingKind) }
      reset((prevValues) => ({ ...prevValues, ...defaultValues }))
      setFirstLoad(() => ({ country: true, state: true }))
      return
    }

    if (!valueCustomer || !valueInvoicingKind) return

    void fillCustomerStep(valueCustomer.id, valueInvoicingKind.name, idSuscription).then(() => {
      setLoading(false)
      setFirstLoad(() => ({ country: true, state: true }))
    })
  }, [fillFields])

  // - Complete step 2 data on change kind 'FACTURAR A'
  useEffect(() => {
    if (fillFields) {
      if (!valueCustomer || !valueInvoicingKind) return
      void fillCustomerStep(valueCustomer.id, valueInvoicingKind.name, idSuscription).then(() => {
        setFirstLoad(() => ({ country: true, state: true }))
      })
    }
  }, [valueInvoicingKind?.name === 'organization'])

  // Base props
  const formLoadProps: Omit<FormLoadProps, 'steps'> = {
    title: isNewForm ? 'Agregar nueva suscripción' : `Editar suscripción (${valueCustomer?.name})`,
    finishButtonText: 'Confirmar',
    onClose,
    onStepChange: handleStepChange,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading,
    initialStep,
  }

  // Render
  return (
    <FormProvider {...methods}>
      <SubscriptionComponent formLoadProps={formLoadProps} isNewForm={isNewForm} />
    </FormProvider>
  )
}

export const SubscriptionContainer = (props: SubscriptionContainerProps) => (
  <InputSelectProvider initialValue={{ options: null }}>
    <SubscriptionProvider initialValue={{ value: null }}>
      <Component {...props} />
    </SubscriptionProvider>
  </InputSelectProvider>
)
