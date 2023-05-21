/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'

import router from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { useTreeSelector } from 'components/molecules/trees/TreeSelector/hooks/useTreeSelector'
import { TreeSelectorNode } from 'components/molecules/trees/TreeSelector/treeSelector.models'
import { packageService } from 'services/modules/packages.module'
import { useNotification } from 'utils/hooks/notification'

import { FormLoadProps } from '../../components/FormLoad'
import { PackageProvider, usePackageContext } from './contexts/package.context'
import { PackageComponent } from './packages.component'
import { usePackage as usePackageForm } from './packages.hook'
import { Medias, PackageFormModel } from './packages.models'

export type PackagesContainerProps = {
  isNewForm: boolean
  onClose: () => void
  idPackage?: number
  initialStep?: number
}

const Component = (props: PackagesContainerProps) => {
  // Props
  const { isNewForm, onClose, initialStep = 0, idPackage } = props

  // Hooks

  const methods = useForm<PackageFormModel>()
  const { setPackageDraft } = usePackageContext()
  const { handleSubmit: handleSubmitFromLibrary, reset, getValues } = methods
  const { getNodeIdsByStatus } = useTreeSelector()

  const {
    getApplicationTree,
    uploadAssociatedMedia,
    getStoreAdministrationData,
    formatBody,
    uploadNewAssociatedMedia,
    deleteAssociatedMedia,
  } = usePackageForm()

  const { onSuccess, onError, onWarning } = useNotification()

  // States

  const [loading, setLoading] = useState(true)
  const [packageFormTitle, setPackageFormTitle] = useState('Seleccionar aplicaciones')
  const [associatedMedias, setAssociatedMedia] = useState<Medias[]>()

  const getApplications = async (packageId?: number) => {
    try {
      const applications = await getApplicationTree(packageId)

      reset((prevValues) => ({ ...prevValues, step1: { search: '', applications } }))
      setLoading(false)
    } catch {
      onError('Error al obtener las aplicaciones')
      setLoading(false)
    }
  }

  const getPackageData = async (packageId: number) => {
    try {
      const { disponibility, icon, associatedMedia, tabs, medias } =
        await getStoreAdministrationData(packageId)
      setAssociatedMedia(medias)

      const applications = await getApplicationTree(packageId)
      const data = await packageService.getPackageTreeWithStatusDetail(packageId)
      setLoading(false)

      const defaultValues: PackageFormModel = {
        step1: {
          search: '',
          applications,
        },
        step2: {
          tabs,
          storePackage: {
            disponibility,
            icon,
            associatedMedia,
          },
        },
        step3: {
          price: data.data.price,
        },
      }

      reset(defaultValues)
    } catch {
      onError('Error al obtener las aplicaciones')
    }
  }

  // Handlers
  const handleStepChange = async (currentStep: number) => {
    const { step1, step2, step3 } = getValues()

    if (currentStep === 0) void setPackageFormTitle('Seleccionar aplicaciones')

    const hasAllUnchecked = step1.applications.every(({ status }) => status === 'unchecked')

    if (hasAllUnchecked) {
      onWarning('Tiene que seleccionar al menos una aplicación')
      return 'stop'
    }
    if (currentStep === 1) {
      if (isNewForm) void setPackageFormTitle('Crear nuevo paquete')
      if (!isNewForm) void setPackageFormTitle('Editar paquete')
    }

    if (currentStep === 2) void setPackageFormTitle('Resumen del paquete')

    const selectedTreeNodes = getNodeIdsByStatus({
      nodes: step1.applications as TreeSelectorNode[],
      type: 'withoutCheckedChildren',
      status: 'checked',
    })

    if (currentStep === 2) {
      const { data: packageDraftResponse } = await packageService.postPackageDraft({
        name: step2.tabs.EN.name,
        productUnitIds: selectedTreeNodes,
      })
      setPackageDraft(packageDraftResponse)

      reset((prevValues) => ({
        ...prevValues,
        step3: {
          price: idPackage !== undefined ? Number(step3.price) : packageDraftResponse.price,
        },
      }))
    }
    return 'continue'
  }

  const handleSubmit: SubmitHandler<PackageFormModel> = async (data) => {
    const { step1, step2 } = getValues()

    const selectedTreeNodes = getNodeIdsByStatus({
      nodes: step1.applications as TreeSelectorNode[],
      type: 'withoutCheckedChildren',
      status: 'checked',
    })
    try {
      setLoading(true)
      if (!isNewForm && idPackage && associatedMedias) {
        await packageService.putpackage(idPackage, formatBody(data, selectedTreeNodes))
        await deleteAssociatedMedia(idPackage, associatedMedias, step2.storePackage.associatedMedia)
        await uploadNewAssociatedMedia(
          idPackage,
          associatedMedias,
          step2.storePackage.associatedMedia,
        )

        onSuccess(`Has actualizado el paquete correctamente.`)
        void router.push(`/package/${idPackage}`)
      }
      if (isNewForm) {
        const packageResponse = await packageService.postPackage(
          formatBody(data, selectedTreeNodes),
        )
        await uploadAssociatedMedia(packageResponse.data.id, data)
        onSuccess(`Has creado  el paquete correctamente.`)

        void router.push(`/package/${packageResponse.data.id}`)
      }
    } catch {
      onError('No logramos crear el paquete. Por favor intenta nuevamente más tarde.')
    }
    setLoading(false)
    onClose()
  }

  useEffect(() => {
    if (isNewForm) {
      void getApplications()

      return
    }

    if (!idPackage) return
    void getPackageData(idPackage)
  }, [])

  const formLoadProps: Omit<FormLoadProps, 'steps'> = {
    title: packageFormTitle,
    finishButtonText: 'Confirmar',
    onClose,
    onStepChange: handleStepChange,
    onSubmit: handleSubmitFromLibrary(handleSubmit),
    loading,
    initialStep,
  }
  return (
    <FormProvider {...methods}>
      <PackageComponent formLoadProps={formLoadProps} isNewForm={isNewForm} />
    </FormProvider>
  )
}

export const PackageContainer = (props: PackagesContainerProps) => (
  <PackageProvider initialValue={{ value: null }}>
    <Component {...props} />
  </PackageProvider>
)
