import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import FormDetailsCurriculumGradeContainer from 'components/modules/FormDetailsCurriculumGrade'

const DetailCurriculumGradePage: NextPage = () => {
  const router = useRouter()
  const { gradeId } = router.query
  return gradeId !== undefined ? (
    <FormDetailsCurriculumGradeContainer idGrade={Number(gradeId)} />
  ) : null
}

export default DetailCurriculumGradePage
