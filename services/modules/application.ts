import { GATEWAY_PRODUCT_SERVICE } from 'constants/api.constants'
import api from 'services/api.client'
import { ApplicationResponse, ApplicationParams } from 'services/models/application.model'
import { ApplicationLearning } from 'services/models/applicationID.model'
import { ApplicationMaterials } from 'services/models/applicationMaterial.model'
import { ApplicationTechnical } from 'services/models/applicationTechnical.model'
import { ApiResponseTopicLearningUnits } from 'services/models/book.model'
import { ResponseMaterial } from 'services/models/material.model'
import { TopicResponse } from 'services/models/topic.model'

const applicationService = {
  createApplicationsMaterial: (id: number, data: FormData) =>
    api.post<ResponseMaterial>(
      `${GATEWAY_PRODUCT_SERVICE}/applications/${id}/pedagogical-materials`,
      data,
    ),

  getApplications: (params: ApplicationParams) =>
    api.get<ApplicationResponse>(`${GATEWAY_PRODUCT_SERVICE}/applications`, {
      params,
    }),

  deleteApplication: (id: number) =>
    api.delete<ApplicationLearning>(`${GATEWAY_PRODUCT_SERVICE}/applications/${id}`),

  getApplicationTranslation: (id: number) =>
    api.get<TopicResponse>(`${GATEWAY_PRODUCT_SERVICE}/applications/${id}/translations`),

  getApplicationTechnical: (id: number) =>
    api.get<ApplicationTechnical>(
      `${GATEWAY_PRODUCT_SERVICE}/applications/${id}/technical-details`,
    ),

  getApplicationLearningUnit: (id: number) =>
    api.get<ApiResponseTopicLearningUnits>(`${GATEWAY_PRODUCT_SERVICE}/applications/${id}`),

  getApplicationMaterials: (id: number, params: ApplicationParams) =>
    api.get<ApplicationMaterials>(
      `${GATEWAY_PRODUCT_SERVICE}/applications/${id}/pedagogical-materials`,
      {
        params,
      },
    ),
}

export default applicationService
