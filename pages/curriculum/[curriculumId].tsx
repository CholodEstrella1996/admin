import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import FormDetailsCurriculum from 'components/modules/FormDetailsCurriculum'

const DetailCurriculumPage: NextPage = () => {
  const router = useRouter()
  const { curriculumId } = router.query
  if (typeof curriculumId !== 'string') return null
  return <FormDetailsCurriculum curriculumId={Number(curriculumId)} />
}

export default DetailCurriculumPage
