/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'

import { useSnackbar, VariantType } from 'notistack'

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar()

  const onNotify = useCallback((message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant })
  }, [])

  const onSuccess = useCallback((message: string) => {
    onNotify(message, 'success')
  }, [])

  const onError = useCallback((message: string) => {
    onNotify(message, 'error')
  }, [])

  const onWarning = useCallback((message: string) => {
    onNotify(message, 'warning')
  }, [])

  const onDefault = useCallback((message: string) => {
    onNotify(message, 'default')
  }, [])

  return {
    onNotify,
    onSuccess,
    onError,
    onWarning,
    onDefault,
  }
}
