import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import FormDetailsCurriculumAssignatureContainer from 'components/modules/FormDetailsCurriculumAssignature'

const DetailCurriculumAssignaturePage: NextPage = () => {
  const router = useRouter()
  const { subjectId } = router.query

  return subjectId !== undefined ? (
    <FormDetailsCurriculumAssignatureContainer idAssignature={Number(subjectId)} />
  ) : null
}

export default DetailCurriculumAssignaturePage
