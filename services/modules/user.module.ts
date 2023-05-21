import { GATEWAY_USER_SERVICE } from 'constants/api.constants'
import api from 'services/api.client'
import { TermsConditionsRequest } from 'services/models/user/request.model'
import {
  RequiredActions,
  ResponseIdName,
  ResponseIdNameDisplay,
  ResponseTermAndConditionList,
  ResponseTermsConditions,
  User,
} from 'services/models/user/response.model'
import { optionsDisplay, optionsDisplayName } from 'utils/helpers/convertToOptions'
import { downloadBlob } from 'utils/helpers/downloadBlob'

import { MemberById } from '../models/member.model'

const userService = {
  getUser: async () => {
    const { data } = await api.get<User>(`${GATEWAY_USER_SERVICE}/users/profile`)
    return data
  },

  deleteAvatar: async (id: string) =>
    api.delete<MemberById>(`${GATEWAY_USER_SERVICE}/users/${id}/avatar`),

  updateUser: async (member: FormData, id: string) =>
    api.patch(`${GATEWAY_USER_SERVICE}/users/${id}/profile`, member),

  userRequiredActions: async (actions: RequiredActions) =>
    api.patch(`${GATEWAY_USER_SERVICE}/users/required-actions`, actions),

  getIdentitiesType: async () => {
    const { data } = await api.get<ResponseIdName>(`${GATEWAY_USER_SERVICE}/identity-types`)
    return optionsDisplayName(data.content)
  },
  getGender: async () => {
    const { data } = await api.get<ResponseIdNameDisplay>(`${GATEWAY_USER_SERVICE}/genders`)
    return optionsDisplay(data.content)
  },
  getEducationLevel: async () => {
    const { data } = await api.get<ResponseIdNameDisplay>(
      `${GATEWAY_USER_SERVICE}/educational-levels`,
    )
    return optionsDisplay(data.content)
  },
  getTermsAndConditionsList: () =>
    api.get<ResponseTermAndConditionList>(`${GATEWAY_USER_SERVICE}/terms-and-conditions`),

  patchActiveVersion: (id: number) =>
    api.patch(`${GATEWAY_USER_SERVICE}/terms-and-conditions/active-version/${id}`),

  deleteTermAndCondition: (id: number) =>
    api.delete(`${GATEWAY_USER_SERVICE}/terms-and-conditions/${id}`),

  getTermAndCondition: (id: number) =>
    api.get<ResponseTermsConditions>(`${GATEWAY_USER_SERVICE}/terms-and-conditions/${id}`),

  postTermAndCondition: (body: TermsConditionsRequest['postTermsConditions']) =>
    api.post<ResponseTermsConditions>(`${GATEWAY_USER_SERVICE}/terms-and-conditions/`, body),

  putTermAndCondition: (body: TermsConditionsRequest['postTermsConditions'], id: number) =>
    api.put<ResponseTermsConditions>(`${GATEWAY_USER_SERVICE}/terms-and-conditions/${id}`, body),

  downloadTermAndConditionList: async () => {
    const { data } = await api.get<Blob>(`${GATEWAY_USER_SERVICE}/terms-and-conditions/excel`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      responseType: 'blob',
    })
    downloadBlob(data, 'Lista de términos y condiciones', 'xlsx')
  },
}

export default userService
