import { GATEWAY_GUIDE_SERVICE } from 'constants/api.constants'
import api from 'services/api.client'
import { LabsService } from 'utils/models/labsService.models'

export const labsService = {
  getLabs: (groupId: string) =>
    api.get<LabsService['getLabsResponse']>(
      `${GATEWAY_GUIDE_SERVICE}/groups/${groupId}/areas/tree?applicationType=laboratory`,
    ),

  searchLabs: (groupId: string, searchedValue: string) =>
    api.get<LabsService['searchLabsResponse']>(
      `${GATEWAY_GUIDE_SERVICE}/groups/${groupId}/areas/tree?applicationType=laboratory&applicationSearchQuery=${searchedValue}`,
    ),

  saveLabs: (id: string, data: LabsService['saveLabsRequest']) =>
    api.put<LabsService['saveLabsResponse']>(
      `${GATEWAY_GUIDE_SERVICE}/groups/${id}/product-units`,
      data,
    ),
}
