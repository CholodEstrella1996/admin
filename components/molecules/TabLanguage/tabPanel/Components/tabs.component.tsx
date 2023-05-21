import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Chip } from '@folcode/cloudlabs.atoms.chip'

import { Content } from 'utils/models/modelsBase'

type Props = {
  data: Content
  titles: { name: string; description?: string; attachChipFile?: string }
  variant: 'simple-country' | 'title-description-chip' | 'title-description-file'
}

const Tabs = ({ data, titles, variant }: Props) => {
  const { name, description, keywords, content } = data
  const { colors } = theme

  return (
    <>
      <div className="tab-padding__bottom">
        <Typography
          className="tab-padding__Bottom--small"
          color={colors.neutrals[300]}
          variant="label">
          {titles.name}
        </Typography>
        <Typography color={colors.neutrals[400]} variant="s2">
          {name}
        </Typography>
      </div>

      {variant !== 'simple-country' && (
        <>
          <div className="tab-padding__bottom">
            <Typography
              className="tab-padding__Bottom--small"
              color={colors.neutrals[300]}
              variant="label">
              {titles.description}
            </Typography>
            <Typography color={colors.neutrals[400]} variant="s2">
              {description}
            </Typography>
          </div>
          <div className="tab-padding__Bottom--small">
            <Typography color={colors.neutrals[300]} variant="label">
              {titles.attachChipFile}
            </Typography>
          </div>
        </>
      )}
      <div className="chips-list">
        {keywords?.map((chip, index) => (
          <Chip key={chip} index={index} option={chip} />
        ))}
      </div>
      {content && (
        <Typography variant="s2" color={colors.neutrals[400]}>
          {content.name}
        </Typography>
      )}
    </>
  )
}

export default Tabs
