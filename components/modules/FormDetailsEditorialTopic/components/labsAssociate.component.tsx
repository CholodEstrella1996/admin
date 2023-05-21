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
import { ApiResponseTopicLabs } from 'services/models/book.model'
import { bookService } from 'services/modules/book.module'
import { useNotification } from 'utils/hooks/notification'
import useLabs from 'utils/hooks/useLabs'

type Props = {
  labsAssociate?: ApiResponseTopicLabs
  subtitle: string
  buttonText: string
  subtitleColor: string
  iconColor: string
  parentId: string
}

export const LabsAssociateComponent = (props: Props) => {
  // Props
  const { labsAssociate, subtitle, buttonText, subtitleColor, iconColor, parentId } = props

  // Hooks
  const router = useRouter()
  const { onSuccess, onError, onWarning } = useNotification()
  const { getLabs, updateLabs, selectLabsProps } = useLabs(parentId)

  // States
  const [showModal, setShowModal] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(Number)
  const [loading, setLoading] = useState(false)

  // Handlers
  const handleDelete = async (productUnitId: number) => {
    try {
      await bookService.deleteLabsTopic(Number(parentId), productUnitId)
      onSuccess('Se desvinculó laboratorio correctamente')
      setOpenDialog(false)
      void router.push(`/${router.pathname.split('/')[1]}/${Number(parentId)}`)
    } catch {
      onError('Hubo un error al desvincular laboratorio')
      setOpenDialog(false)
    }
  }

  const handleSubmit = async (value: number[]): Promise<void> => {
    if (value.length === 0) {
      onWarning('Por favor, seleccione al menos un laboratorio para poder asociarlo')
      return
    }
    setLoading(true)
    if (value.length > 0) await updateLabs(value)
    void router.push(`/${router.pathname.split('/')[1]}/${Number(parentId)}`)
    setLoading(false)
    setShowModal(false)
  }

  // Effects
  useEffect(() => {
    if (!showModal) return
    void getLabs()
  }, [showModal])

  // Render
  return (
    <>
      <div className="labsAssociate__container">
        <Typography variant="p2" color={subtitleColor}>
          {subtitle}
        </Typography>

        {!!labsAssociate?.content?.length &&
          labsAssociate.content.map(({ id, name, iconUrl, productUnitId }) => (
            <div key={id} className="labsAssociate__item">
              <TextIcon text={name} id={`${id}`} icon={iconUrl} />
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
            {...selectLabsProps}
          />
        )}
      </div>
      <AlertModal
        titleText="¿Seguro que desea desvincular el laboratorio?"
        cancelActionText="Cancelar"
        onCancel={() => setOpenDialog(false)}
        continueActionText="Desvincular"
        onContinue={() => void handleDelete(idDelete)}
        open={openDialog}
      />
    </>
  )
}
