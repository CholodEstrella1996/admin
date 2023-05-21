/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { useRouter } from 'next/router'

import { Dialog } from 'components/atoms/Dialog'
import { ClassroomResponse } from 'services/models/classroom/response.model'

type Props = {
  listByOrganization: ClassroomResponse['getOrganizations']
}
const { colors } = theme
export const AssociatedInstitutions = ({ listByOrganization }: Props) => {
  const router = useRouter()
  return (
    <section className="selected__details__customer">
      {listByOrganization.length > 0 ? (
        listByOrganization.map((item) => (
          <div
            key={item.id}
            className="selected__content"
            onClick={() => void router.push(`/customer/${item.customerId}`)}>
            <Typography variant="label" color={colors.neutrals[500]}>
              {item.name}
            </Typography>
          </div>
        ))
      ) : (
        <Dialog message="No se encontraron Instituciones Asociadas" type="warning" />
      )}
    </section>
  )
}
