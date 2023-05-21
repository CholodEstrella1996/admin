import dayjs from 'dayjs'

import { MemberById, ResponseMemberById } from 'services/models/member.model'
import { RFile } from 'utils/models/reactFormFieldsTabs'

import { convertResourceToFile } from './convertResourceToFile'

const memberDetail = async (member: ResponseMemberById['user']) => ({
  firstName: member.firstName,
  surname: member.surname,
  phoneNumber: member.phoneNumber,
  identityType: member.identityType,
  identityNumber: member.identityNumber,
  email: member.email,
  avatarUrl: member.avatarUrl ? await convertResourceToFile({ url: String(member.avatarUrl) }) : [],
  birthDate: member.birthDate ? member.birthDate : undefined,
  genderId: member.gender?.id,
  gender: { id: member.gender?.id, value: member.gender?.name, label: member.gender?.displayName },
  educationalLevelId: member.educationalLevel?.id,
  educationalLevel: {
    id: member.educationalLevel?.id,
    value: member.educationalLevel?.name,
    label: member.educationalLevel?.displayName,
  },
})

const memberRequest = (member: MemberById['user'], user?: ResponseMemberById['user']) => {
  const formData = new FormData()
  const updateMember = {
    address: user?.address,
    avatarContentId: user?.avatarContentId,
    avatarUrl: member?.avatarUrl as RFile[],
    birthDate: dayjs(member.birthDate).isValid()
      ? dayjs(member.birthDate).format('YYYY-MM-DD')
      : '',
    cityId: user?.cityId,
    countryId: user?.countryId,
    educationalLevelId: member.educationalLevel?.id,
    email: member.email,
    emailVerified: user?.emailVerified,
    enabled: user?.enabled,
    firstName: member.firstName,
    genderId: member.gender?.id,
    id: user?.id,
    identityNumber: member.identityNumber,
    identityType: member.identityType.value,
    isCustomer: user?.isCustomer,
    organizationId: user?.organizationId,
    password: user?.password,
    phoneNumber: member.phoneNumber,
    postalCode: user?.postalCode,
    requiredActions: user?.requiredActions,
    stateId: user?.stateId,
    surname: member.surname,
  }

  if ((updateMember.avatarUrl[0]?.data as File)?.size) {
    formData.append('avatar', updateMember.avatarUrl[0].data as File)
  }
  formData.append('data', new Blob([JSON.stringify(updateMember)], { type: 'application/json' }))

  return formData
}

export { memberDetail, memberRequest }
