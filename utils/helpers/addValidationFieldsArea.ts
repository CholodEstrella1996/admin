import { AxiosResponse } from 'axios'

import { validationFieldsArea } from 'constants/validationsFieldsTabs'
import { AreaGeneralResponse } from 'services/models/areas/response.model'
import { Content, TabsLanguageNew } from 'utils/models/modelsBase'
import { Languages } from 'utils/models/reactFormFieldsTabs'

export const addValidationFieldsArea = (
  translations: TabsLanguageNew | AxiosResponse<AreaGeneralResponse>,
): Languages[] => {
  const DataTranslations: Languages[] = []

  translations.data.content.forEach((element: Content, id) => {
    if (element.language.languageCode === 'en-US') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsArea.EN,
      }
      DataTranslations[id] = lang
    }
    if (element.language.languageCode === 'es-MX') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsArea.ES,
      }
      DataTranslations[id] = lang
    }
    if (element.language.languageCode === 'pt') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsArea.PT,
      }
      DataTranslations[id] = lang
    }
    if (element.language.languageCode === 'tr') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsArea.TR,
      }
      DataTranslations[id] = lang
    }
  })

  return DataTranslations
}
