/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { TextIcon } from '@folcode/clabs.atoms.text-icon'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { Content } from 'utils/models/modelsBase'

import { LearningUnitFormStyles } from '../learningUnitForm.styles'

type Props = {
  items: Content[]
  onRemove: (items: number) => void
}
const { colors } = theme
const SelectedItems = ({ items, onRemove }: Props) => (
  <div className="checkResults__content">
    <Typography variant="s1" color={colors.neutrals[400]}>
      Unidades de aprendizajes seleccionadas
    </Typography>

    {items.map((item) => (
      <div key={item.id} className="checkResults__textIcon" onClick={() => onRemove(item.id)}>
        <TextIcon size="medium" icon={item.iconUrl} text={item.name} id={item.name} />
      </div>
    ))}
    <style jsx>{LearningUnitFormStyles}</style>
  </div>
)

export default SelectedItems
