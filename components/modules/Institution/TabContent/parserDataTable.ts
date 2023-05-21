import { ClassroomResponse } from 'services/models/classroom/response.model'

const MEMBER_STATUS = 'invited'

const formatName = (
  status: string,
  firstName: string,
  surname: string,
  invitedMsg?: string,
  registeredMsg?: string,
) =>
  `${
    status === MEMBER_STATUS && invitedMsg
      ? invitedMsg
      : `${!firstName && registeredMsg ? registeredMsg : `${firstName || ''} ${surname || ''} `}`
  }`

const formatData = (
  data: ClassroomResponse['getMembers'],
  emailMsg: string,
  invitedMsg?: string,
  registeredMsg?: string,
) => {
  const newData = data.content.map(({ id, email, firstName, surname, status, avatarUrl }) => ({
    id,
    name: formatName(status.name, firstName ?? '', surname ?? '', invitedMsg, registeredMsg),
    email: email || emailMsg,
    status,
    avatarUrl,
  }))
  return newData
}

export { formatName, formatData }
