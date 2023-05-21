import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Divider } from '@mui/material'

import { LanguageTabs } from 'components/molecules/forms/components/LanguageTabs'
import { StoreAdmin } from 'components/molecules/forms/components/StoreAdmin'

import FormEditTopicStyles from '../formNewEditTopic.styles'

const { colors } = theme

const FormEditTopic = () => (
  <>
    <div className="formTopic__container">
      <div className="tab__container">
        <Typography variant="s1" color={colors.primary[500]} className="tab__title">
          Información de la Temática
        </Typography>

        <LanguageTabs
          inputs={[
            {
              label: 'Nombre de la temática',
              name: (code) => `topicName${code}`,
              type: 'title',
              rules: { required: true },
            },
            {
              label: 'Descripción de la temática',
              name: (code) => `topicDescription${code}`,
              type: 'description',
              rules: { required: true },
            },
            {
              label: 'Palabras clave',
              name: (code) => `topicKeyword${code}`,
              type: 'keywords',
            },
          ]}
        />
      </div>

      <Divider orientation="vertical" flexItem />

      <div className="detail__container">
        <StoreAdmin
          inputs={[
            {
              type: 'disponibility',
              name: 'topicDisponibility',
            },
            {
              type: 'icon',
              name: 'file',
              rules: { required: true },
            },
            {
              type: 'price',
              name: 'topicPrice',
              rules: { required: true },
            },
          ]}
        />
      </div>
    </div>
    <style jsx>{FormEditTopicStyles}</style>
  </>
)

export default FormEditTopic
