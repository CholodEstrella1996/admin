import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Divider } from '@mui/material'

import { InputText } from 'components/atoms/inputs/InputText'

import { FormLoad, FormLoadProps } from '../forms/components/FormLoad'
import { StoreAdmin } from '../forms/components/StoreAdmin'
import {
  FormNewEditEditorialTopicGlobalStyles,
  FormNewEditEditorialTopicLocalStyles,
} from './formNewEditEditorialTopic.styles'

const { colors } = theme

type FormNewEditEditorialTopicProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>
}

const FormNewEditEditorialTopic = (props: FormNewEditEditorialTopicProps) => {
  const { formLoadProps } = props

  const formTopic = (
    <>
      <div className="formNewEditTopic__container">
        <div className="formNewEditTopic__content--input">
          <Typography color={colors.primary[500]} variant="s1">
            Información del Tema
          </Typography>

          <InputText
            name="topicEditorialTitle"
            label="Título del tema"
            rules={{ required: true, maxLength: 50 }}
          />
        </div>

        <Divider orientation="vertical" flexItem />

        <div className="formNewEditTopic__content--toggle">
          <StoreAdmin inputs={[{ type: 'disponibility', name: 'topicEditorialDisponibility' }]} />
        </div>
      </div>
      <style jsx>{FormNewEditEditorialTopicLocalStyles}</style>
      <style jsx global>
        {FormNewEditEditorialTopicGlobalStyles}
      </style>
    </>
  )

  const step = [{ id: 1, element: formTopic }]

  return <FormLoad steps={step} {...formLoadProps} />
}

export default FormNewEditEditorialTopic
