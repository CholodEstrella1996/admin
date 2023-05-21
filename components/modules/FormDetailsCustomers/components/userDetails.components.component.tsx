import React from 'react'

import { TextIcon } from '@folcode/clabs.atoms.text-icon'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { AnyCustomer } from 'services/models/customers/response.model'
import { getLastFragmentByUrl } from 'utils/helpers/getLastFragmentByUrl'

type Props = {
  dataUser: AnyCustomer
}
const { colors } = theme
export const UserDetails = ({ dataUser }: Props) => {
  const { user } = dataUser
  return (
    <section className="user__container">
      <div className="user__information">
        <div className="user__title__section">
          <Typography variant="s1" color={colors.primary[500]}>
            Datos del usuario
          </Typography>
          <TextIcon
            text={`${user.firstName} ${user.surname}`}
            id={user.firstName}
            size="medium"
            colorAvatar={colors.primary[500]}
            icon={user.avatarUrl}
          />
        </div>

        {/* FILA 1  */}
        <div className="user__section addres_data">
          <div className="user__address_par__data">
            <Typography variant="label" color={colors.neutrals[300]}>
              domicilio *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {user.address}
            </Typography>
          </div>

          <div className="user__par__data">
            <Typography variant="label" color={colors.neutrals[300]}>
              codigo postal *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {user.postalCode}
            </Typography>
          </div>
        </div>

        {/* FILA 2   */}
        <div className="user__section">
          <div className="user__par__data">
            <Typography variant="label" color={colors.neutrals[300]}>
              País *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {user.country}
            </Typography>
          </div>

          <div className="user__par__data">
            <Typography variant="label" color={colors.neutrals[300]}>
              Provincia/Estado *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {user.state}
            </Typography>
          </div>

          <div className="user__par__data">
            <Typography variant="label" color={colors.neutrals[300]}>
              cuidad *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {user.city}
            </Typography>
          </div>
        </div>

        {/* FILA 3  */}
        <div className="user__section">
          <div className="user__par__data">
            <Typography variant="label" color={colors.neutrals[300]}>
              Teléfono *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {user.phone}
            </Typography>
          </div>

          <div className="user__par__data">
            <Typography variant="label" color={colors.neutrals[300]}>
              Tipo de ID *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {user.identityType?.name}
            </Typography>
          </div>

          <div className="user__par__data">
            <Typography variant="label" color={colors.neutrals[300]}>
              id *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {user.identityNumber}
            </Typography>
          </div>
        </div>

        {/* FILA 4  */}
        <div className="user__section last_data">
          <div className="user__duo__data">
            <Typography variant="label" color={colors.neutrals[300]}>
              Correo electrónico *
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {user.email}
            </Typography>
          </div>
        </div>
        <div className="user__section last_data">
          <div className="user__par__data">
            <Typography variant="label" color={colors.neutrals[300]}>
              Foto de perfil
            </Typography>
            <TextIcon
              text={getLastFragmentByUrl(user.avatarUrl ?? user.firstName) ?? user.firstName}
              id={user.firstName}
              size="small"
              colorAvatar={colors.primary[500]}
              icon={user.avatarUrl}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
