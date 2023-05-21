import { useState } from 'react'

import { PersonDeleteOutline, SaveOutline } from '@easy-eva-icons/react'
import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import CloseIcon from '@mui/icons-material/Close'
import { CircularProgress, IconButton } from '@mui/material'

import AlertModal from 'components/atoms/AlertModal'
import HeaderTitle from 'components/atoms/HeaderTitle'
import MoreMenu from 'components/atoms/MoreMenu'

type NavigationProps = {
  email: string
  isEditable?: boolean
  onDelete: () => void
  onSubmit: () => Promise<void>
  isSaving?: boolean
  title: string
  setIsEditable: (edit: boolean) => void
}

const Header = ({
  title,
  onDelete,
  setIsEditable,
  email,
  isEditable,
  isSaving,
  onSubmit,
}: NavigationProps) => {
  const [openAlert, setOpenAlert] = useState(false)
  const { colors } = theme

  const onContinue = () => {
    void onDelete()
    setOpenAlert(false)
  }

  return (
    <>
      <HeaderTitle title={title}>
        {isEditable ? (
          <>
            <Button
              variant="outlined"
              size="medium"
              icon={isSaving ? <CircularProgress thickness={4} size={20} /> : <CloseIcon />}
              onClick={() => setIsEditable(false)}>
              Cancelar edición
            </Button>
            <Button
              disabled={isSaving}
              variant="contained"
              size="medium"
              icon={
                isSaving ? (
                  <CircularProgress thickness={4} size={20} />
                ) : (
                  <SaveOutline fontSize={24} />
                )
              }
              iconPosition="left"
              onClick={() => void onSubmit()}>
              Guardar cambios
            </Button>
          </>
        ) : (
          <Button variant="contained" size="medium" onClick={() => setIsEditable(true)}>
            Editar usuario
          </Button>
        )}
        <MoreMenu>
          <IconButton onClick={() => void setOpenAlert(true)} className="action__buttons">
            <PersonDeleteOutline fontSize={24} color={colors.semantic.danger} />
            <Typography variant="s1" color={colors.semantic.danger}>
              Eliminar usuario
            </Typography>
          </IconButton>
        </MoreMenu>
      </HeaderTitle>
      {openAlert && (
        <AlertModal
          open={openAlert}
          titleText="¿Quieres eliminar el usuario?"
          subtitleText={`Si eliminas el cliente: ${email}, no podrás recuperarlo.`}
          cancelActionText="No, cancelar"
          onCancel={() => setOpenAlert(false)}
          continueActionText="Sí, eliminar"
          onContinue={onContinue}
        />
      )}
    </>
  )
}
export default Header
