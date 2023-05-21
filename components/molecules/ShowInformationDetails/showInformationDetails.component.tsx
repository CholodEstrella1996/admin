import React from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { ShowInformationDetailsStyles } from './showInformationDetails.styles'

export type DataSection = {
  idSection: number
  title: string
  data: string | number
}
type ShowInformationProps = {
  infoData: DataSection[]
}

const { colors } = theme

const ShowInformationDetailsComponent = ({ infoData }: ShowInformationProps) => (
  <>
    {!!infoData &&
      infoData.map((content) => (
        <div key={content.idSection}>
          <div className="section__content">
            <div className="title__content">
              <Typography variant="label" color={colors.neutrals[300]}>
                {content.title}
              </Typography>
            </div>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {content.data}
            </Typography>
          </div>
        </div>
      ))}
    <style jsx>{ShowInformationDetailsStyles}</style>
  </>
)
export default ShowInformationDetailsComponent
