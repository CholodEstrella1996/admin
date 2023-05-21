import { ApplicationTechnical } from 'services/models/applicationTechnical.model'
import { PackageResponse } from 'services/models/packages/response.model'
import { TopicResponse } from 'services/models/topic.model'
import { RFile, RFormFieldsTabs } from 'utils/models/reactFormFieldsTabs'

// TODO - add keywords

const getEnglishData = (validatedData: RFormFieldsTabs, id?: number) => ({
  classroomCode: validatedData.applicationClassroomCode,
  defaultPackagePrice: validatedData.applicationPrice,
  description: validatedData.applicationDescriptionEN,
  keywords: [],
  name: validatedData.applicationNameEN,
  type: validatedData.applicationType,
  visible: validatedData.applicationDisponibility,
  ...(id && { topicId: id }),
})

const getSpanishData = (validatedData: RFormFieldsTabs) => ({
  description: validatedData.applicationDescriptionES,
  name: validatedData.applicationNameES,
  keywords: [],
  languageCode: 'es-MX',
})

const getPortugueseData = (validatedData: RFormFieldsTabs) => ({
  description: validatedData.applicationDescriptionPT,
  name: validatedData.applicationNamePT,
  keywords: [],
  languageCode: 'pt',
})

const getLastVerion = (validatedData: RFormFieldsTabs, id: number) => ({
  applicationId: id,
  description: validatedData.applicationAppStore,
  securityVersionNumber: validatedData.applicationSecurityVersion,
  versionNumber: validatedData.applicationVersionNumber,
})

const getMediaFile = (application: RFile, platform?: string, packageName = '') => {
  const mediaFormData = new FormData()
  mediaFormData.append('file', application.data ?? '')
  if (platform) {
    mediaFormData.append(
      'data',
      new Blob(
        [
          JSON.stringify({
            platform,
            packageName,
          }),
        ],
        {
          type: 'application/json',
        },
      ),
    )
  }

  return mediaFormData
}

const setDefaultValues = (
  technicalDetail: ApplicationTechnical,
  application: TopicResponse,
  store: PackageResponse['getStore'],
) => {
  const medias = store.content[0].media?.map((media) => ({
    id: String(media.content.id),
    name: media.content.name,
    url: media.content.url,
  }))

  return {
    applicationPrice: store.content[0].price,
    applicationDisponibility: store.content[0].visible,
    applicationType: (application.content[0].type?.id ?? 1).toString(),
    applicationClassroomCode: application.content[0].classroomCode ?? '',
    applicationNameEN: application.content[0].name,
    applicationNameES: application.content[2].name,
    applicationNamePT: application.content[1].name,
    applicationDescriptionEN: application.content[0].description,
    applicationDescriptionES: application.content[2].description,
    applicationDescriptionPT: application.content[1].description,
    applicationAppStore: technicalDetail.appleUrl,
    applicationVersionNumber: technicalDetail.versionNumber,
    applicationSecurityVersion: technicalDetail.securityVersionNumber,
    applicationAndroidPackageName: technicalDetail.androidPackageName,
    applicationIconFile: [
      {
        id: String(store.content[0].icon.id),
        url: store.content[0].icon.url,
        name: store.content[0].icon.name,
      },
    ],
    applicationAppleFile: [
      {
        id: String(technicalDetail.downloadables[0].id),
        url: technicalDetail.downloadables[0].downloadable.url,
        name: technicalDetail.downloadables[0].downloadable.name,
      },
    ],
    applicationAndroidFile: [
      {
        id: String(technicalDetail.downloadables[1].id),
        url: technicalDetail.downloadables[1].downloadable.url,
        name: technicalDetail.downloadables[1].downloadable.name,
      },
    ],
    applicationWindowsFile: [
      {
        id: String(technicalDetail.downloadables[2].id),
        url: technicalDetail.downloadables[2].downloadable.url,
        name: technicalDetail.downloadables[2].downloadable.name,
      },
    ],
    applicationWebFile: [
      {
        id: String(technicalDetail.downloadables[3].id),
        url: technicalDetail.downloadables[3].downloadable.url,
        name: technicalDetail.downloadables[3].downloadable.name,
      },
    ],
    applicationMediaFile: medias,
  }
}

export {
  getEnglishData,
  getSpanishData,
  getPortugueseData,
  getLastVerion,
  getMediaFile,
  setDefaultValues,
}
