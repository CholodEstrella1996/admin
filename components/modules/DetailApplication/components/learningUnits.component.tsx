import { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { TextIcon } from '@folcode/clabs.atoms.text-icon'
import { Typography } from '@folcode/clabs.atoms.typography'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useRouter } from 'next/router'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import LearningUnitForm from 'components/molecules/LearningUnirForm'
import { ApplicationLearning } from 'services/models/applicationID.model'
import { learningUnitsService } from 'services/modules/learningUnits.module'
import { useNotification } from 'utils/hooks/notification'

type Props = {
  learningUnits?: ApplicationLearning
  subtitle: string
  buttonText: string
  subtitleColor: string
  iconColor: string
}
export const LearningUnitsComponent = ({
  learningUnits,
  subtitle,
  buttonText,
  subtitleColor,
  iconColor,
}: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(Number)

  const router = useRouter()
  const { onSuccess, onError } = useNotification()

  const handleOnDelete = async (productUnitId: number) => {
    const { idApplication } = router.query
    try {
      await learningUnitsService.deleteApplications(Number(idApplication), productUnitId)
      setOpenDialog(false)
      onSuccess('Se desvinculó laboratorio correctamente')
      void router.push(`/application/${Number(idApplication)}`)
    } catch {
      onError('Hubo un error al desvincular laboratorio')
      setOpenDialog(false)
    }
  }
  return (
    <>
      <div className="learning__units">
        <Typography variant="p2" color={subtitleColor}>
          {subtitle}
        </Typography>
        {!!learningUnits?.applications?.length &&
          learningUnits.applications.map(({ id, name, iconUrl, productUnitId }) => (
            <div key={id} className="learning__item">
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

        <Button variant="outlined" onClick={() => setIsEdit((prev) => !prev)}>
          {buttonText}
        </Button>

        {isEdit && <LearningUnitForm onClose={() => setIsEdit(false)} />}
      </div>
      <AlertModal
        titleText="¿Seguro que desea desvincular el laboratorio?"
        cancelActionText="Cancelar"
        onCancel={() => setOpenDialog(false)}
        continueActionText="Desvincular"
        onContinue={() => void handleOnDelete(idDelete)}
        open={openDialog}
      />
    </>
  )
}
