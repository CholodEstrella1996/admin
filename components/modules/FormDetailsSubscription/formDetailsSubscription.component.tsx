import React, { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'
import { DownloadOutlined } from '@mui/icons-material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'

import { InputCopy } from 'components/atoms/inputCopy'
import { SubscriptionForm } from 'components/molecules/forms/newAndEdit/Subscription'
import { ProgressBar } from 'components/molecules/ProgressBar'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'

import { SelectedProducts } from '../SelectedProducts/selectedProducts.component'
import { BillingDetails } from './components/billingDetails.component'
import { SubsDetails } from './components/subsDetails.component'
import { messegeStatus, StatusSubscription } from './formDetailsSubscription.model'
import {
  FormDetailSubscriptionLocalStyles,
  FormDetailSubscriptionGlobalStyles,
} from './formDetailsSubscription.styles'

const { colors } = theme

export type FormDetailSubscriptionProps = {
  data: {
    suscription: SubscriptionsResponse['getSubscription']
    invoicing: SubscriptionsResponse['getBilling']
    listByKind: SubscriptionsResponse['getPackages']
  }

  onChangeStatusSubscription: (status: StatusSubscription) => void
  onDownloadPDF?: () => Promise<void>
  onDownloadInvoice?: () => Promise<void>
}

const FormDetailSubscriptionComponent = ({
  data,
  onChangeStatusSubscription,
  onDownloadPDF,
  onDownloadInvoice,
}: FormDetailSubscriptionProps) => {
  // Props
  const { suscription, invoicing, listByKind } = data

  // Hooks
  const router = useRouter()

  // States
  const [formStatus, setFormStatus] = useState({ visible: false, initialStep: 0 })
  const [isOpenForm, setIsOpenForm] = useState(false)

  // Methods
  const changeStatus = () => {
    if (suscription.kind.name === 'perpetual')
      onChangeStatusSubscription(messegeStatus('cancelled'))
    if (suscription.endDate)
      onChangeStatusSubscription(messegeStatus('on cancellation', suscription.endDate))
    else onChangeStatusSubscription(messegeStatus('cancelled'))
  }

  // Handlers
  const handleSubscriptionForm = (visible: boolean, initialStep = 0) => {
    setFormStatus({ visible, initialStep })
  }

  /* TODO: Se deja comentado para ver que validan entre producto y cliente */
  // const isMonouserOrDemo =
  //   (suscription.kind.name === 'monouser-shared' || suscription.kind.name === 'demo-shared') &&
  //   (suscription.customer.kind.name === 'parent' ||
  //     suscription.customer.kind.name === 'institution')

  // Render

  return (
    <>
      <section className="formDetail__container">
        <section>
          <Button
            type="button"
            size="medium"
            variant="contained"
            className="header_button__edit"
            onClick={() => handleSubscriptionForm(true)}>
            Editar
          </Button>
          <Typography variant="s2" color={colors.neutrals[400]} className="header_label__title">
            Suscripción
          </Typography>

          <button
            type="button"
            onClick={() => router.back()}
            className="formDetail__customer__back__arrow">
            <ArrowBackIcon sx={{ fontSize: 37 }} />
          </button>

          <Typography
            variant="h5"
            color={colors.primary[500]}
            weight="bold"
            className="headerLabel__sub__title">
            #{suscription?.customer.id} - {suscription?.customer.name}
          </Typography>

          {/* Acciones de suscripciones */}
          <div className="formDetail__subs__actions">
            <Typography variant="s1" color={colors.primary[500]}>
              Acciones
            </Typography>

            <button
              type="button"
              onClick={() => void router.push(`/customer/${suscription?.customer.id}`)}
              className="subs__button__actions">
              <Typography variant="s2" color={colors.primary[500]}>
                Ver información del cliente
              </Typography>
            </button>

            {/* TODO: Se deja comentado para ver que validan entre producto y cliente */}
            {/* {(suscription.kind.name === 'monouser-shared' ||
              suscription.kind.name === 'demo-shared') &&
              suscription.customer.kind.name === 'institution' && (
                <button
                  type="button"
                  onClick={() => void router.push(`${suscription.id}/members`)}
                  className="subs__button__actions">
                  <Typography variant="s2" color={colors.primary[500]}>
                    Administrar usuarios relacionados
                  </Typography>
                </button>
              )} */}

            {/* TODO: Se deja comentado para ver que validan entre producto y cliente */}
            {/* {(suscription.kind.name === 'monouser-shared' ||
              suscription.kind.name === 'demo-shared') &&
              suscription.customer.kind.name === 'parent' && (
                // TODO: agregar ruta a la tabla de hijo
                <button
                  type="button"
                  onClick={() => void router.push(`${suscription.id}/members`)}
                  className="subs__button__actions">
                  <Typography variant="s2" color={colors.primary[500]}>
                    Administrar hijos
                  </Typography>
                </button>
              )} */}

            {(suscription.kind.name === 'multiuser-permanent' ||
              suscription.kind.name === 'multiuser-temporary') && (
              <button
                type="button"
                onClick={() => void router.push(`${suscription.id}/devices`)}
                className="subs__button__actions">
                <Typography variant="s2" color={colors.primary[500]}>
                  Administrar dispositivos
                </Typography>
              </button>
            )}

            {!(
              suscription.status.name === 'suspended' ||
              suscription.status.name === 'cancelled' ||
              suscription.status.name === 'on cancellation'
            ) && (
              <button
                type="button"
                onClick={() => onChangeStatusSubscription(messegeStatus('suspended'))}
                className="subs__button__actions">
                <Typography variant="s2" color={colors.primary[500]}>
                  Suspender suscripción
                </Typography>
              </button>
            )}

            {(suscription.kind.name === 'monouser-individual' ||
              (suscription.kind.name === 'monouser-shared' &&
                suscription.customer.kind.name === 'parent')) &&
              suscription.customer.kind.name !== 'government' && (
                <button type="button" onClick={onDownloadInvoice} className="subs__button__actions">
                  <Typography variant="s2" color={colors.primary[500]}>
                    Descargar factura
                  </Typography>
                </button>
              )}
            {!(
              suscription.status.name === 'cancelled' ||
              suscription.status.name === 'on cancellation'
            ) && (
              <button
                type="button"
                onClick={() => changeStatus()}
                className="formDetail__button__delete">
                <Typography variant="s2" color={colors.semantic.danger}>
                  Cancelar suscripción
                </Typography>
              </button>
            )}
          </div>

          <div className="subs__container subs__client">
            <div className="subs__client__data">
              <Typography variant="s1" color={colors.primary[500]}>
                Datos del cliente
              </Typography>
            </div>
            <div className="local__subs__information">
              <Typography variant="label" color={colors.neutrals[400]}>
                Nombre deL cliente *
              </Typography>
              <Typography variant="s2" color={colors.neutrals[400]}>
                {suscription?.customer.name}
              </Typography>
            </div>
          </div>

          {/* Datos de suscripción */}
          <div className="subs__container">
            <DropDownCard1 title="Datos de la suscripción" colorTitle={colors.primary[500]} isOpen>
              <SubsDetails suscription={data.suscription} />
            </DropDownCard1>
          </div>

          {(suscription.kind.name === 'multiuser-temporary' ||
            suscription.kind.name === 'multiuser-permanent') && (
            <div className="subs__container">
              <DropDownCard1 title="Instalaciones" colorTitle={colors.primary[500]} isOpen>
                <div className="progress__installs">
                  <div className="progress__input">
                    <InputCopy label="número de licencia" value={suscription.licenceNumber} />
                  </div>
                  <ProgressBar
                    progress={{
                      used: suscription.usedInstallationsCount,
                      available: suscription.availableInstallationsCount,
                      installation: suscription.installationCount,
                      textBadge: ['Realizadas', 'Disponibles', 'Incluidas'],
                    }}
                  />
                </div>
              </DropDownCard1>
            </div>
          )}

          {/* TODO: Se deja comentado para ver que validan entre producto y cliente */}
          {/* monouser & demo */}
          {/* {isMonouserOrDemo && (
            <div className="subs__container">
              <DropDownCard1 title="Usuarios" colorTitle={colors.primary[500]} isOpen>
                <div className="progress__installs">
                  <ProgressBar
                    progress={{
                      used: Number(suscription.activeMembers),
                      guest: Number(suscription.activeInvites),
                      available:
                        Number(suscription.userCount) -
                        (Number(suscription.activeMembers) + Number(suscription.activeInvites)),
                      installation: Number(suscription.userCount),
                      textBadge: ['Registrados', 'Disponibles', 'Incluidos', 'Invitados'],
                    }}
                  />
                </div>
              </DropDownCard1>
            </div>
          )} */}

          {suscription.kind.name === 'lms-lti' && (
            <div className="subs__container">
              <DropDownCard1 title="Usuarios" colorTitle={colors.primary[500]} isOpen>
                <div className="progress-user-container">
                  <div className="progress-user-inputs">
                    <div className="progress__input-lms">
                      <InputCopy label="número de licencia" value={suscription.licenceNumber} />
                    </div>
                    <div className="progress__input-token">
                      <InputCopy label="Token" value={String(suscription.tokenLTI)} />
                    </div>
                  </div>
                  <ProgressBar
                    progress={{
                      used: Number(suscription.activeMembers),
                      available: Number(suscription.userCount) - Number(suscription.activeMembers),
                      installation: Number(suscription.userCount),
                      textBadge: ['Registrados', 'Disponibles', 'Incluidos'],
                    }}
                  />
                </div>
              </DropDownCard1>
            </div>
          )}

          {/* Datos de facturación */}
          <div className="subs__container">
            <DropDownCard1 title="Datos de facturación" colorTitle={colors.primary[500]} isOpen>
              <BillingDetails billing={invoicing} />
            </DropDownCard1>
          </div>

          {/* Productos seleccionados */}
          <div className="subs__container subs__client">
            <div className="subs__client__data selected__texts">
              <Typography variant="s1" color={colors.primary[500]}>
                Productos seleccionados
              </Typography>
              <div className="subs_product_button">
                {suscription.kind.name === 'lms-lti' && (
                  <Button
                    type="button"
                    size="small"
                    variant="outlined"
                    className="header_button__edit"
                    icon={<DownloadOutlined />}
                    iconPosition="left"
                    onClick={onDownloadPDF}>
                    Descargar PDF
                  </Button>
                )}
                <Button
                  type="button"
                  size="small"
                  variant="contained"
                  className="header_button__edit"
                  onClick={() => handleSubscriptionForm(true, 2)}>
                  Editar
                </Button>
              </div>
            </div>

            <SelectedProducts products={listByKind} />
          </div>
        </section>
        {isOpenForm && <SubscriptionForm isNewForm onClose={() => setIsOpenForm(false)} />}
      </section>

      {formStatus.visible && (
        <SubscriptionForm
          isNewForm={false}
          idSuscription={suscription.id}
          onClose={() => handleSubscriptionForm(false)}
          initialStep={formStatus.initialStep}
        />
      )}

      <style jsx>{FormDetailSubscriptionLocalStyles}</style>
      <style jsx global>
        {FormDetailSubscriptionGlobalStyles}
      </style>
    </>
  )
}
export default FormDetailSubscriptionComponent
