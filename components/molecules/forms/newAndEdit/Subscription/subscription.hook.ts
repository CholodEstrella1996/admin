import dayjs, { Dayjs } from 'dayjs'

import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { CustomerResponse } from 'services/models/customers/response.model'
import { InvoicingKind, SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { packageService } from 'services/modules/packages.module'
import { useTreeConversions } from 'utils/hooks/useTreeConversions'
import { Customer } from 'utils/models/subscriptions.models'

import { SubscriptionFormModel } from './subscription.models'

// Methods
const convertDateTo = (value: Dayjs | number | Date, format = 'YYYY/MM/DD') =>
  dayjs(value).format(format)

const today = new Date()

// Hook
export const useSubscription = () => {
  // Hooks
  const { convertResponseToTree } = useTreeConversions()

  // Default values
  const getCustomerStep = (
    customer: SubscriptionsResponse['getSubscription']['customer'],
  ): SubscriptionFormModel['step1'] => ({
    customer: {
      id: customer.id,
      name: `${customer.name}`,
    },
  })

  const setValuesDefault = (
    status: SubscriptionsResponse['getKinds'],
    invoicing: InvoicingKind,
  ) => ({
    step2: {
      kind: invoicing[0],
    },
    step3: {
      startDate: convertDateTo(today),
      status: {
        id: status.content[0].id,
        name: status.content[0].name,
        displayName: status.content[0].displayName,
      },
      isLtiServerExternal: [],
    },
  })
  const setValuesCustomer = (
    status: SubscriptionsResponse['getKinds'],
    invoicing: InvoicingKind,
    customer: InputSelectOption,
  ) => ({
    step1: {
      customer,
    },
    step2: {
      kind: invoicing[0],
    },
    step3: {
      startDate: convertDateTo(today),
      status: {
        id: status.content[0].id,
        name: status.content[0].name,
        displayName: status.content[0].displayName,
      },
      isLtiServerExternal: [],
    },
  })

  const getBillingStep = (
    billing: CustomerResponse['getCustomerInvoicing'],
    kind: InputSelectOption,
  ): SubscriptionFormModel['step2'] => ({
    fillFields: true,
    kind,
    firstName: billing.firstName,
    surname: billing.surname,
    businessName: billing.businessName,
    country: { id: billing.country.id, name: billing.country.name },
    state: { id: billing.state.id, name: billing.state.name },
    city: { id: billing.city.id, name: billing.city.name },
    identityType: { id: billing.identityType.id, name: billing.identityType.name },
    identityNumber: billing.identityNumber,
    address: billing.address,
    postalCode: Number(billing.postalCode),
    email: billing.email,
    phoneNumber: billing.phoneNumber,
  })

  const clearBillingStep = (kind: InputSelectOption): SubscriptionFormModel['step2'] => ({
    fillFields: false,
    kind,
    firstName: '',
    surname: '',
    businessName: '',
    country: { id: 0, name: '' },
    state: { id: 0, name: '' },
    city: { id: 0, name: '' },
    identityType: { id: 0, name: '' },
    identityNumber: '',
    address: '',
    postalCode: Number(''),
    email: '',
    phoneNumber: '',
  })

  const getSubscriptionStep = (
    subscription: SubscriptionsResponse['getSubscription'],
  ): SubscriptionFormModel['step3'] => ({
    kind: {
      id: subscription.kind.id,
      name: subscription.kind.name,
      displayName: subscription.kind.displayName,
    },
    installationCount: subscription.installationCount,
    startDate: subscription.startDate.replaceAll('-', '/'),
    endDate:
      subscription.endDate !== undefined && subscription.endDate !== null
        ? subscription.endDate.replaceAll('-', '/')
        : undefined,
    status: {
      id: subscription.status.id,
      name: subscription.status.name,
      displayName: subscription.status.displayName,
    },
    dayCount: subscription.dayCount,
    isLtiServerExternal: subscription.isLtiServerExternal
      ? [{ id: 1, name: 'Servidor LMS externo', displayName: 'Servidor LMS externo' }]
      : [],
    accessCount: subscription?.accessCount,
    userCount: subscription?.userCount,
    allowedAccess: subscription?.allowedAccess,
    ltiServerLocation: subscription?.ltiServerLocation
      ? {
          id: 1,
          name: subscription?.ltiServerLocation,
          displayName: subscription?.ltiServerLocation,
          disabled: undefined,
        }
      : undefined,

    ltiSupportForAndroid: subscription.ltiSupportForAndroid
      ? { id: 1, name: 'si', displayName: 'Si' }
      : { id: 1, name: 'no', displayName: 'No' },

    ltiErrorMessage: subscription.ltiErrorMessage,
  })

  const clearSubscriptionStep = (): SubscriptionFormModel['step3'] => ({
    kind: { id: 0, name: '' },
    installationCount: 0,
    startDate: convertDateTo(today),
    endDate: '',
    status: { id: 1, name: 'active', displayName: 'Activa' },
    dayCount: undefined,
    isLtiServerExternal: [],
    accessCount: undefined,
    userCount: undefined,
    allowedAccess: undefined,
    ltiServerLocation: undefined,
    ltiSupportForAndroid: undefined,
    ltiErrorMessage: '',
  })

  const getFinalPrice = (
    subscription: SubscriptionsResponse['getSubscription'],
  ): SubscriptionFormModel['step5'] => ({
    finalPrice: Number(subscription.packagePrice),
  })

  const getAllSteps = (
    subscription: SubscriptionsResponse['getSubscription'],
    billing: SubscriptionsResponse['getBilling'],
  ) => {
    const { customer } = subscription

    return {
      step1: getCustomerStep(customer),
      step2: getBillingStep(billing, billing.kind),
      step3: getSubscriptionStep(subscription),
      step5: getFinalPrice(subscription),
    }
  }

  const clearSteps235 = (kind: InputSelectOption) => ({
    step2: clearBillingStep(kind),
    step3: clearSubscriptionStep(),
    step5: { finalPrice: 0 },
  })

  // Applications Tree
  const getApplicationTree = async (packageId?: number) => {
    const packageExists = packageId === undefined
    const response = packageExists
      ? await packageService.getPackageTree()
      : await packageService.getPackageTreeWithStatus(packageId)

    return convertResponseToTree({ nodes: response.data.content })
  }

  // Others
  const convertCustomerToSelectOption = (
    content: CustomerResponse['getCustomerList'],
  ): InputSelectOption[] => {
    if (content === undefined) return []

    const convertedOptions = content.content.map(({ id, name, email, kind }) => ({
      id: Number(id),
      name: `${name} (${email}) | ${kind.displayName}`,
    }))
    return convertedOptions
  }

  const convertOneCustomer = (customer: Omit<Customer, 'organizationId' | 'country'>) => {
    const convertedOption: InputSelectOption = {
      id: customer.id,
      name: `${customer.name} (${customer.email}) | ${customer.kind.displayName}`,
    }
    return convertedOption
  }

  // Return
  return {
    defaultValues: { getCustomerStep, getBillingStep, getSubscriptionStep, getAllSteps },
    getApplicationTree,
    convertCustomerToSelectOption,
    convertOneCustomer,
    clearBillingStep,
    setValuesDefault,
    setValuesCustomer,
    clearSteps235,
  }
}
