import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Divider } from '@mui/material'

import { InputText } from 'components/atoms/inputs/InputText'

import { FormLoad, FormLoadProps } from '../forms/components/FormLoad'
import { StoreAdmin } from '../forms/components/StoreAdmin'
import {
  FormNewEditCurriculumsGlobalStyles,
  FormNewEditCurriculumsLocalStyles,
} from './formNewEditCurriculums.styles'

const { colors } = theme

type FormNewEditCurriculumsProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>

  isDescriptionRequired?: boolean
  isYear?: boolean

  content: {
    title: string
    name: string
    description: string
  }
}

const FormNewEditCurriculums = (props: FormNewEditCurriculumsProps) => {
  // Props
  const { content, isDescriptionRequired, isYear, formLoadProps } = props

  // Data
  const heigthFormsContainer = isYear
    ? 'formCurriculums__container--year'
    : 'formCurriculums__container'

  // Render
  const formsCurriculums = (
    <div className={heigthFormsContainer}>
      <div className="formCurriculums__information">
        <Typography color={colors.primary[500]} variant="s1" className="formCurriculums__title">
          {content.title}
        </Typography>

        <InputText name="curriculumName" label={content.name} rules={{ maxLength: 50 }} />

        {isYear && <InputText name="curriculumsYear" label="Año de adopción" type="number" />}

        <InputText
          name="curriculumDescription"
          label={content.description}
          multiline
          rows={10}
          cols={50}
          rules={{ required: isDescriptionRequired, maxLength: 1000 }}
        />
      </div>

      <Divider orientation="vertical" flexItem />

      <div className="formCurriculums__store">
        <StoreAdmin inputs={[{ type: 'disponibility', name: 'curriculumDisponibility' }]} />
      </div>

      <style jsx>{FormNewEditCurriculumsLocalStyles}</style>
      <style jsx global>
        {FormNewEditCurriculumsGlobalStyles}
      </style>
    </div>
  )

  const steps = [{ id: 1, element: formsCurriculums }]

  return <FormLoad steps={steps} {...formLoadProps} />
}

export default FormNewEditCurriculums
