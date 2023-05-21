import { GATEWAY_CLASSROOM_SERVICE, GATEWAY_GUIDE_SERVICE } from 'constants/api.constants'
import api from 'services/api.client'
import { ClassroomRequest } from 'services/models/classroom/request.model'
import { ClassroomResponse } from 'services/models/classroom/response.model'
import { downloadBlob } from 'utils/helpers/downloadBlob'

export type GetMembersParams = {
  pageSize?: number
  pageNumber?: number
  role?: string
  searchQuery?: string
  status?: string
}

export const classroomService = {
  getSectors: () =>
    api.get<ClassroomResponse['getSectors']>(`${GATEWAY_CLASSROOM_SERVICE}/organizations/sectors`),
  getEducationKind: () =>
    api.get<ClassroomResponse['getEducationKinds']>(
      `${GATEWAY_CLASSROOM_SERVICE}/organizations/education-kinds`,
    ),
  getIdentityTypes: () =>
    api.get<ClassroomResponse['getIdentity']>(`${GATEWAY_CLASSROOM_SERVICE}/identity-types`),

  getOrganization: (id: number) =>
    api.get<ClassroomResponse['getOrganizations']>(
      `${GATEWAY_CLASSROOM_SERVICE}/organizations/${id}/organizations`,
    ),

  getLanguages: () =>
    api.get<ClassroomResponse['getLanguages']>(`${GATEWAY_GUIDE_SERVICE}/languages`),

  postInvites: (organizationId: number, body: ClassroomRequest['postInvites']) =>
    api.post<ClassroomResponse['postInvites']>(
      `${GATEWAY_CLASSROOM_SERVICE}/organizations/${organizationId}/invites`,
      body,
    ),

  getGroups: (id: number) =>
    api.get<ClassroomResponse['getGroups']>(
      `${GATEWAY_CLASSROOM_SERVICE}/organizations/${id}/classrooms`,
    ),
  getMembers: (id: number, params: GetMembersParams) =>
    api.get<ClassroomResponse['getMembers']>(
      `${GATEWAY_CLASSROOM_SERVICE}/organizations/${id}/members`,
      { params },
    ),

  getStatus: () =>
    api.get<ClassroomResponse['getStatus']>(
      `${GATEWAY_CLASSROOM_SERVICE}/organizations/members/status`,
    ),

  deleteMember: (idOganitation: number, id: number) =>
    api.delete(`${GATEWAY_CLASSROOM_SERVICE}/organizations/${idOganitation}/members/${id}`),

  downloadMemberList: async (id: number, params?: GetMembersParams) => {
    const { data } = await api.get<Blob>(
      `${GATEWAY_CLASSROOM_SERVICE}/organizations/${id}/members/excel`,
      {
        params,
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        responseType: 'blob',
      },
    )
    downloadBlob(data, 'Lista de miembros', 'xlsx')
  },
}
