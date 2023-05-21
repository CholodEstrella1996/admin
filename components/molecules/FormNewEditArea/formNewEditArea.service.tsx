import { AreaRequest } from 'services/models/areas/request.model'
import { areaService } from 'services/modules/area.module'
import { RFormFieldsTabs } from 'utils/models/reactFormFieldsTabs'

const FormNewEditAreaService = async (
  data: RFormFieldsTabs,
  isNewForm: boolean,
  idEditArea?: number,
): Promise<number> => {
  const {
    areaDescriptionEN,
    areaDescriptionES,
    areaDescriptionPT,
    areaDescriptionTR,

    areaDisponibility,

    file,

    areaNameEN,
    areaNameES,
    areaNamePT,
    areaNameTR,

    areaPrice,
    areaColor,
    areaColorLight,
    areaColorDark,

    areaKeywordEN,
    areaKeywordES,
    areaKeywordPT,
    areaKeywordTR,
  } = data

  const bodyDataES: AreaRequest['putAreaTranslationsService'] = {
    name: areaNameES,
    description: areaDescriptionES,
    keywords: areaKeywordES.length === 0 ? null : areaKeywordES,
    languageCode: 'es-MX',
  }

  const bodyDataTR: AreaRequest['putAreaTranslationsService'] = {
    name: areaNameTR,
    description: areaDescriptionTR,
    keywords: areaKeywordTR.length === 0 ? null : areaKeywordTR,
    languageCode: 'tr',
  }

  const bodyDataPT: AreaRequest['putAreaTranslationsService'] = {
    name: areaNamePT,
    description: areaDescriptionPT,
    keywords: areaKeywordPT.length === 0 ? null : areaKeywordPT,
    languageCode: 'pt',
  }

  const bodyDataPutEN: AreaRequest['putAreaTranslationsService'] = {
    description: areaDescriptionEN,
    keywords: areaKeywordEN.length === 0 ? null : areaKeywordEN,
    name: areaNameEN,
    visible: areaDisponibility,
    defaultPackagePrice: areaPrice,
    color: areaColor,
    colorDark: areaColorDark,
    colorLight: areaColorLight,
  }

  if (isNewForm) {
    const bodyDataEN: AreaRequest['postAreaEnglishService'] = {
      name: areaNameEN,
      description: areaDescriptionEN,
      keywords: areaKeywordEN.length === 0 ? null : areaKeywordEN,
      visible: areaDisponibility,
      color: areaColor,
      colorDark: areaColorDark,
      colorLight: areaColorLight,
      defaultPackagePrice: areaPrice,
    }

    const responsePostArea = await areaService.postAreaEnglishService(bodyDataEN)

    if (responsePostArea.data.id) {
      const [putAreaES, putAreaPT, putAreaTR, putIcon] = await Promise.all([
        areaService.putAreaTranslationsService(bodyDataES, responsePostArea.data.id),
        areaService.putAreaTranslationsService(bodyDataPT, responsePostArea.data.id),
        areaService.putAreaTranslationsService(bodyDataTR, responsePostArea.data.id),
        areaService.putIcon(file[0], responsePostArea.data.id),
      ])

      const isResponsePutOk =
        putAreaES.status && putAreaPT.status && putIcon.status && putAreaTR.status

      if (isResponsePutOk === 200) return responsePostArea.data.id
    }
  }

  if (!isNewForm && idEditArea !== undefined) {
    if (areaColor !== undefined) {
      bodyDataPutEN.color = areaColor
    }
    if (areaColorDark !== undefined) {
      bodyDataPutEN.colorDark = areaColorDark
    }
    if (areaColorLight !== undefined) {
      bodyDataPutEN.colorLight = areaColorLight
    }
    let icon

    if (file[0].data !== undefined) {
      const putIcon = await areaService.putIcon(file[0], idEditArea)
      icon = putIcon.status
    } else icon = 200

    const [putAreaEN, putAreaES, putAreaPT, putAreaTR] = await Promise.all([
      areaService.putAreaEnglishService(bodyDataPutEN, idEditArea),
      areaService.putAreaTranslationsService(bodyDataES, idEditArea),
      areaService.putAreaTranslationsService(bodyDataPT, idEditArea),
      areaService.putAreaTranslationsService(bodyDataTR, idEditArea),
    ])

    const isResponsePutOk =
      putAreaPT.status && putAreaES.status && putAreaEN.status && putAreaTR.status && icon

    if (isResponsePutOk === 200) return idEditArea
  }
  return -1
}

export default FormNewEditAreaService
