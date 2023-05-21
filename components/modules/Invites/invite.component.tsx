import React, { useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { ClassroomResponse } from 'services/models/classroom/response.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { useNotification } from 'utils/hooks/notification'
import { Language } from 'utils/models/classroom.models'

import CommonInvitation from './components/CommonInvitation'
import Header from './components/Header'
import InvitationMessage from './components/InvitationMessage'
import { FormInvites } from './invite.model'
import { InvitesStyles } from './invite.styles'

type InviteComponentProps = {
  subscriptionData: SubscriptionsResponse['getSubscription']
  listLanguage: Language[]
  listGroup?: ClassroomResponse['getGroups']
  dataInvite: (data: FormInvites) => void
}

const InviteComponent = ({
  subscriptionData,
  listLanguage,
  listGroup,
  dataInvite,
}: InviteComponentProps) => {
  const methods = useFormContext<FormInvites>()
  const { onWarning } = useNotification()

  const [emailList, setEmailList] = useState<string[]>([])

  const onSubmit = () => {
    if (!emailList.length) {
      onWarning('Por favor completa todos los campos requeridos para continuar.')
      return
    }
    dataInvite({
      languageCode: methods.getValues('languageCode'),
      classroomIds: methods.getValues('classroomIds'),
      message: methods.getValues('message'),
      emailList,
    })
  }

  if (!subscriptionData) return null
  const totalEmails =
    Number(subscriptionData?.userCount) -
    (Number(subscriptionData?.activeInvites) + Number(subscriptionData.activeMembers))

  return (
    <>
      <Header onSubmit={onSubmit} customer={subscriptionData.customer} />

      <div className="invite">
        <CommonInvitation
          customer={subscriptionData.customer}
          totalEmails={totalEmails}
          listEmails={(emails: string[]) => setEmailList(emails)}
        />
        <InvitationMessage
          listLanguage={listLanguage}
          listGroup={listGroup}
          customer={subscriptionData.customer}
        />
      </div>
      <style jsx>{InvitesStyles}</style>
    </>
  )
}

export default InviteComponent
