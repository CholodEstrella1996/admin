/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useId, useState } from 'react'

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { FormProvider, useForm } from 'react-hook-form'

import { useNotification } from 'utils/hooks/notification'

import { InputText } from '../inputs/InputText'

type InputCopyProps = {
  label: string
  value: string
}

export const InputCopyComponent = ({ value, label }: InputCopyProps) => {
  const methods = useForm<Record<string, string>>()
  const [dataCopy, setDataCopy] = useState('')
  const inputID = useId()
  const { onSuccess, onError } = useNotification()
  const watchedValue = methods.watch(inputID)

  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(watchedValue)
      setDataCopy(watchedValue)
      onSuccess(`Se copio correctamente ${label}`)
      setTimeout(() => {
        setDataCopy('')
      }, 3000)
    } catch {
      onError('Error al copiar')
    }
  }

  useEffect(() => {
    methods.setValue(inputID, value)
  }, [value])

  return (
    <FormProvider {...methods}>
      <InputText
        name={inputID}
        label={label}
        readOnly
        icon={
          dataCopy !== '' ? (
            <CheckOutlinedIcon />
          ) : (
            <ContentCopyIcon onClick={() => void copyToClipBoard()} />
          )
        }
        iconPosition="right"
      />
    </FormProvider>
  )
}
