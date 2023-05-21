import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { Pagination } from 'utils/models/modelsBase'
import { Status } from 'utils/models/subscriptions.models'

export type StatusSubscription = {
  state: string
  displayName: string
  titleText: string
  subtitleText: string
  success: string
  error: string
  continueStep: string
}

// TODO: migrar tipado al servicio una vez se empiece a implementar
export type GetDataTableBilling = Pagination & {
  content: {
    id: number
    numberBilling: string
    date: string
    total: string
    status: {
      id: number
      name: string
      displayName: string
    }
  }[]
}

export const messegeStatus = (
  status: Status['name'],
  endDate?: SubscriptionsResponse['getSubscription']['endDate'],
): StatusSubscription => {
  const messages = {
    active: {
      state: 'active',
      displayName: 'activar',
      error: '',
      titleText: '',
      subtitleText: '',
      success: 'éxito',
      continueStep: 'Sí, activar',
    },
    suspended: {
      state: 'suspended',
      displayName: 'suspender',
      error: 'No logramos suspender la suscripción. Intenta nuevamente más tarde.',
      titleText: `¿Quieres suspender la suscripción?`,
      subtitleText:
        'El cliente no podrá seguir utilizando el producto hasta que la misma sea reactivada.',
      success: 'Has suspendido la suscripción correctamente',
      continueStep: 'Sí, suspender',
    },
    'on cancellation': {
      state: 'on cancellation',
      displayName: 'programar la cancelación',
      error: 'No logramos programar la cancelación. Intenta nuevamente más tarde.',
      titleText: '¿Quieres programar la cancelación de la suscripción?',
      subtitleText: `El cliente podrá seguir utilizando el producto hasta el día ${
        endDate ? new Date(endDate).toLocaleDateString() : 'de finalización'
      }`,
      success: 'Has programado la cancelación de la suscripción correctamente',
      continueStep: 'Sí, programar',
    },
    cancelled: {
      state: 'cancelled',
      displayName: 'cancelar',
      error: 'No logramos cancelar la suscripción. Intenta nuevamente más tarde.',
      titleText: `¿Quieres cancelar la suscripción?`,
      subtitleText: 'El cliente no podrá seguir utilizando el producto.',
      success: 'Has cancelado la suscripción correctamente',
      continueStep: 'Sí, cancelar',
    },
    expired: {
      state: 'expired',
      displayName: '',
      error: '',
      titleText: '',
      subtitleText: '',
      success: '',
      continueStep: '',
    },
    pending: {
      state: 'pending',
      displayName: '',
      error: '',
      titleText: '',
      subtitleText: '',
      success: '',
      continueStep: '',
    },
  }
  return messages[status]
}
