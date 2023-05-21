import React from 'react'

import styled from '@emotion/styled'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { LinearProgress, linearProgressClasses } from '@mui/material'

import { Badge } from 'components/atoms/badge'

import { ProgressBarGlobalStyles, ProgressBarLocalStyles } from './progressBar.styles'

type Props = {
  progress: {
    used: number
    guest?: number
    available: number
    installation: number
    textBadge: string[]
  }
}
const { colors } = theme

const BorderLinearProgressThreeStep = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: colors.neutrals[200],
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: colors.primary[500],
  },
}))
const BorderLinearProgressFourStep = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: colors.neutrals[200],
  [`& .${linearProgressClasses.dashedColorPrimary}`]: {
    borderRadius: 5,
    background: colors.neutrals[200],
  },
  [`& .${linearProgressClasses.bar1Buffer}`]: {
    borderRadius: 5,
    backgroundColor: colors.primary[500],
  },
  [`& .${linearProgressClasses.bar2Buffer}`]: {
    borderRadius: 5,
    backgroundColor: colors.technology[500],
  },
}))

export const ProgressBar = ({ progress }: Props) => (
  <>
    <section className="progress__section">
      <div className="progress__container">
        <div>
          <Typography variant="label" color={colors.neutrals[300]}>
            {progress.textBadge[0]}
          </Typography>
          <Badge
            className="progress__installs__badge"
            message="Primary500"
            value={String(progress.used)}
          />
        </div>
        {progress.guest !== undefined && (
          <div>
            <Typography variant="label" color={colors.neutrals[300]}>
              {progress.textBadge[3]}
            </Typography>
            <Badge
              className="progress__installs__badge"
              message="Technology500"
              value={String(progress.guest)}
            />
          </div>
        )}

        <div>
          <Typography variant="label" color={colors.neutrals[300]}>
            {progress.textBadge[1]}
          </Typography>
          <Badge
            className="progress__installs__badge"
            message="Neutro200"
            value={String(progress.available)}
          />
        </div>
        <div>
          <Typography variant="label" color={colors.neutrals[300]}>
            {progress.textBadge[2]}
          </Typography>
          <Badge
            className="progress__installs__badge"
            message="Neutro500"
            value={String(progress.installation)}
          />
        </div>
      </div>
      {progress.guest ? (
        <BorderLinearProgressFourStep
          variant="buffer"
          valueBuffer={Math.trunc(((progress.guest + progress.used) * 100) / progress.installation)}
          value={Math.trunc((progress.used * 100) / progress.installation)}
        />
      ) : (
        <BorderLinearProgressThreeStep
          variant="determinate"
          value={Math.trunc((progress.used * 100) / progress.installation)}
        />
      )}
    </section>
    <style jsx>{ProgressBarLocalStyles}</style>
    <style jsx global>
      {ProgressBarGlobalStyles}
    </style>
  </>
)
