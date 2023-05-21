import { useEffect, useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { PhotoshopPicker } from 'react-color'

import { FormNewEditAreaLocalStyles } from '../formNewEditArea.styles'

const colorDefault = '#D8DFE9'
type Color = {
  hex: string
}

type ColorService = {
  colorService?: string
  colorName: string
  onChangeColor?: (args: string) => void
}

const ColorPick = ({ colorService, colorName, onChangeColor = () => {} }: ColorService) => {
  const { colors } = theme

  const [openColor, setOpenColor] = useState(false)

  const [colorState, setColorState] = useState(colorDefault)

  const handleChangeComplete = (color: Color) => {
    setColorState(color.hex)
    onChangeColor(color.hex)
  }

  useEffect(() => {
    if (colorService === undefined) return
    setColorState(colorService)
  }, [colorService])

  return (
    <>
      <div>
        <Typography variant="label" className="edit__label--no-margin" color={colors.neutrals[400]}>
          {colorName}
        </Typography>

        <div className="colorPick__content">
          <div className="position-text">
            <div className="colorPick__selected" />
            <Typography variant="s2" color={colors.neutrals[400]}>
              {colorState}
            </Typography>
          </div>
          {openColor && (
            <PhotoshopPicker
              header="Elige un color"
              color={colorState}
              onAccept={() => setOpenColor(false)}
              onChangeComplete={(color) => {
                handleChangeComplete(color)
              }}
              onCancel={() => setOpenColor(false)}
              className="colorPick__popover"
            />
          )}
          <Button variant="outlined" size="small" onClick={() => setOpenColor(true)}>
            Cambiar
          </Button>
        </div>
      </div>
      <style jsx>
        {`
          .position-text :global(.colorPick__selected) {
            display: flex;
            height: 1.5rem;
            width: 1.5rem;
            border-radius: 20%;
            background-color: ${colorState};
          }
          :global(.colorPick__popover) {
            z-index: 1;
            position: absolute;
            left: 30rem;
            bottom: 13rem;
          }

          .with-margin-top {
            margin-top: 0.75rem;
          }
        `}
      </style>

      <style jsx>{FormNewEditAreaLocalStyles}</style>
    </>
  )
}

export default ColorPick
