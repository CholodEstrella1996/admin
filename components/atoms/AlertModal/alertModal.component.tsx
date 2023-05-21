import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Fade, Modal, Box } from '@mui/material'

import { AlertStyle } from './alertModal.style'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  minWidth: 320,
  bgcolor: theme.colors.neutrals.white,
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
}

export type AlertProprs = {
  titleText?: string
  subtitleText?: string
  descriptionText?: string

  cancelActionText?: string
  onCancel?: () => void
  continueActionText?: string
  onContinue?: () => void

  open: boolean
  backGroundOpacity?: boolean
}

export const AlertModal = (props: AlertProprs) => {
  const {
    titleText,
    subtitleText,
    descriptionText,
    cancelActionText,
    onCancel,
    continueActionText,
    onContinue,
    open = false,
    backGroundOpacity = false,
  } = props

  return (
    <>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        closeAfterTransition
        style={backGroundOpacity ? { opacity: '0.5' } : { opacity: '1' }}>
        <Fade in={open}>
          <Box sx={style}>
            {titleText && (
              <Typography color={theme.colors.neutrals[500]} variant="s1">
                {titleText}
              </Typography>
            )}
            {subtitleText && (
              <Typography
                color={theme.colors.neutrals[400]}
                variant="s2"
                className="alert-sub-title">
                {subtitleText}
              </Typography>
            )}
            {descriptionText && (
              <Typography color={theme.colors.neutrals[400]} variant="s2">
                {descriptionText}
              </Typography>
            )}
            <div className="alert-container-btn">
              {cancelActionText && (
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="white"
                  className="alert-btn-cancel"
                  size="small">
                  {cancelActionText}
                </Button>
              )}
              {continueActionText && (
                <Button
                  type="button"
                  onClick={onContinue}
                  variant="white"
                  className="alert-btn-delete"
                  size="small">
                  {continueActionText}
                </Button>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
      <style jsx global>
        {AlertStyle}
      </style>
    </>
  )
}
