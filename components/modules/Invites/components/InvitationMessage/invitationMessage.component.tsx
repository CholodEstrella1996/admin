import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import Select from 'components/atoms/inputs/InputSelectMulti'
import { InputText } from 'components/atoms/inputs/InputText'
import { ClassroomResponse } from 'services/models/classroom/response.model'
import { Language } from 'utils/models/classroom.models'
import { Customer } from 'utils/models/subscriptions.models'

import { InvitesStyles } from '../../invite.styles'

export type OptionProps = {
  id: number
  name: string
  languageCode?: string
  disabled?: boolean
  selected?: boolean
}

export type MessageProps = {
  listLanguage: Language[]
  listGroup?: ClassroomResponse['getGroups']
  customer: Customer
}

const { colors } = theme

const InvitationMessage = ({ listLanguage, listGroup, customer }: MessageProps) => {
  const optionsLanguages = listLanguage.map(({ id, name, languageCode }) => ({
    id,
    value: languageCode || '',
    label: name || '',
  }))
  const optionsGroups = listGroup?.content.map(({ id, name }) => ({
    id,
    value: id,
    label: name,
  }))

  return (
    <>
      <div className="invite__card">
        <div className="message__card__title">
          <Typography variant="s1" color={colors.neutrals[500]}>
            Mensaje de invitación
          </Typography>
        </div>
        <div className="invite__card__body">
          <Typography variant="p1" color={colors.neutrals[400]}>
            Selecciona el idioma en el que los usuarios van a recibir la invitación
          </Typography>
          <Select
            name="languageCode"
            label=""
            placeholder="Selecciona idioma"
            className="input__filter"
            options={optionsLanguages}
            size="medium"
          />

          {customer.kind.name === 'institution' && (
            <>
              <Typography variant="p1" color={colors.neutrals[400]}>
                Selecciona el grupo al que deseas agregar al estudiante (opcional)
              </Typography>
              <Select
                name="classroomIds"
                label=""
                placeholder="Selecciona un grupo"
                className="input__filter"
                multiple
                options={optionsGroups ?? []}
                size="medium"
              />
            </>
          )}

          <div className="highlight">
            <Typography variant="p2" weight="semibold" color={colors.neutrals[400]}>
              Puedes personalizar aún más la invitación, pero este paso es opcional.
            </Typography>
            <InputText
              name="message"
              multiline
              rows={9}
              label="Personalización (Opcional)"
              rules={{ maxLength: 600 }}
            />
          </div>
        </div>
      </div>
      <style jsx>{InvitesStyles}</style>
    </>
  )
}
export default InvitationMessage
