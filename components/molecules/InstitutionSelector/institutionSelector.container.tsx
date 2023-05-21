/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { institutionService } from 'services/modules/institution.module'
import { useNotification } from 'utils/hooks/notification'
import { useTreeConversions } from 'utils/hooks/useTreeConversions'

import { FormLoadProps } from '../forms/components/FormLoad'
import { useTreeSelector } from '../trees/TreeSelector/hooks/useTreeSelector'
import { TreeSelectorNode } from '../trees/TreeSelector/treeSelector.models'
import { InstitutionSelectorComponent } from './institutionSelector.component'
import { InstitutionSelectorForm } from './institutionSelector.models'

// Types
export type InstitutionSelectorContainerProps = {
  customerId: number
  organizationId: number
  onClose: () => unknown
}

// Component
export const InstitutionSelectorContainer = (props: InstitutionSelectorContainerProps) => {
  // Props
  const { onClose, customerId, organizationId } = props

  // Hooks
  const router = useRouter()
  const methods = useForm<InstitutionSelectorForm>()
  const { handleSubmit: handleSubmitFromLibrary, reset } = methods

  const { getNodeIdsByStatus } = useTreeSelector()
  const { convertResponseToTree } = useTreeConversions()

  const { onError, onWarning, onSuccess } = useNotification()

  // States
  const [loading, setLoading] = useState(true)

  // Methods

  const getInstitutions = async () => {
    setLoading(true)
    try {
      const { data: response } = await institutionService.getInstitutionTree(organizationId)

      const nodes = response.content ?? []
      const institutions = convertResponseToTree({ nodes })

      reset({ search: '', institutions })
    } catch {
      onError('Error al obtener las aplicaciones')
    }
    setLoading(false)
  }

  // Handlers
  const handleSubmit: SubmitHandler<InstitutionSelectorForm> = async (formData) => {
    const institutions = formData.institutions as TreeSelectorNode[]

    const hasAllUnchecked = institutions.every(({ status }) => status === 'unchecked')
    if (hasAllUnchecked) {
      onWarning('Tiene que seleccionar al menos una institución')
      return
    }

    setLoading(true)
    try {
      const selectedTreeNodes = getNodeIdsByStatus({
        nodes: institutions,
        type: 'onlyLeaves',
        status: 'checked',
      })

      const body = { id: selectedTreeNodes }

      await institutionService.putInstitutionTree(organizationId, body)
      onSuccess(`Se actualizaron las instituciones correctamente.`)
      void router.push(`/customer/${customerId}`)
    } catch {
      onError('Error al guardar las instituciones')
    }

    setLoading(false)
    onClose()
  }

  // Effects
  useEffect(() => {
    void getInstitutions()
  }, [])

  // Base props
  const formLoadProps: Omit<FormLoadProps, 'steps'> = {
    title: 'Seleccionar instituciones',
    finishButtonText: 'Confirmar',
    onClose,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading,
  }

  // Render
  return (
    <FormProvider {...methods}>
      <InstitutionSelectorComponent formLoadProps={formLoadProps} />
    </FormProvider>
  )
}
