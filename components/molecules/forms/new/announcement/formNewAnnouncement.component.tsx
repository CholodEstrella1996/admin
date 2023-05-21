import theme from '@folcode/clabs.others.theme-provider'

import { FormLoad, FormLoadProps } from 'components/molecules/forms/components/FormLoad'
// import { ApiResponseBook } from 'services/models/book.model'
// import { Options } from 'utils/models/reactFormFieldsTabs'

import FormEditorialBook from './components/formNewAnnouncement.component'
import { FormNewAnnouncementLocalStyles } from './formNewAnnouncement.styles'

type Props = {
  /*  selectArea?: Options[]
  selectGrade?: Options[]
  selectLevel?: Options[]
  dataBook?: ApiResponseBook */

  formLoadProps: Omit<FormLoadProps, 'steps'>
}

const FormNewAnnouncement = (props: Props) => {
  const { formLoadProps } = props
  const { colors } = theme

  const formEditorialBook = <FormEditorialBook />

  const steps = [{ id: 1, element: formEditorialBook }]

  return (
    <>
      <div className={colors.engineering[100]} />

      <FormLoad steps={steps} {...formLoadProps} />

      <style jsx>{FormNewAnnouncementLocalStyles}</style>
    </>
  )
}

export default FormNewAnnouncement
