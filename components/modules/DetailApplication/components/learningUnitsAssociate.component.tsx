/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { TextIcon } from '@folcode/clabs.atoms.text-icon'
import { Typography } from '@folcode/clabs.atoms.typography'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useRouter } from 'next/router'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import LoadingModal from 'components/molecules/modals/LoadingModal/loadingModal.component'
import { SelectItemModal } from 'components/molecules/modals/SelectItemModal'
import { ApiResponseTopicLearningUnits } from 'services/models/book.model'
import { learningUnitsService } from 'services/modules/learningUnits.module'
import { useNotification } from 'utils/hooks/notification'
import useLearningUnits from 'utils/hooks/useLearningUnits'

type Props = {
  learningUnitsAssociate?: ApiResponseTopicLearningUnits
  subtitle: string
  buttonText: string
  subtitleColor: string
  iconColor: string
  parentId: string
}

export const LearningUnitsAssociateComponent = (props: Props) => {
  // Props
  const { learningUnitsAssociate, subtitle, buttonText, subtitleColor, iconColor, parentId } = props

  // Hooks
  const router = useRouter()
  const { onSuccess, onError, onWarning } = useNotification()
  const { getLearningUnits, updateLearningUnits, selectLearningUnitsProps } =
    useLearningUnits(parentId)

  // States
  const [showModal, setShowModal] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(Number)
  const [loading, setLoading] = useState(false)

  // Handlers
  const handleDelete = async (productUnitId: number) => {
    try {
      await learningUnitsService.deleteApplications(Number(parentId), productUnitId)
      onSuccess('Se desvinculó la unidad de aprendizaje correctamente')
      setOpenDialog(false)
      void router.push(`/application/${Number(parentId)}`)
    } catch {
      onError('Hubo un error al desvincular la unidad de aprendizaje')
      setOpenDialog(false)
    }
  }

  const handleSubmit = async (value: number[]): Promise<void> => {
    if (value.length === 0) {
      onWarning('Por favor, seleccione al menos una unidad de aprendizaje para poder asociar')
      return
    }
    setLoading(true)
    if (value.length > 0) await updateLearningUnits(value)
    void router.push(`/application/${Number(parentId)}`)
    setLoading(false)
    setShowModal(false)
  }

  // Effects
  useEffect(() => {
    if (!showModal) return
    void getLearningUnits()
  }, [showModal])

  // Render
  return (
    <>
      <div className="learning__units">
        <Typography variant="p2" color={subtitleColor}>
          {subtitle}
        </Typography>

        {!!learningUnitsAssociate?.applications?.length &&
          learningUnitsAssociate.applications.map(({ id, name, iconUrl, productUnitId }) => (
            <div key={id} className="learning__item">
              <TextIcon text={name} id={`${id}`} icon={iconUrl || ''} />
              <CloseOutlinedIcon
                sx={{ color: iconColor }}
                onClick={() => {
                  setOpenDialog(true)
                  setIdDelete(productUnitId)
                }}
              />
            </div>
          ))}

        <Button variant="outlined" onClick={() => setShowModal(true)}>
          {buttonText}
        </Button>

        {loading && <LoadingModal />}

        {showModal && (
          <SelectItemModal
            onSubmit={handleSubmit}
            onClose={() => setShowModal(false)}
            {...selectLearningUnitsProps}
          />
        )}
      </div>
      <AlertModal
        titleText="¿Seguro que desea desvincular la unidad de aprendizaje?"
        cancelActionText="Cancelar"
        onCancel={() => setOpenDialog(false)}
        continueActionText="Desvincular"
        onContinue={() => void handleDelete(idDelete)}
        open={openDialog}
      />
    </>
  )
}
