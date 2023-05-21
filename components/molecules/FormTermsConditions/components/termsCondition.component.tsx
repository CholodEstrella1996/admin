import React from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Divider } from '@mui/material'

import { InputText } from 'components/atoms/inputs/InputText'
import { LanguageTabs } from 'components/molecules/forms/components/LanguageTabs'

import FormEditTopicStyles from '../formTermsConditions.styles'

const { colors } = theme

const TermsCondition = () => (
  <>
    <div className="formTermCondition_container">
      <div className="tab__content">
        <Typography variant="s1" color={colors.primary[500]} className="tab__title">
          Configuración
        </Typography>

        <InputText
          name="termsCondTitle"
          label="Título"
          placeholder="Ingresa un titulo"
          rules={{ required: true, maxLength: 50 }}
          size="medium"
          withClear
        />

        <InputText
          name="termsCondVersion"
          label="version"
          placeholder="Ingresa una version"
          rules={{
            required: true,
            maxLength: 50,
          }}
          size="medium"
          withClear
        />
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="tab__container">
        <Typography variant="s1" color={colors.primary[500]} className="tab__title">
          Términos y condiciones
        </Typography>

        <div className="tab__text-editor">
          <LanguageTabs
            inputs={[
              {
                name: (code) => code,
                type: 'textEditor',
                rules: { required: true },
              },
            ]}
          />
        </div>
      </div>
    </div>
    <style jsx>{FormEditTopicStyles}</style>
  </>
)

export default TermsCondition
