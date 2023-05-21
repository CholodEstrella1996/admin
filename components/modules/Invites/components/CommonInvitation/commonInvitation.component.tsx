/* eslint-disable no-param-reassign */
import { useState } from 'react'
import 'react-multi-email/style.css'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Divider } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactMultiEmail } from 'react-multi-email'

import patterns from 'constants/validationPatterns.constants'
import { Customer } from 'utils/models/subscriptions.models'

import { InvitesStyles, InvitesStylesGlobal } from '../../invite.styles'

export type ProfileProps = {
  customer: Customer
  totalEmails: number
  listEmails: (email: string[]) => void
}

const removeDuplicates = (list: string[]) => Array.from(new Set(list))

const showMails = (email: string, index: number, removeEmail: (index: number) => void) => (
  <div data-tag key={index} className="tag">
    {email}
    <span data-tag-handle aria-hidden="true" onClick={() => removeEmail(index)}>
      ×
    </span>
  </div>
)

const { colors } = theme

const CommonInvitation = ({ customer, totalEmails, listEmails }: ProfileProps) => {
  const router = useRouter()
  const [emails, setEmails] = useState<string[] | []>([])
  const [emailsLength, setEmailsLength] = useState(0)
  const [invalidEmails, setInvalidEmails] = useState<string[] | []>([])

  const noValidEmails: string[] = []

  const role = router.pathname.split('/', 4)[3].split('_', 1).toString()
  const getRole = () => {
    if (role === 'student') return 'estudiantes'
    if (role === 'teacher') return 'profesores'
    if (role === 'director') return 'directores'
    return ''
  }

  return (
    <>
      <div className="invite__card">
        <div className="invite__card__title">
          <Typography variant="s1" weight="semibold" color={colors.primary[500]}>
            Invitación común
          </Typography>
        </div>
        <div className="invite__card__body">
          <Typography variant="s1" color={colors.neutrals[500]}>
            {customer.kind.name === 'institution' && `Invitar ${getRole()} a ${customer.name}`}
            {customer.kind.name === 'parent' && `Invitar hijos de ${customer.name}`}
          </Typography>
          <Typography variant="p1" color={colors.neutrals[300]}>
            Ingresa las direcciones de correo electrónico de las personas que desees invitar. Se les
            enviará un correo electrónico para que completen el registro y puedan acceder a la
            plataforma.
          </Typography>
          <Divider />
          <Typography variant="label" color={colors.neutrals[300]}>
            Direcciones de correo electrónico *
          </Typography>

          <ReactMultiEmail
            placeholder="Ingresar emails"
            emails={emails}
            validateEmail={(email) => {
              if (invalidEmails.length) {
                setInvalidEmails([])
              }

              if (email === 'undefined') return false

              const isValid = patterns.email.test(email)

              if (!isValid && noValidEmails.indexOf(email) === -1) noValidEmails.push(email)
              return isValid
            }}
            onChange={(listData: string[]) => {
              setInvalidEmails(removeDuplicates(noValidEmails))
              if (listData.length > totalEmails) {
                listData.length = totalEmails
              }
              setEmails(removeDuplicates(listData))
              setEmailsLength(removeDuplicates(listData).length)
              listEmails(listData)
            }}
            getLabel={(email: string, index: number, removeEmail: (index: number) => void) =>
              showMails(email, index, removeEmail)
            }
          />
          <span className="mailsCounter">
            <Typography variant="c1" color={colors.neutrals[300]}>
              {emailsLength} / {totalEmails}
            </Typography>
          </span>
        </div>
      </div>
      <style jsx>{InvitesStyles}</style>
      <style jsx global>
        {InvitesStylesGlobal}
      </style>
    </>
  )
}
export default CommonInvitation
