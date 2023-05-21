import React from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { InformationDescriptionProps } from './informationDescription.model'
import { InformationDescriptionStyles } from './informationDescription.styles'

const InformationDescriptionComponent = ({ content1, content2 }: InformationDescriptionProps) => {
  const { colors } = theme

  return (
    <>
      <div className="information__container">
        {!!content1 &&
          content1.map((content) => (
            <div key={content.id} className="description__container">
              <div className="description__content">
                <Typography variant="label" color={colors.neutrals[300]} className="uppercase">
                  {content.name}
                </Typography>
                <Typography variant="s2" color={colors.neutrals[400]} className="capitalize">
                  {content.description}
                </Typography>
              </div>
            </div>
          ))}
        {!!content2 &&
          content2.map((content) => (
            <div key={content.id} className="description__container">
              <div className="description__content">
                <Typography variant="label" color={colors.neutrals[300]} className="uppercase">
                  {content.name}
                </Typography>
                <Typography variant="s2" color={colors.neutrals[400]} className="capitalize">
                  {content.description}
                </Typography>
              </div>
            </div>
          ))}
      </div>
      <style jsx>{InformationDescriptionStyles}</style>
      <style jsx>
        {`
          :global(.uppercase) {
            text-transform: uppercase;
            padding-bottom: 0.5rem;
          }
        `}
      </style>
    </>
  )
}
export default InformationDescriptionComponent
