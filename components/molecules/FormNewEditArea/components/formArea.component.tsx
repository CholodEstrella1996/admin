import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Divider } from '@mui/material'

import { LanguageTabs } from 'components/molecules/forms/components/LanguageTabs'
import { StoreAdmin } from 'components/molecules/forms/components/StoreAdmin'
import { StoreData } from 'utils/models/reactFormFieldsTabs'

import { FormNewEditAreaLocalStyles } from '../formNewEditArea.styles'
import ColorPick from './colorPick.component'

const { colors } = theme

type FormAreaProps = {
  storeData: StoreData

  onChangeColorBase?: (args: string) => void
  onChangeColorDark?: (args: string) => void
  onChangeColorLight?: (args: string) => void
}

const FormArea = ({
  storeData,
  onChangeColorBase,
  onChangeColorDark,
  onChangeColorLight,
}: FormAreaProps) => (
  <div className="formNewEditArea__container">
    <div className="formNewEditArea__tabArea">
      <Typography color={colors.primary[500]} variant="s1">
        Información del Área
      </Typography>

      <LanguageTabs
        inputs={[
          {
            label: 'Nombre del área',
            name: (code) => `areaName${code}`,
            type: 'title',
            rules: { required: true },
          },
          {
            label: 'Descripción del área',
            name: (code) => `areaDescription${code}`,
            type: 'description',
            rules: { required: true },
          },
          {
            label: 'Palabras clave',
            name: (code) => `areaKeyword${code}`,
            type: 'keywords',
          },
        ]}
      />
    </div>

    <Divider orientation="vertical" flexItem />

    <div className="formNewEditArea__store">
      <StoreAdmin
        inputs={[
          {
            type: 'disponibility',
            name: 'areaDisponibility',
          },
          {
            type: 'icon',
            name: 'file',
            rules: { required: true },
          },
          {
            type: 'color',
            name: 'color',
            element: (
              <div>
                <ColorPick
                  colorService={storeData.color ?? undefined}
                  colorName="Color Base"
                  onChangeColor={onChangeColorBase}
                />
                <ColorPick
                  colorService={storeData.colorDark ?? undefined}
                  colorName="Color Dark"
                  onChangeColor={onChangeColorDark}
                />
                <ColorPick
                  colorService={storeData.colorLight ?? undefined}
                  colorName="Color Light"
                  onChangeColor={onChangeColorLight}
                />
              </div>
            ),
          },
          {
            type: 'price',
            name: 'areaPrice',
            rules: { required: true },
          },
        ]}
      />
    </div>

    <style jsx>{FormNewEditAreaLocalStyles}</style>
  </div>
)

export default FormArea
