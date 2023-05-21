import { newApplicationService } from 'services/modules/application.module'
import { packageService } from 'services/modules/packages.module'
import { convertLanguageCode } from 'utils/helpers/convertLanguageCode'
import { convertResourceToFile } from 'utils/helpers/convertResourceToFile'
import convertToMultipart from 'utils/helpers/convertToMultipart'

import { ApplicationFormModel, ExecutablesModel } from './application.models'

export const getDefaultValuesService = () => ({
  getMainInfo: async (appId: number) => {
    const translationsResponse = await newApplicationService.getTranslations(appId)

    const translationsData = translationsResponse.data
    const { type, classroomCode, productUnitId } = translationsData.content[0]

    const tabValues = translationsData.content.map(({ language, name, description, keywords }) => {
      const languageCode = convertLanguageCode(language.languageCode)

      return [languageCode, { name, description, keywords }]
    })

    const tabs = Object.fromEntries(tabValues) as unknown as ApplicationFormModel['step1']['tabs']

    const applicationType = { id: Number(type.id), name: type.name }
    return {
      applicationType,
      classroomCode,
      productUnitId,
      tabs,
    }
  },

  getStoreAdministrationData: async (productUnitId: number) => {
    const packagesResponse = await packageService.getStore({ productUnitId })

    const packagesData = packagesResponse.data.content[0]

    const idsToDelete = packagesData.media?.map((media) => media.id) ?? []

    const convertAssociatedMedia = async () => {
      const filePromises =
        packagesData.media?.map((media) =>
          convertResourceToFile({
            url: media.content.url,
            id: String(media.content.id),
            type: media.content.format?.contentType,
          }),
        ) ?? []

      const files = await Promise.allSettled(filePromises)

      return files.flatMap((file) => (file.status === 'fulfilled' ? file.value : []))
    }

    const price = String(packagesData.price)
    const disponibility = packagesData.visible
    const associatedMedia = await convertAssociatedMedia()

    const icon = await convertResourceToFile({
      id: String(packagesData.icon.id),
      url: packagesData.icon.url,
      type: packagesData.icon.format?.contentType,
    })

    return { idsToDelete, price, disponibility, associatedMedia, icon }
  },

  getVersionData: async (appId: number) => {
    const { data: versionResponse } = await newApplicationService.getVersion(appId)
    const getExecutables = async () => {
      const items = versionResponse.downloadables
      const files = await Promise.all(
        items.map(async (item) => {
          const {
            platform: { name },
            downloadable,
          } = item
          return [
            name.toLowerCase(),
            [
              await convertResourceToFile({
                url: downloadable.url,
                id: String(downloadable.id),
                type: downloadable.format.contentType,
              }),
            ],
          ]
        }),
      )
      return Object.fromEntries(files) as ExecutablesModel
    }
    const appleUrl = versionResponse.appleUrl ?? ''
    const version = String(versionResponse.versionNumber)
    const securityVersion = String(versionResponse.securityVersionNumber)
    const AndroidPackageName = versionResponse.androidPackageName ?? ''
    return {
      appleUrl,
      version,
      securityVersion,
      AndroidPackageName,
      executables: await getExecutables(),
    }
  },
})

export const createOrUpdateAppService = (formData: ApplicationFormModel) => ({
  createApplication: async (topicId: number) => {
    const { step1 } = formData

    const body = {
      type: step1.applicationType.name,
      classroomCode: step1.classroomCode,
      name: step1.tabs.EN.name,
      description: step1.tabs.EN.description,
      keywords: step1.tabs.EN.keywords || [],
      defaultPackagePrice: Number(step1.storeAdministration.price),
      visible: step1.storeAdministration.disponibility,
      topicId,
    }

    const { data: createApplicationResponse } = await newApplicationService.createApplication(body)

    const { id: appId, defaultPackageId: packageId } = createApplicationResponse

    if (appId === undefined || packageId === undefined) throw new Error('Application not created')

    return { appId, packageId }
  },

  updateApplication: async (appId: number) => {
    const { step1 } = formData

    const body = {
      type: step1.applicationType.name,
      classroomCode: step1.classroomCode,
      name: step1.tabs.EN.name,
      description: step1.tabs.EN.description,
      keywords: step1.tabs.EN.keywords || [],
      defaultPackagePrice: Number(step1.storeAdministration.price),
      visible: step1.storeAdministration.disponibility,
    }

    const { data: createApplicationResponse } = await newApplicationService.updateApplication(
      appId,
      body,
    )

    const { defaultPackageId: packageId } = createApplicationResponse

    if (appId === undefined || packageId === undefined) throw new Error('Application not created')

    return { appId, packageId }
  },

  addTranslations: async (appId: number) => {
    const languageCodes = { EN: 'en-US', ES: 'es-MX', PT: 'pt', TR: 'tr' }

    const translations = Object.entries(formData.step1.tabs).flatMap(
      async ([language, { name, description, keywords }]) => {
        if (language === 'EN') return []

        return [
          await newApplicationService.addTranslation(appId, {
            languageCode: languageCodes[language as keyof typeof languageCodes],
            name,
            description,
            keywords: keywords || [],
          }),
        ]
      },
    )

    const addTranslationsResponse = await Promise.allSettled(translations)

    if (addTranslationsResponse.some(({ status }) => status !== 'fulfilled')) {
      throw new Error('Translations not added')
    }
  },

  uploadIcon: async (appId: number) => {
    const { status: uploadIconStatus } = await newApplicationService.uploadIcon(appId, {
      file: formData.step1.storeAdministration.icon,
    })

    if (uploadIconStatus !== 200) throw new Error('Icon not uploaded')
  },

  uploadAssociatedMedia: async (packageId: number) => {
    const { associatedMedia } = formData.step1.storeAdministration

    const asociatedMediaFiles = associatedMedia.map(async (file) =>
      packageService.createPackageMedia(convertToMultipart({ file: [file] }), packageId),
    )

    const asociatedMediaFilesResponse = await Promise.allSettled(asociatedMediaFiles)

    if (asociatedMediaFilesResponse.some(({ status }) => status !== 'fulfilled')) {
      throw new Error('Associated media not uploaded')
    }
  },

  deleteAssociatedMedia: async (packageId: number, associatedMediaIds: number[]) => {
    const deleteAssociatedMedia = associatedMediaIds.map(async (associatedMediaId) =>
      packageService.deletePackageMedia(associatedMediaId),
    )

    const deleteAssociatedMediaResponse = await Promise.allSettled(deleteAssociatedMedia)

    if (deleteAssociatedMediaResponse.some(({ status }) => status !== 'fulfilled')) {
      throw new Error('Associated media not deleted')
    }
  },

  createVersion: async (appId: number) => {
    const { step1 } = formData

    const { data: createVersionResponse } = await newApplicationService.createVersion(appId, {
      description: step1.tabs.EN.name,
      versionNumber: -1,
      securityVersionNumber: -1,
    })

    const { id: versionId } = createVersionResponse

    if (versionId === undefined) throw new Error('Version not created')

    return versionId
  },
})
