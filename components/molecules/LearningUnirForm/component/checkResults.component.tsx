/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { TextIcon } from '@folcode/clabs.atoms.text-icon'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { Content } from 'utils/models/modelsBase'

import { LearningUnitFormStyles } from '../learningUnitForm.styles'

type Props = {
  options?: Content[]
  onChange: (item: Content) => void
}

const CheckResults = ({ onChange, options }: Props) => {
  const { colors } = theme

  return (
    <>
      <div className="checkResults__content">
        <Typography variant="s1" color={colors.neutrals[400]}>
          Seleccione Unidades de aprendizajes
        </Typography>
        {!!options &&
          options.map((item) => (
            <div
              key={item.id}
              className="checkResults__textIcon"
              onClick={() => {
                onChange(item)
              }}>
              <TextIcon size="medium" icon={item.iconUrl} text={item.name} id={item.name} />
            </div>
          ))}
      </div>
      <style jsx>{LearningUnitFormStyles}</style>
    </>
  )
}
export default CheckResults
