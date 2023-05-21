import { PostTopicProps } from 'services/models/topic.model'
import { topicService } from 'services/modules/topic.module'
import { RFormFieldsTabs } from 'utils/models/reactFormFieldsTabs'

const FormNewEditTopicService = async (
  data: RFormFieldsTabs,
  isNewForm: boolean,
  idArea: number,
  idEditTopic?: number,
): Promise<number> => {
  const {
    topicDescriptionEN,
    topicDescriptionES,
    topicDescriptionPT,
    topicDescriptionTR,

    topicDisponibility,
    file,

    topicNameEN,
    topicNameES,
    topicNamePT,
    topicNameTR,

    topicPrice,
    topicKeywordEN,
    topicKeywordES,
    topicKeywordPT,
    topicKeywordTR,
  } = data

  const bodyDataES: PostTopicProps = {
    description: topicDescriptionES,
    keywords: topicKeywordES.length === 0 ? null : topicKeywordES,
    languageCode: 'es-MX',
    name: topicNameES,
  }
  const bodyDataPT: PostTopicProps = {
    description: topicDescriptionPT,
    keywords: topicKeywordPT.length === 0 ? null : topicKeywordPT,
    languageCode: 'pt',
    name: topicNamePT,
  }

  const bodyDataTR: PostTopicProps = {
    description: topicDescriptionTR,
    keywords: topicKeywordTR.length === 0 ? null : topicKeywordTR,
    languageCode: 'tr',
    name: topicNameTR,
  }
  const bodyDataPutEN: PostTopicProps = {
    description: topicDescriptionEN,
    keywords: topicKeywordEN.length === 0 ? null : topicKeywordEN,
    name: topicNameEN,
    visible: topicDisponibility,
    defaultPackagePrice: topicPrice,
  }

  if (isNewForm) {
    const bodyDataEN: PostTopicProps = {
      areaId: idArea,
      defaultPackagePrice: topicPrice,
      description: topicDescriptionEN,
      keywords: topicKeywordEN.length === 0 ? null : topicKeywordEN,
      name: topicNameEN,
      visible: topicDisponibility,
    }

    const responsePostTopic = await topicService.postTopicEnglishService(bodyDataEN)

    if (responsePostTopic.data.id) {
      const [putTopicES, putTopicPT, putTopicTR, putIcon] = await Promise.all([
        topicService.putTopicTranslationsService(bodyDataES, responsePostTopic.data.id),
        topicService.putTopicTranslationsService(bodyDataPT, responsePostTopic.data.id),
        topicService.putTopicTranslationsService(bodyDataTR, responsePostTopic.data.id),
        topicService.putIcon(file[0], responsePostTopic.data.id),
      ])

      const isResponsePutOk =
        putTopicPT.status && putTopicES.status && putIcon.status && putTopicTR.status

      if (isResponsePutOk === 200) return responsePostTopic.data.id
    }
  }
  if (!isNewForm && idEditTopic !== undefined) {
    let statusIcon
    if (file[0].data !== undefined) {
      const putIcon = await topicService.putIcon(file[0], idEditTopic)
      statusIcon = putIcon.status
    } else statusIcon = 200

    const [putTopicEN, putTopicES, putTopicPT, putTopicTR] = await Promise.all([
      topicService.putTopicEnglishService(bodyDataPutEN, idEditTopic),
      topicService.putTopicTranslationsService(bodyDataES, idEditTopic),
      topicService.putTopicTranslationsService(bodyDataPT, idEditTopic),
      topicService.putTopicTranslationsService(bodyDataTR, idEditTopic),
    ])

    const isResponsePutOk =
      putTopicPT.status && putTopicES.status && putTopicEN.status && statusIcon && putTopicTR.status

    if (isResponsePutOk === 200) return idEditTopic
  }
  return -1
}

export default FormNewEditTopicService
