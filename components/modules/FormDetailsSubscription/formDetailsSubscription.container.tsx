/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import LoadingModal from 'components/molecules/modals/LoadingModal/loadingModal.component'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { customerService } from 'services/modules/customers.module'
import { subscriptionsService } from 'services/modules/subscriptions.module'
import { useNotification } from 'utils/hooks/notification'

import FormDetailsSubscriptionComponent from './formDetailsSubscription.component'
import { StatusSubscription } from './formDetailsSubscription.model'

type Props = {
  idSubscription: number
}

const FormDetailsSubscription = ({ idSubscription }: Props) => {
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionsResponse['getSubscription']>()
  const [invoincingData, setinvoincingData] = useState<SubscriptionsResponse['getBilling']>()
  const [packagesData, setPackagesData] = useState<SubscriptionsResponse['getPackages']>()
  const { onSuccess, onError } = useNotification()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [statusData, setStatusData] = useState<StatusSubscription>({
    state: '',
    displayName: '',
    error: '',
    titleText: '',
    subtitleText: '',
    success: '',
    continueStep: '',
  })
  const router = useRouter()

  useEffect(() => {
    const getCustomerData = async () => {
      try {
        if (!idSubscription) return

        const [subscription, invoincing] = await Promise.all([
          subscriptionsService.getSubscription(idSubscription),
          subscriptionsService.getInvoincing(idSubscription),
        ])

        setSubscriptionData(subscription.data)
        setinvoincingData(invoincing.data)

        const listByKind = await subscriptionsService.getPackages(subscription.data.packageId)
        setPackagesData(listByKind.data)
      } catch {
        onError('Error al cargar los datos')
      }
    }
    if (idSubscription) void getCustomerData()
  }, [])

  const changeStatusSubscription = async (status: string) => {
    try {
      await subscriptionsService.putStatus(idSubscription, {
        status,
      })
      onSuccess(statusData.success)
      void router.push(`/subscription/${Number(idSubscription)}`)
    } catch {
      onError(statusData.error)
    }
  }

  const downloadPDF = async () => {
    setLoading(true)
    try {
      await customerService.downloadSubscriptionProducts(idSubscription)
    } catch {
      onError('Hubo un problema al descargar, intente más tarde')
    }
    setLoading(false)
  }
  const downloadInvoice = async () => {
    setLoading(true)
    try {
      onSuccess('Has descargado la factura correctamente')
    } catch {
      onError('No logramos descargar la factura. Intenta nuevamente más tarde.')
    }
    setLoading(false)
  }

  if (subscriptionData && invoincingData && packagesData) {
    const dataSubscription = {
      suscription: subscriptionData,
      invoicing: invoincingData,
      listByKind: packagesData,
    }

    return (
      <>
        <AlertModal
          titleText={statusData.titleText}
          subtitleText={statusData.subtitleText}
          cancelActionText="No, volver"
          onCancel={() => setOpen(false)}
          continueActionText={statusData.continueStep}
          onContinue={() => void changeStatusSubscription(statusData.state)}
          open={open}
        />
        <FormDetailsSubscriptionComponent
          data={dataSubscription}
          onChangeStatusSubscription={(status: StatusSubscription) => {
            setOpen(true)
            setStatusData(status)
          }}
          onDownloadPDF={() => downloadPDF()}
          onDownloadInvoice={() => downloadInvoice()}
        />
        {loading && <LoadingModal message="Descargando archivo, por favor espere..." />}
      </>
    )
  }
  return null
}

export default FormDetailsSubscription
