import { GATEWAY_CLASSROOM_SERVICE } from 'constants/api.constants'
import api from 'services/api.client'
import { InstitutionRequest } from 'services/models/institutions/request.model'
import { InstitutionResponse as Response } from 'services/models/institutions/response.model'

export const institutionService = {
  getInstitutionTree: (customerId: number) =>
    api.get<Response['getInstitutionTree']>(
      `${GATEWAY_CLASSROOM_SERVICE}/organizations/${customerId}/tree`,
    ),

  putInstitutionTree: (customerId: number, body: InstitutionRequest['putInstitutionTree']) =>
    api.put<Response['getInstitutionTree']>(
      `${GATEWAY_CLASSROOM_SERVICE}/organizations/${customerId}/organizations`,
      body,
    ),
}
