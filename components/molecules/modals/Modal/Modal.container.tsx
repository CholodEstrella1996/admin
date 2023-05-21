import { useEffect, useState } from 'react'

import { ThemeProvider } from '@folcode/clabs.others.theme-provider'
import { Modal } from '@mui/material'

import LoadingModal from 'components/molecules/modals/LoadingModal/loadingModal.component'

import { ModalComponent } from './Modal.component'

export type ModalStep = {
  id: number
  element: JSX.Element
  withBackground?: boolean
}

export type ModalContainerProps = {
  title: string

  loading: boolean

  onClose: () => void

  initialStep?: number
  steps: ModalStep[]
}

export const ModalContainer = (props: ModalContainerProps) => {
  // Props
  const {
    title,

    loading: loadingModal = true,

    onClose = () => {},

    initialStep = 0,
    steps,
  } = props

  // States
  const [currentStep, setCurrentStep] = useState(0)
  // TODO: Discomment these lines when the Button Component has been fixed and migrated
  // const [loadingButton, setLoadingButton] = useState(false)

  // Methods
  const getStepContent = (selectedIndex: number) => {
    const selectedStep = steps[selectedIndex] ? steps[currentStep] : steps[0]

    return selectedStep.element
  }

  const handleClose = () => onClose()

  // Effects
  useEffect(() => {
    setCurrentStep(initialStep)
  }, [initialStep])

  // Styles
  const cssVariables =
    steps[currentStep].withBackground === false
      ? { '--content-color': 'transparent', '--content-padding': 0 }
      : undefined

  // Render
  return (
    <>
      {!loadingModal ? (
        <Modal open onClose={onClose} style={cssVariables}>
          <div className="container">
            <ThemeProvider>
              <ModalComponent title={title} onClose={handleClose}>
                {currentStep + 1 && getStepContent(currentStep)}
              </ModalComponent>
            </ThemeProvider>
          </div>
        </Modal>
      ) : (
        <LoadingModal />
      )}

      <style jsx>{`
        .container {
          display: grid;
          place-content: center;
          height: 100vh;
        }
      `}</style>
    </>
  )
}
