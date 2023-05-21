/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import { TextIcon } from '@folcode/clabs.atoms.text-icon'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Divider } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'

import { InputToggle } from 'components/atoms/inputs/InputToggle'

import { Media } from '../TabLanguage/tabsLanguage.model'
import StoreAdminStyle from './storeAdmin.style'

const { colors } = theme

type Props = {
  data: {
    visible?: boolean
    price?: number
    media?: Media[]
    color?: string
    colorDark?: string
    colorLight?: string
    iconUrl?: string
  }
  sectionDiponibility?: boolean
  sectionIcon?: boolean
  sectionColor?: boolean
  sectionPrice?: boolean
}

const divider = () => <Divider orientation="vertical" flexItem />

const StoreAdmin = ({
  sectionDiponibility,
  sectionIcon,
  sectionColor,
  sectionPrice,
  data,
}: Props) => {
  const { visible, price, media, color, colorDark, colorLight, iconUrl } = data

  const methods = useForm<{ disponibility: boolean }>()
  const parts = iconUrl ? iconUrl.split('/') : ''
  const iconName = parts[parts.length - 1]

  useEffect(() => {
    methods.reset({ disponibility: visible })
  }, [visible])

  return (
    <>
      <div className="store__container">
        <div className="sections__container">
          {sectionDiponibility && (
            <>
              <div className="store-box__Content">
                <FormProvider {...methods}>
                  <InputToggle
                    name="disponibility"
                    label="Disponibilidad"
                    title="Mostrar en el Store"
                    rules={{ disabled: true }}
                  />
                </FormProvider>
              </div>
              {sectionDiponibility && (sectionIcon || sectionColor || sectionPrice)
                ? divider()
                : null}
            </>
          )}
          {sectionIcon && iconUrl && (
            <>
              <div className="store-box__Content">
                <Typography color={colors.neutrals[300]} variant="label">
                  Ícono
                </Typography>
                <TextIcon id="Math" text={iconName} icon={iconUrl} />
              </div>
              {sectionIcon && !sectionColor && sectionPrice ? divider() : null}
            </>
          )}
          {sectionColor && color && (
            <>
              {sectionColor && sectionIcon ? divider() : null}
              <div className="store-box__Content">
                <Typography color={colors.neutrals[300]} variant="label">
                  Color
                </Typography>
                <div className="store-color">
                  <div className="store-boxBase" />
                  <div className="store-text"> {color}</div>
                </div>
                <Typography color={colors.neutrals[300]} variant="label">
                  Color Dark
                </Typography>
                <div className="store-color">
                  <div className="store-boxDark" />
                  <div className="store-text"> {colorDark}</div>
                </div>
                <Typography color={colors.neutrals[300]} variant="label">
                  Color Light
                </Typography>
                <div className="store-color">
                  <div className="store-boxLight" />
                  <div className="store-text"> {colorLight}</div>
                </div>
              </div>
            </>
          )}
          {sectionPrice && price && (
            <>
              {sectionPrice && sectionColor ? divider() : null}
              <div className="store-box__Content">
                <Typography color={colors.neutrals[300]} variant="label">
                  Precio (USD)
                </Typography>
                <Typography color={colors.neutrals[400]} variant="s2">
                  ${price.toFixed(2)}
                </Typography>
              </div>
            </>
          )}
        </div>

        {!!media?.length && (
          <>
            <Divider orientation="horizontal" flexItem />

            <Typography color={colors.neutrals[300]} variant="label">
              Medios Asociados
            </Typography>

            {media.map(({ id, content }) => (
              <div className="associated__media" key={id}>
                <Typography color={colors.neutrals[400]} variant="s2">
                  {content.name}
                </Typography>
              </div>
            ))}
          </>
        )}
      </div>

      <style jsx>{`
        ${StoreAdminStyle(color, colorDark, colorLight)}
      `}</style>
    </>
  )
}

export default StoreAdmin
