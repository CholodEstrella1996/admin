import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'

import Select from 'components/atoms/inputs/InputSelectMulti'
import { InputText } from 'components/atoms/inputs/InputText'

import { FormNewAnnouncementLocalStyles } from '../formNewAnnouncement.styles'

const { colors } = theme

const FormAnnouncement = () => (
  <>
    <div className="formAnnouncement__container">
      <div className="formAnnouncement__content">
        <Typography color={colors.primary[500]} variant="s1">
          Información del anuncio
        </Typography>

        <InputText
          type="text"
          name="bookYearPublication"
          label="ASUNTO DEL ANUNCIO"
          rules={{ required: true }}
        />

        <Select
          name="classroomIds"
          label="Destinatario"
          placeholder="Selecciona destinatarios"
          className="input__filter"
          multiple
          required
          // options={optionsGroups ?? []}
          options={[]}
          size="medium"
        />

        <InputText
          type="text"
          name="messageAnnuncement"
          label="mensaje del anuncio"
          rules={{ required: true, maxLength: 1000 }}
          rows={6}
          // cols={50}
          multiline
        />

        <div className="formAnnouncement__label">
          <ErrorOutlineOutlinedIcon htmlColor={colors.primary[500]} />
          <Typography weight="semibold" color={colors.neutrals[400]} variant="p2">
            Al darle click a “Enviar” no se podrá modificar o cancelar el mensaje.
          </Typography>
        </div>
      </div>
    </div>

    <style jsx>{FormNewAnnouncementLocalStyles}</style>
  </>
)

export default FormAnnouncement
