import { GATEWAY_CLASSROOM_SERVICE } from 'constants/api.constants'
import api from 'services/api.client'

import {
  MemberById,
  MemberRequest,
  ResponseMember,
  ResponseMemberById,
  ResponseStatus,
} from '../models/member.model'

const memberService = {
  getMembers: async (id: number, params: MemberRequest) => {
    const { data } = await api.get<ResponseMember>(
      `${GATEWAY_CLASSROOM_SERVICE}/organizations/${id}/members}`,
      { params },
    )
    return data
  },

  getMemberById: async (organizationId: number, id: number) => {
    const { data } = await api.get<ResponseMemberById>(
      `${GATEWAY_CLASSROOM_SERVICE}/organizations/${organizationId}/members/${id}`,
    )
    return data
  },

  deleteMember: (organizationId: number, id: number) =>
    api.delete<MemberById>(
      `${GATEWAY_CLASSROOM_SERVICE}/organizations/${organizationId}/members/${id}`,
    ),

  getMembersStatus: async () => {
    const { data } = await api.get<ResponseStatus>(`${GATEWAY_CLASSROOM_SERVICE}/members/status`)
    return data.content
  },

  updateMember: (organizationId: number, id: number, member: FormData) =>
    api.put<MemberById>(
      `${GATEWAY_CLASSROOM_SERVICE}/organizations/${organizationId}/members/${id}`,
      member,
    ),
}

export default memberService
