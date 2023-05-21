import React from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import dayjs from 'dayjs'

import { Badge } from 'components/atoms/badge'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'

type Props = {
  suscription: SubscriptionsResponse['getSubscription']
}
const { colors } = theme
export const SubsDetails = ({ suscription }: Props) => {
  const isMonouserOrDemo =
    suscription.kind.name === 'monouser-shared' ||
    suscription.kind.name === 'monouser-individual' ||
    suscription.kind.name === 'demo-shared' ||
    suscription.kind.name === 'demo-individual'

  const isShared =
    suscription.kind.name === 'monouser-shared' || suscription.kind.name === 'demo-shared'

  return (
    <section className="subs__information">
      {/* FILA 1  */}
      <div className="subs__section">
        <div className="subs__par__data">
          <Typography variant="label" color={colors.neutrals[400]}>
            Tipo de suscripción *
          </Typography>
          <Typography variant="s2" color={colors.neutrals[400]}>
            {suscription?.kind.displayName}
          </Typography>
        </div>

        {isShared && (
          <div className="subs__par__data">
            <Typography variant="label" color={colors.neutrals[400]}>
              Cantidad de usuarios adic. *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {suscription?.userCount}
            </Typography>
          </div>
        )}
        {isMonouserOrDemo && (
          <div className="subs__par__data">
            <Typography variant="label" color={colors.neutrals[400]}>
              Cantidad de accesos *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {suscription?.allowedAccess}
            </Typography>
          </div>
        )}

        {suscription.kind.name === 'lms-lti' && (
          <div className="subs__par__data">
            <Typography variant="label" color={colors.neutrals[400]}>
              Cantidad de usuarios *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {suscription?.userCount}
            </Typography>
          </div>
        )}
        {(suscription.kind.name === 'multiuser-permanent' ||
          suscription.kind.name === 'multiuser-temporary') && (
          <div className="subs__par__data">
            <Typography variant="label" color={colors.neutrals[400]}>
              Cantidad de instalaciones *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {suscription?.installationCount}
            </Typography>
          </div>
        )}

        {(suscription.kind.name === 'lms-lti' ||
          suscription.kind.name === 'multiuser-permanent' ||
          suscription.kind.name === 'multiuser-temporary' ||
          suscription.kind.name === 'monouser-individual' ||
          suscription.kind.name === 'monouser-shared') && (
          <div className="subs__par__data">
            <Typography variant="label" color={colors.neutrals[400]}>
              Número de licencia *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {suscription?.licenceNumber}
            </Typography>
          </div>
        )}

        {(suscription.kind.name === 'multiuser-permanent' ||
          suscription.kind.name === 'multiuser-temporary' ||
          suscription.kind.name === 'monouser-individual' ||
          suscription.kind.name === 'demo-individual' ||
          suscription.kind.name === 'demo-shared') && <div className="subs__par__data" />}

        {suscription.kind.name === 'demo-individual' && <div className="subs__par__data" />}

        {suscription.kind.name === 'lms-lti' && (
          <div className="subs__par__data">
            <Typography variant="label" color={colors.neutrals[400]}>
              Token *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {suscription?.tokenLTI}
            </Typography>
          </div>
        )}
      </div>

      {/* FILA 2   */}
      {!(
        suscription.kind.name === 'demo-shared' || suscription.kind.name === 'demo-individual'
      ) && (
        <div className="subs__section">
          <div className="subs__par__data">
            <Typography variant="label" color={colors.neutrals[400]}>
              Método de pago
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              -
            </Typography>
          </div>

          <div className="subs__par__data">
            <Typography variant="label" color={colors.neutrals[400]}>
              periodicidad
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              -
            </Typography>
          </div>

          <div className="subs__par__data">
            <Typography variant="label" color={colors.neutrals[400]}>
              monto
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              ${Math.trunc(Number(suscription.packagePrice))}
            </Typography>
          </div>

          <div className="subs__par__data">
            <Typography variant="label" color={colors.neutrals[400]}>
              próximo cargo
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              -
            </Typography>
          </div>
        </div>
      )}

      {/* FILA 3  */}
      <div className="subs__section">
        <div className="subs__par__data">
          <Typography variant="label" color={colors.neutrals[400]}>
            fecha de inicio *
          </Typography>
          <Typography variant="s2" color={colors.neutrals[400]}>
            {dayjs(suscription?.startDate).format('DD/MM/YYYY')}
          </Typography>
        </div>

        <div className="subs__par__data">
          <Typography variant="label" color={colors.neutrals[400]}>
            duración en días *
          </Typography>
          <Typography variant="s2" color={colors.neutrals[400]}>
            {suscription?.kind.name !== 'multiuser-permanent' ? suscription?.dayCount : '-'}
          </Typography>
        </div>

        <div className="subs__par__data">
          <Typography variant="label" color={colors.neutrals[400]}>
            fecha de finalización
          </Typography>
          <Typography variant="s2" color={colors.neutrals[400]}>
            {suscription?.kind.name !== 'multiuser-permanent'
              ? dayjs(suscription?.endDate).format('DD/MM/YYYY')
              : '-'}
          </Typography>
        </div>

        <div className="subs__par__data">
          <Typography variant="label" color={colors.neutrals[400]}>
            estado *
          </Typography>
          <Badge message={suscription?.status.displayName} />
        </div>
      </div>
    </section>
  )
}
