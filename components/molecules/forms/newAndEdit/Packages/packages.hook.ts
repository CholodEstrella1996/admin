import { packageService } from 'services/modules/packages.module'
import { convertLanguageCode } from 'utils/helpers/convertLanguageCode'
import { convertResourceToFile } from 'utils/helpers/convertResourceToFile'
import convertToMultipart from 'utils/helpers/convertToMultipart'
import { useNotification } from 'utils/hooks/notification'
import { useTreeConversions } from 'utils/hooks/useTreeConversions'
import { RFile } from 'utils/models/reactFormFieldsTabs'

import { Medias, PackageFormModel } from './packages.models'

export const usePackage = () => {
  // Hooks
  const { convertResponseToTree } = useTreeConversions()
  const { onError } = useNotification()

  // Applications Tree
  const getApplicationTree = async (packageId?: number) => {
    const packageExists = packageId === undefined
    const response = packageExists
      ? await packageService.getPackageTree()
      : await packageService.getPackageTreeWithStatus(packageId)

    return convertResponseToTree({ nodes: response.data.content })
  }

  const formatBody = (data: PackageFormModel, selectedTreeNodes: number[]) => {
    const packageDataBody = {
      name: data.step2.tabs.EN.name,
      description: data.step2.tabs.EN.description,
      visible: data.step2.storePackage.disponibility,
      defaultPackage: false,
      type: 'saleable',
      price: Number(data.step3.price),
      keywords: data.step2.tabs.EN.keywords || [],
      packageIds: selectedTreeNodes,
      translations: [
        {
          languageCode: 'es-MX',
          name: data.step2.tabs.ES.name,
          description: data.step2.tabs.ES.description,
          keywords: data.step2.tabs.ES.keywords || [],
        },

        {
          languageCode: 'pt',
          name: data.step2.tabs.PT.name,
          description: data.step2.tabs.PT.description,
          keywords: data.step2.tabs.PT.keywords || [],
        },
        {
          languageCode: 'tr',
          name: data.step2.tabs.TR.name,
          description: data.step2.tabs.TR.description,
          keywords: data.step2.tabs.TR.keywords || [],
        },
      ],
    }

    const formData = new FormData()

    if ((data.step2.storePackage.icon[0]?.data as File)?.size)
      formData.append('file', data.step2.storePackage.icon[0]?.data as File)

    formData.append(
      'data',
      new Blob([JSON.stringify(packageDataBody)], { type: 'application/json' }),
    )
    return formData
  }

  const getStoreMedia = async (packageId: number) => {
    const response = await packageService.getPackageTreeWithStatusDetail(packageId)

    return response
  }
  const uploadAssociatedMedia = async (packageId: number, formData: PackageFormModel) => {
    const { associatedMedia } = formData.step2.storePackage

    const asociatedMediaFiles = associatedMedia.map(async (file) =>
      packageService.createPackageMedia(convertToMultipart({ file: [file] }), packageId),
    )

    const asociatedMediaFilesResponse = await Promise.allSettled(asociatedMediaFiles)

    if (asociatedMediaFilesResponse.some(({ status }) => status !== 'fulfilled')) {
      onError('Medios asociados no cargados')
    }

    return asociatedMediaFilesResponse
  }
  const deleteAssociatedMedia = async (
    packageId: number,
    associatedMedia: Medias[],
    FilesMediaStep: RFile[],
  ) => {
    const filesToDelete = associatedMedia.filter((backFile) => {
      const idToFind = String(backFile.content.id)

      const isDeleteFile = FilesMediaStep.some((frontFile) => frontFile.id === idToFind)

      return !isDeleteFile
    })
    filesToDelete.map(async (file) => packageService.deletePackageMedia(file.id))
  }

  const uploadNewAssociatedMedia = async (
    packageId: number,
    associatedMedia: Medias[],
    FilesMediaStep: RFile[],
  ) => {
    const filesToUpload = FilesMediaStep.filter((frontFile) => {
      const idToFind = frontFile.id

      const isNewFile = associatedMedia.some((backFile) => String(backFile.content.id) === idToFind)

      return !isNewFile
    })

    const asociatedMediaFiles = filesToUpload.map(async (file) =>
      packageService.createPackageMedia(convertToMultipart({ file: [file] }), packageId),
    )

    const asociatedMediaFilesResponse = await Promise.allSettled(asociatedMediaFiles)

    if (asociatedMediaFilesResponse.some(({ status }) => status !== 'fulfilled')) {
      onError('Medios asociados no cargados')
    }
  }

  const getStoreAdministrationData = async (packageId: number) => {
    const storeAdmin = await getStoreMedia(packageId)

    const packagesData = storeAdmin.data

    const tabValues = packagesData.translations.map(({ language, name, description, keywords }) => {
      const languageCode = convertLanguageCode(language.languageCode)

      return [languageCode, { name, description, keywords }]
    })
    const medias = packagesData.media

    const tabs = Object.fromEntries(tabValues) as unknown as PackageFormModel['step2']['tabs']

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

    const disponibility = packagesData.visible
    const associatedMedia = await convertAssociatedMedia()

    const icon = await convertResourceToFile({
      id: String(packagesData.icon.id),
      url: packagesData.icon.url,
      type: packagesData.icon.format?.contentType,
    })

    return { disponibility, associatedMedia, icon, tabs, medias }
  }

  // Return
  return {
    getApplicationTree,
    getStoreMedia,
    getStoreAdministrationData,
    uploadAssociatedMedia,
    deleteAssociatedMedia,
    uploadNewAssociatedMedia,
    formatBody,
  }
}
