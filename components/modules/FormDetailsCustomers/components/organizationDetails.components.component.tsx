import React from 'react'

import { TextIcon } from '@folcode/clabs.atoms.text-icon'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { getLastFragmentByUrl } from 'utils/helpers/getLastFragmentByUrl'
import { Organization } from 'utils/models/customer.models'

type Props = {
  organization: Organization
  kind: string
}
const { colors } = theme
export const OrganizationDetails = ({ organization, kind }: Props) => (
  <section className="user__container">
    <div className="user__information">
      <div className="user__title__section">
        <Typography variant="s1" color={colors.primary[500]}>
          {kind === 'institution' ? 'Datos de la institución' : 'Datos del Gobierno'}
        </Typography>
      </div>

      {/* FILA 1  */}
      {kind === 'institution' && (
        <div className="user__section">
          <div className="user__par__data">
            <Typography variant="label" color={colors.neutrals[300]}>
              tipo de educación *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {organization.educationKind?.displayName}
            </Typography>
          </div>

          <div className="user__par__data">
            <Typography variant="label" color={colors.neutrals[300]}>
              tipo de institución *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {organization.sector?.displayName}
            </Typography>
          </div>
          <div className="user__par__data">{}</div>
        </div>
      )}

      {/* FILA 2 */}
      <div className="user__section">
        <div className="user__par__data">
          <Typography variant="label" color={colors.neutrals[300]}>
            País *
          </Typography>
          <Typography variant="s2" color={colors.neutrals[400]}>
            {organization.country}
          </Typography>
        </div>

        <div className="user__par__data">
          <Typography variant="label" color={colors.neutrals[300]}>
            Provincia/Estado *
          </Typography>
          <Typography variant="s2" color={colors.neutrals[400]}>
            {organization.state}
          </Typography>
        </div>

        <div className="user__par__data">
          <Typography variant="label" color={colors.neutrals[300]}>
            cuidad *
          </Typography>
          <Typography variant="s2" color={colors.neutrals[400]}>
            {organization.city}
          </Typography>
        </div>
      </div>

      {/* FILA 3 */}
      <div className="user__section addres_data">
        <div className="user__address_par__data">
          <Typography variant="label" color={colors.neutrals[300]}>
            domicilio *
          </Typography>
          <Typography variant="s2" color={colors.neutrals[400]}>
            {organization.address}
          </Typography>
        </div>
        {kind === 'institution' && (
          <div className="user__par__data">
            <Typography variant="label" color={colors.neutrals[300]}>
              codigo postal *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {organization.postalCode}
            </Typography>
          </div>
        )}
      </div>

      {/* FILA 4  */}
      <div className="user__section">
        <div className="user__par__data">
          <Typography variant="label" color={colors.neutrals[300]}>
            Teléfono *
          </Typography>
          <Typography variant="s2" color={colors.neutrals[400]}>
            {organization.phone}
          </Typography>
        </div>

        <div className="user__par__data">
          <Typography variant="label" color={colors.neutrals[300]}>
            Tipo de ID *
          </Typography>
          <Typography variant="s2" color={colors.neutrals[400]}>
            {organization.identityType?.name}
          </Typography>
        </div>

        <div className="user__par__data">
          <Typography variant="label" color={colors.neutrals[300]}>
            id *
          </Typography>
          <Typography variant="s2" color={colors.neutrals[400]}>
            {organization.identityNumber}
          </Typography>
        </div>
      </div>

      {/* FILA 5  */}
      <div className="user__section">
        <div className="user__par__data">
          <Typography variant="label" color={colors.neutrals[300]}>
            logo
          </Typography>
          <TextIcon
            text={
              getLastFragmentByUrl(organization.logoUrl ?? 'No existe archivo asociado.') ??
              'No existe archivo asociado.'
            }
            id={organization.name}
            size="small"
            colorAvatar={colors.primary[500]}
            icon={organization.logoUrl}
          />
        </div>
      </div>
    </div>
  </section>
)
