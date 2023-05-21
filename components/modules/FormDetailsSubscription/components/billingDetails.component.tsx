import React from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'

type Props = {
  billing: SubscriptionsResponse['getBilling']
}
const { colors } = theme
export const BillingDetails = ({ billing }: Props) => (
  <section className="subs__information">
    {/* FILA 1  */}
    <div className="subs__section">
      {billing?.businessName ? (
        <div className="subs__par__data">
          <Typography variant="label" color={colors.neutrals[400]}>
            Razón social
          </Typography>
          <Typography variant="s2" color={colors.neutrals[400]}>
            {billing.businessName}
          </Typography>
        </div>
      ) : (
        <>
          <div className="subs__par__data">
            <Typography variant="label" color={colors.neutrals[400]}>
              Nombre
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {billing.firstName}
            </Typography>
          </div>
          <div className="subs__par__data">
            <Typography variant="label" color={colors.neutrals[400]}>
              Apellido
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {billing.surname}
            </Typography>
          </div>
        </>
      )}
    </div>

    {/* FILA 2   */}
    <div className="subs__section">
      <div className="subs__par__data">
        <Typography variant="label" color={colors.neutrals[400]}>
          país
        </Typography>
        <Typography variant="s2" color={colors.neutrals[400]}>
          {billing.country?.name ?? ''}
        </Typography>
      </div>

      <div className="subs__par__data">
        <Typography variant="label" color={colors.neutrals[400]}>
          provincia/estado
        </Typography>
        <Typography variant="s2" color={colors.neutrals[400]}>
          {billing.state?.name ?? ''}
        </Typography>
      </div>

      <div className="subs__par__data">
        <Typography variant="label" color={colors.neutrals[400]}>
          ciudad
        </Typography>
        <Typography variant="s2" color={colors.neutrals[400]}>
          {billing.city?.name ?? ''}
        </Typography>
      </div>
    </div>

    {/* FILA 3  */}
    <div className="subs__section">
      <div className="subs__par__data">
        <Typography variant="label" color={colors.neutrals[400]}>
          tipo de id
        </Typography>
        <Typography variant="s2" color={colors.neutrals[400]}>
          {billing.identityType.name}
        </Typography>
      </div>

      <div className="subs__par__data">
        <Typography variant="label" color={colors.neutrals[400]}>
          id
        </Typography>
        <Typography variant="s2" color={colors.neutrals[400]}>
          {billing.identityNumber}
        </Typography>
      </div>
    </div>

    {/* FILA 4  */}
    <div className="subs__section">
      <div className="subs__par__data__large">
        <Typography variant="label" color={colors.neutrals[400]}>
          domicilio
        </Typography>
        <Typography variant="s2" color={colors.neutrals[400]}>
          {billing.address}
        </Typography>
      </div>

      <div className="subs__par__data">
        <Typography variant="label" color={colors.neutrals[400]}>
          codigo postal
        </Typography>
        <Typography variant="s2" color={colors.neutrals[400]}>
          {billing.postalCode}
        </Typography>
      </div>
    </div>

    {/* FILA 5  */}
    <div className="subs__section">
      <div className="subs__par__data">
        <Typography variant="label" color={colors.neutrals[400]}>
          correo electrónico
        </Typography>
        <Typography variant="s2" color={colors.neutrals[400]}>
          {billing.email}
        </Typography>
      </div>

      <div className="subs__par__data">
        <Typography variant="label" color={colors.neutrals[400]}>
          teléfono
        </Typography>
        <Typography variant="s2" color={colors.neutrals[400]}>
          {billing.phoneNumber}
        </Typography>
      </div>
    </div>
  </section>
)
