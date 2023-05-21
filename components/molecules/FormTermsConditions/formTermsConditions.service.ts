import userService from 'services/modules/user.module'

import { LanguageTypes } from '../forms/newAndEdit/Application/application.models'

export type FieldsTermsCondition = {
  [key in LanguageTypes]: string
} & { termsCondTitle: string; termsCondVersion: string }

const FormNewEditTermsConditionsService = async (
  data: FieldsTermsCondition,
  isNewForm: boolean,
  idTermsCondition: number,
): Promise<number> => {
  const { EN, ES, PT, TR, termsCondTitle, termsCondVersion } = data

  const bodyDataPutEN = {
    title: termsCondTitle,
    version: termsCondVersion,
    description: EN,
    active: true,
    translations: [],
  }

  const putBodyData = {
    title: termsCondTitle,
    version: termsCondVersion,
    description: EN,
    active: true,
    translations: [
      {
        description: ES,
        languageCode: 'es-MX',
      },
      {
        description: PT,
        languageCode: 'pt',
      },
      {
        description: TR,
        languageCode: 'tr',
      },
    ],
  }

  if (isNewForm) {
    const responsePost = await userService.postTermAndCondition(bodyDataPutEN)

    if (responsePost.data.id) {
      const responsePut = await userService.putTermAndCondition(putBodyData, responsePost.data.id)

      if (responsePut.status === 200) return responsePost.data.id
    }
  }

  if (!isNewForm && idTermsCondition !== undefined) {
    const responsePut = await userService.putTermAndCondition(putBodyData, idTermsCondition)

    if (responsePut.status === 200) return idTermsCondition
  }

  return -1
}

export default FormNewEditTermsConditionsService
