import { FormEvent, useEffect, useState } from 'react'

import { ThemeProvider } from '@folcode/clabs.others.theme-provider'
import { Modal } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import LoadingModal from 'components/molecules/modals/LoadingModal/loadingModal.component'
import { useTreeMenuContext } from 'utils/contexts/treeMenu.context'
import { waitFor } from 'utils/helpers/waitFor'
import { useNotification } from 'utils/hooks/notification'
import useTreeMenu from 'utils/hooks/useTreeMenu'

import { FormLoadComponent } from './formLoad.component'

export type FormLoadStep = {
  id: number
  element: JSX.Element
  withBackground?: boolean
}

export type FormLoadContainerProps = {
  title: string
  finishButtonText: string

  loading: boolean

  onClose: () => void
  onStepChange?: (currentStep: number) => Promise<'stop' | 'continue'>
  onSubmit: (event: FormEvent) => unknown

  initialStep?: number
  steps: FormLoadStep[]
}

export const FormLoadContainer = (props: FormLoadContainerProps) => {
  // Props
  const {
    title,
    finishButtonText,

    loading: loadingModal = true,

    onClose = () => {},
    onStepChange = () => 'continue',
    onSubmit = () => {},

    initialStep = 0,
    steps,
  } = props

  // Hooks
  const { refreshTreeData } = useTreeMenu()
  const { treeMenuData } = useTreeMenuContext()

  const methods = useFormContext()
  const { onWarning } = useNotification()

  // States
  const [currentStep, setCurrentStep] = useState(0)
  // TODO: Discomment these lines when the Button Component has been fixed and migrated
  // const [loadingButton, setLoadingButton] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  // Methods
  const getStepContent = (selectedIndex: number) => {
    const selectedStep = steps[selectedIndex] ? steps[currentStep] : steps[0]

    return selectedStep.element
  }

  // Handlers
  const handleBackStep = async () => {
    // TODO: Discomment these lines when the Button Component has been fixed and migrated
    // setLoadingButton(true)

    const canContinueToNextStep = await onStepChange(currentStep - 1)
    if (canContinueToNextStep !== 'stop') setCurrentStep((prevStep) => prevStep - 1)

    // TODO: Discomment these lines when the Button Component has been fixed and migrated
    // setLoadingButton(false)
  }

  const handleNextStep = async () => {
    // TODO: Discomment these lines when the Button Component has been fixed and migrated
    // setLoadingButton(true)

    const isValidForm = await methods.trigger()
    if (!isValidForm) {
      onWarning('Por favor, completar todos los campos')
      // TODO: Discomment these lines when the Button Component has been fixed and migrated
      // setLoadingButton(false)
      return
    }

    const canContinueToNextStep = await onStepChange(currentStep + 1)
    if (canContinueToNextStep !== 'stop') setCurrentStep((prevStep) => prevStep + 1)

    // TODO: Discomment these lines when the Button Component has been fixed and migrated
    // setLoadingButton(false)
  }

  const handleClose = () => setShowDialog(true)

  const handleSubmit = async (event: FormEvent) => {
    if (!methods) return // this line avoids error when click "editar" in "Detalle del material"
    const isValidForm = await methods.trigger()
    if (!isValidForm) {
      onWarning('Por favor, completar todos los campos')
      return
    }

    // TODO: Discomment these lines when the Button Component has been fixed and migrated
    // setLoadingButton(true)
    const prevTreeMenuData = JSON.stringify(treeMenuData)
    onSubmit(event)
    // TODO: Discomment these lines when the Button Component has been fixed and migrated
    // setLoadingButton(false)

    await waitFor(1000)
    void refreshTreeData(prevTreeMenuData)
  }

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
        <Modal open onClose={() => setShowDialog(true)} style={cssVariables}>
          <div className="container">
            <ThemeProvider>
              <FormLoadComponent
                title={title}
                finishButtonText={finishButtonText}
                currentStep={currentStep}
                totalSteps={steps.length}
                // TODO: Discomment these lines when the Button Component has been fixed and migrated
                // loadingButton={loadingButton}
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
                onClose={handleClose}
                onSubmit={handleSubmit}>
                {currentStep + 1 && getStepContent(currentStep)}
              </FormLoadComponent>
            </ThemeProvider>
          </div>
        </Modal>
      ) : (
        <LoadingModal />
      )}

      {showDialog && (
        <AlertModal
          titleText="¿Quieres cancelar la operación?"
          subtitleText="Si cancelas la operación los cambios se perderán."
          cancelActionText="No, volver"
          continueActionText="Sí, cancelar"
          onCancel={() => setShowDialog(false)}
          onContinue={onClose}
          open
        />
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
