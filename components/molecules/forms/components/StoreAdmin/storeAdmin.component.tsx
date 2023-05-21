import { ReactNode } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { AttachMoney } from '@mui/icons-material'

import { InputGeneralProps } from 'components/atoms/inputs/InputBase/inputBase.models'
import { InputFile } from 'components/atoms/inputs/InputFile'
import { InputText } from 'components/atoms/inputs/InputText'
import { InputToggle } from 'components/atoms/inputs/InputToggle'

const { colors } = theme

type Input = {
  name: string
  type: 'disponibility' | 'icon' | 'price' | 'associatedMedia' | 'color'
  rules?: InputGeneralProps['rules']
  element?: ReactNode
}

export type StoreAdminComponentProps = {
  inputs: Input[]

  fullWidth?: boolean
}

export const StoreAdminComponent = ({ inputs, fullWidth = true }: StoreAdminComponentProps) => {
  // Data
  const disponibility = inputs.find((input) => input.type === 'disponibility')
  const icon = inputs.find((input) => input.type === 'icon')
  const price = inputs.find((input) => input.type === 'price')
  const associatedMedia = inputs.find((input) => input.type === 'associatedMedia')
  const color = inputs.find((input) => input.type === 'color')

  // Exceptions
  const areDuplicatedByType = inputs.length !== new Set(inputs.map((input) => input.type)).size
  const areDuplicatedByName = inputs.length !== new Set(inputs.map((input) => input.name)).size

  if (areDuplicatedByType) throw new Error('Inputs must be unique by type')
  if (areDuplicatedByName) throw new Error('Inputs must be unique by name')

  if (color && color.rules) throw new Error('Color input can not have rules')

  // Render
  return (
    <section className="sidebar">
      <Typography variant="s1" color={colors.primary[500]}>
        Administración del Store
      </Typography>

      <div className="content">
        {disponibility &&
          (disponibility.element || (
            <InputToggle
              name={disponibility.name}
              label="Disponibilidad"
              title="Mostrar en el Store"
              rules={disponibility.rules}
            />
          ))}

        {icon &&
          (icon.element || (
            <InputFile name={icon.name} label="Ícono" accept="image/*" rules={icon.rules} />
          ))}

        {color && color.element}

        {price &&
          (price.element || (
            <InputText
              name={price.name}
              label="Precio"
              rules={price.rules}
              withLeftSpacing={false}
              type="number"
              icon={<AttachMoney sx={{ color: colors.neutrals[400], fontSize: '16px' }} />}
              iconPosition="left"
            />
          ))}

        {associatedMedia &&
          (associatedMedia.element || (
            <InputFile
              name={associatedMedia.name}
              label="Medios asociados"
              buttonText="Agregar medios"
              accept="image/*, .mp4"
              maxUploads={5}
              rules={associatedMedia.rules}
            />
          ))}
      </div>

      <style jsx>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: ${fullWidth ? '100%' : '40%'};
          padding-right: 1rem;
        }

        .content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
      `}</style>
    </section>
  )
}
