import { groupsService } from 'services/modules/groups.module'

import { FormNewEditCountryModel } from './formNewEditCountry.model'

const formatBody = (data: FormNewEditCountryModel) => {
  const dataBodyPost = {
    name: data.countryNameEN,
    kind: 'country',
    visible: data.countryDisponibility,
    translations: [
      {
        languageCode: 'es-MX',
        name: data.countryNameES,
      },
      {
        languageCode: 'pt',
        name: data.countryNamePT,
      },
      {
        languageCode: 'tr',
        name: data.countryNameTR,
      },
    ],
  }
  const formData = new FormData()

  if ((data.countryIcon[0]?.data as File)?.size)
    formData.append('file', data.countryIcon[0]?.data as File)

  formData.append('data', new Blob([JSON.stringify(dataBodyPost)], { type: 'application/json' }))

  return formData
}

const FormNewEditCountryService = async (
  data: FormNewEditCountryModel,
  isNewForm: boolean,
  idCountry: number,
): Promise<number> => {
  if (isNewForm) {
    const idTranslate = await groupsService.postGroup(formatBody(data))
    return idTranslate.data.id
  }

  if (!isNewForm) {
    const idTranslate = await groupsService.putGroup(formatBody(data), idCountry)
    return idTranslate.data.id
  }
  return -1
}

export default FormNewEditCountryService
