import applicationService from 'services/modules/application'
import materialService from 'services/modules/material.module'
import { RFormFieldsTabs, Options, RFile } from 'utils/models/reactFormFieldsTabs'

export type ResponseUpdateMaterial = {
  description: string
  file: File | RFile | undefined
  name: string
  authorities?: string[]
  type?: string
}

const FormNewEditMaterialService = async (
  data: RFormFieldsTabs,
  isNewForm: boolean,
  listAuth: Options[],
  idApplication?: number,
  idMaterial?: number,
): Promise<number> => {
  const {
    materialNameEN,
    materialDescriptionEN,
    fileEN,
    materialNameES,
    materialDescriptionES,
    fileES,
    materialNamePT,
    materialDescriptionPT,
    filePT,
    materialNameTR,
    materialDescriptionTR,
    fileTR,
    materialType,
    materialAuthorities,
  } = data

  const formatBody = (dataMaterial: ResponseUpdateMaterial) => {
    const formData = new FormData()
    const newData = dataMaterial
    if ((dataMaterial.file as File).size) formData.append('file', dataMaterial.file as File)
    const { file, ...newData2 } = newData
    formData.append('data', new Blob([JSON.stringify(newData2)], { type: 'application/json' }))
    return formData
  }

  const bodyDataEN = {
    description: materialDescriptionEN,
    file: fileEN[0].data ? fileEN[0].data : fileEN[0],
    name: materialNameEN,
    type: materialType.name || undefined,
    authorities:
      (materialAuthorities.name === `Estudiantes y Profesores`
        ? [listAuth[0].name, listAuth[1].name]
        : [materialAuthorities.name]) || undefined,
  }

  const bodyDataES = {
    description: materialDescriptionES,
    file: fileES[0].data ? fileES[0].data : fileES[0],
    name: materialNameES,
    languageCode: 'es-MX',
  }
  const bodyDataPT = {
    description: materialDescriptionPT,
    file: filePT[0].data ? filePT[0].data : filePT[0],
    name: materialNamePT,
    languageCode: 'pt',
  }
  const bodyDataTR = {
    description: materialDescriptionTR,
    file: fileTR[0].data ? fileTR[0].data : fileTR[0],
    name: materialNameTR,
    languageCode: 'tr',
  }

  if (isNewForm) {
    try {
      if (idApplication) {
        const responsePostMaterial = await applicationService.createApplicationsMaterial(
          idApplication,
          formatBody(bodyDataEN),
        )
        if (responsePostMaterial.data.id) {
          const [responsePutMaterialES, responsePutMaterialPT, responsePutMaterialTR] =
            await Promise.all([
              materialService.updateMaterialTranslations(
                responsePostMaterial.data.id,
                formatBody(bodyDataES),
              ),
              materialService.updateMaterialTranslations(
                responsePostMaterial.data.id,
                formatBody(bodyDataPT),
              ),
              materialService.updateMaterialTranslations(
                responsePostMaterial.data.id,
                formatBody(bodyDataTR),
              ),
            ])

          const isResponseOK =
            responsePostMaterial.status &&
            responsePutMaterialES.status &&
            responsePutMaterialPT.status &&
            responsePutMaterialTR.status

          if (isResponseOK === 200) return 200
        }
      }
      return 0
    } catch {
      return 0
    }
  } else {
    try {
      if (idMaterial !== undefined) {
        const [
          responsePutMaterialEN,
          responsePutMaterialES,
          responsePutMaterialPT,
          responsePutMaterialTR,
        ] = await Promise.all([
          materialService.updateMaterialTranslationsBase(idMaterial, formatBody(bodyDataEN)),
          materialService.updateMaterialTranslations(idMaterial, formatBody(bodyDataES)),
          materialService.updateMaterialTranslations(idMaterial, formatBody(bodyDataPT)),
          materialService.updateMaterialTranslations(idMaterial, formatBody(bodyDataTR)),
        ])

        const isResponseOK =
          responsePutMaterialEN.status &&
          responsePutMaterialES.status &&
          responsePutMaterialPT.status &&
          responsePutMaterialTR.status

        if (isResponseOK === 200) return 200
      }
      return 0
    } catch {
      return 0
    }
  }
}

export default FormNewEditMaterialService
