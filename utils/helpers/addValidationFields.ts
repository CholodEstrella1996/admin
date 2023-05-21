import { AxiosResponse } from 'axios'

import {
  validationFieldsTopic,
  validationFieldsMaterial,
  validationFieldsCountry,
  validationFieldsApplication,
} from 'constants/validationsFieldsTabs'
import { ResponseMaterial } from 'services/models/material.model'
import { TopicResponse } from 'services/models/topic.model'
import { Content, TabsLanguageNew } from 'utils/models/modelsBase'
import { Languages } from 'utils/models/reactFormFieldsTabs'

export const addValidationFieldsTopic = (
  translations: TabsLanguageNew | AxiosResponse<TopicResponse>,
): Languages[] => {
  const DataTranslations: Languages[] = []

  translations.data.content.forEach((element: Content, id) => {
    if (element.language.languageCode === 'en-US') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsTopic.EN,
      }
      DataTranslations[id] = lang
    }
    if (element.language.languageCode === 'es-MX') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsTopic.ES,
      }
      DataTranslations[id] = lang
    }
    if (element.language.languageCode === 'pt') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsTopic.PT,
      }
      DataTranslations[id] = lang
    }
    if (element.language.languageCode === 'tr') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsTopic.TR,
      }
      DataTranslations[id] = lang
    }
  })

  return DataTranslations
}

export const addValidationFieldsMaterial = (
  translations: TabsLanguageNew | AxiosResponse<ResponseMaterial>,
): Languages[] => {
  const dataTranslations: Languages[] = []

  translations.data.content.forEach((element: Content, id) => {
    if (element.language.languageCode === 'en-US') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsMaterial.EN,
      }
      dataTranslations[id] = lang
    }
    if (element.language.languageCode === 'es-MX') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsMaterial.ES,
      }
      dataTranslations[id] = lang
    }
    if (element.language.languageCode === 'pt') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsMaterial.PT,
      }
      dataTranslations[id] = lang
    }
    if (element.language.languageCode === 'tr') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsMaterial.TR,
      }
      dataTranslations[id] = lang
    }
  })

  return dataTranslations
}

export const addValidationFieldsCountry = (
  translations: TabsLanguageNew | AxiosResponse<TopicResponse>,
): Languages[] => {
  const DataTranslations: Languages[] = []

  translations.data.content.forEach((element: Content, id) => {
    if (element.language.languageCode === 'en-US') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsCountry.EN,
      }
      DataTranslations[id] = lang
    }
    if (element.language.languageCode === 'es-MX') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsCountry.ES,
      }
      DataTranslations[id] = lang
    }
    if (element.language.languageCode === 'pt') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsCountry.PT,
      }
      DataTranslations[id] = lang
    }
    if (element.language.languageCode === 'tr') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsCountry.TR,
      }
      DataTranslations[id] = lang
    }
  })

  return DataTranslations
}

export const addValidationFieldsApp = (
  translations: TabsLanguageNew | AxiosResponse<TopicResponse>,
): Languages[] => {
  const DataTranslations: Languages[] = []

  translations.data.content.forEach((element: Content, id) => {
    if (element.language.languageCode === 'en-US') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsApplication.EN,
      }
      DataTranslations[id] = lang
    }
    if (element.language.languageCode === 'es-MX') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsApplication.ES,
      }
      DataTranslations[id] = lang
    }
    if (element.language.languageCode === 'pt') {
      const lang: Languages = {
        content: element,
        validationFields: validationFieldsApplication.PT,
      }
      DataTranslations[id] = lang
    }
  })

  return DataTranslations
}
