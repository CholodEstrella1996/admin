// TODO: Continuar los cambios en la próxima tarea JIRA-[CLA-1591]
import React, { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { TextIcon } from '@folcode/clabs.atoms.text-icon'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Divider } from '@mui/material'

import { stringOSSystems } from 'constants/svgImages'
import { ApplicationTechnical } from 'services/models/applicationTechnical.model'

import { TechnicalDetailTitles } from '../detailApplication.model'
import TechnicalDetails from './technicalDetails/technicalDetails.container'

type Props = {
  idApplication: number
  technicalDetail?: ApplicationTechnical
  technicalDetailTitles: TechnicalDetailTitles
}
export const TechnicalApplicationComponent = ({
  idApplication,
  technicalDetail,
  technicalDetailTitles,
}: Props) => {
  const { colors } = theme
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="technicalApp__container">
      <div className="technicalApp__executable">
        <Typography variant="label" color={colors.neutrals[300]}>
          {technicalDetailTitles.executable}
        </Typography>
        {technicalDetail?.downloadables.map(({ id, downloadable }, index) => (
          <div key={id}>
            <TextIcon
              text={`${downloadable.name}.${downloadable.format.extension}`}
              id={`${id}`}
              colorAvatar={colors.primary[500]}
              icon={stringOSSystems[index].urlPath}
            />
          </div>
        ))}
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="technicalApp__information">
        <div className="technical__section">
          <Typography variant="label" color={colors.neutrals[300]}>
            {technicalDetailTitles.codeRoom}
          </Typography>
          <Typography variant="s2" color={colors.neutrals[400]}>
            {technicalDetail?.classroomCode ?? '-'}
          </Typography>
        </div>
        <div className="technical__section">
          <Typography variant="label" color={colors.neutrals[300]}>
            {technicalDetailTitles.appStore ?? '-'}
          </Typography>
          <Typography variant="s2" color={colors.neutrals[400]}>
            {technicalDetail?.appleUrl ?? '-'}
          </Typography>
        </div>
        <div className="app__version">
          <div className="technical__section">
            <Typography variant="label" color={colors.neutrals[300]}>
              {technicalDetailTitles.version ?? '-'}
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {technicalDetail?.versionNumber.toFixed(1) ?? '-'}
            </Typography>
          </div>
          <div className="technical__section">
            <Typography variant="label" color={colors.neutrals[300]}>
              {technicalDetailTitles.securityVersion}
            </Typography>
            <Typography variant="s2" color={colors.neutrals[400]}>
              {technicalDetail?.securityVersionNumber.toFixed(1) ?? '-'}
            </Typography>
          </div>
        </div>
        <div className="technical__section">
          <Typography variant="label" color={colors.neutrals[300]}>
            {technicalDetailTitles.packageName}
          </Typography>
          <Typography variant="s2" color={colors.neutrals[400]}>
            {technicalDetail?.androidPackageName ?? '-'}
          </Typography>
        </div>
        <div className="technical__section technical__button">
          <Button variant="outlined" onClick={() => setShowModal(true)}>
            Cargar datos
          </Button>
        </div>
      </div>

      {showModal && (
        <TechnicalDetails applicationId={idApplication} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}
