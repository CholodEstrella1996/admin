import { PRODUCT_SERVICE, GATEWAY_PRODUCT_SERVICE } from 'constants/api.constants'
import api from 'services/api.client'
import { ParamsPutAplication } from 'services/models/learningUnit.model'
import { TopicResponse } from 'services/models/topic.model'
import { LearningUnitService } from 'utils/models/learningUnitService.models'

export const learningUnitsService = {
  getApplications: (searchQuery: string) =>
    api.get<TopicResponse>(
      `${String(PRODUCT_SERVICE)}/applications?type=Learning Unit&searchQuery=${searchQuery}`,
    ),

  // TODO: falla al apuntar a la GATEWAY
  getLearningUnits: (appId: string) =>
    api.get<LearningUnitService['getLearningUnitsResponse']>(
      `${PRODUCT_SERVICE}/areas/tree/application/${appId}?applicationType=Learning Unit`,
    ),

  // TODO: falla al apuntar a la GATEWAY y no funciona el Search "Error 24"
  searchLearningUnits: (appId: string, searchedValue: string) =>
    api.get<LearningUnitService['searchLearningUnitsResponse']>(
      `${PRODUCT_SERVICE}/areas/tree/application/${appId}?applicationType=Learning Unit&applicationSearchQuery=${searchedValue}`,
    ),

  putApplications: (id: number, params: ParamsPutAplication) =>
    api.put<TopicResponse>(`${GATEWAY_PRODUCT_SERVICE}/applications/${id}`, params),

  deleteApplications: (productUnitId: number, idApplication: number) =>
    api.delete<TopicResponse>(
      `${GATEWAY_PRODUCT_SERVICE}/applications/${productUnitId}/applications/${idApplication}`,
    ),
}
