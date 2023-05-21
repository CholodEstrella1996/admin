import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { Content } from 'utils/models/modelsBase'

import { Modal } from '../modals/Modal'
import TabLanguage from '../TabLanguage/tabLanguage.component'
import { DetailsMaterialStyle } from './detailsMaterial.styles'

type Props = {
  onClose: () => void
  dataTabs: Content[]
  detailMaterial: Content
}

const DetailsMaterialComponent = ({ onClose, dataTabs, detailMaterial }: Props) => {
  const { colors } = theme
  const formEditMaterial = (
    <>
      <div className="detailsMaterial__container">
        <div className="tab__container">
          <Typography variant="s1" color={colors.primary[500]}>
            Informacion del material
          </Typography>
          <TabLanguage
            variant="title-description-file"
            apiData={dataTabs}
            titles={{
              name: 'Nombre del material',
              description: 'Descripción del material',
              attachChipFile: 'ARCHIVO ASOCIADO',
            }}
          />
        </div>

        <div className="divider" />
        <div className="material__container">
          <Typography variant="s1" color={colors.primary[500]} className="detail__title">
            Detalles del material
          </Typography>
          <div className="materials">
            <Typography variant="label" color={colors.neutrals[300]} className="materials__title">
              Tipo de Material
            </Typography>
            <Typography variant="p2" color={colors.neutrals[300]}>
              {detailMaterial.type?.name}
            </Typography>
          </div>
          <div className="materials">
            <Typography variant="label" color={colors.neutrals[300]} className="materials__title">
              Destinarios del material
            </Typography>
            <Typography variant="p2" color={colors.neutrals[300]}>
              {detailMaterial.authorities &&
                detailMaterial.authorities
                  .map((autorithiesName) => autorithiesName.name)
                  .join(' y ')}
            </Typography>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          :global(.materials__title) {
            padding-bottom: 0.5rem;
          }
        `}
      </style>
      <style jsx>{DetailsMaterialStyle}</style>
    </>
  )
  const step = [
    {
      id: 1,
      element: formEditMaterial,
    },
  ]

  return <Modal title="Detalle del material" onClose={onClose} steps={step} loading={false} />
}

export default DetailsMaterialComponent
