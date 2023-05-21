/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import LoadingModal from 'components/molecules/modals/LoadingModal/loadingModal.component'
import { ClassroomResponse } from 'services/models/classroom/response.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { classroomService, GetMembersParams } from 'services/modules/classroom.module'
import { customerService } from 'services/modules/customers.module'
import { useNotification } from 'utils/hooks/notification'

import InstitutionComponent from './institution.component'
import { DataFilter } from './institution.model'

type MemberRole = {
  roleName: string
  page: number
}
type Props = {
  idCustomer?: number
}

const InstitutionContainer = ({ idCustomer }: Props) => {
  const methods = useForm<DataFilter>()
  const { handleSubmit } = methods

  const [responseData, setResponseData] = useState<ClassroomResponse['getMembers']>()
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionsResponse['getSubscription']>()

  const [memberRole, setMemberRole] = useState<MemberRole>({
    roleName: 'organization-student',
    page: 0,
  })
  const [role, setRole] = useState('organization-student')
  const [pageNumber, setPageNumber] = useState(0)
  const [IdOrganization, setIdOrganization] = useState<number>()
  const [listStatus, setlistStatus] = useState<InputSelectOption[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [download, setDownload] = useState(false)

  const { onSuccess, onError } = useNotification()
  const router = useRouter()

  const customerId = subscriptionData?.customer.id

  const getListStatus = async () => {
    setlistStatus(await classroomService.getStatus().then((res) => res.data.content))
  }

  const getMembers = async (rol: string, pageNumb: number, dataFilter?: DataFilter) => {
    setIsLoading(true)
    const params: GetMembersParams = {
      pageNumber: pageNumb,
      role: rol,
      pageSize: 10,
      ...(dataFilter?.searchQuery && { searchQuery: dataFilter?.searchQuery }),
      ...(dataFilter?.status && { status: dataFilter?.status?.name }),
    }
    try {
      const response = await classroomService.getMembers(Number(IdOrganization), params)
      setResponseData(response.data)
    } catch {
      onError('Error al cargar los datos del usuario')
    }

    setMemberRole({ roleName: rol, page: pageNumb })
    setIsLoading(false)
  }

  const changeRole = (rol?: string, page?: number, data?: DataFilter) => {
    void getMembers(rol ?? role, page ?? pageNumber, data)
    if (page) setPageNumber(page)
    if (rol) setRole(rol)
  }

  const onSearch: SubmitHandler<DataFilter> = async (data) => {
    changeRole(undefined, 0, data)
  }

  const deleteMember = async (id: number) => {
    try {
      const customer = await customerService.getCustomer(Number(idCustomer))
      if (customer.data.kind === 'institution' || customer.data.kind === 'parent') {
        await classroomService.deleteMember(Number(customer.data.organization.id), id)
        onSuccess(`Se elimino correctamente el usuario`)
        void router.push(`/customer/${Number(customerId)}/members`)
      }
    } catch {
      onError('Se produjo un error al eliminar usuario')
    }
  }

  const getOrganizationId = async () => {
    if (idCustomer !== undefined) {
      const [response, subscriptionLatest] = await Promise.all([
        customerService.getCustomer(idCustomer),
        customerService.getSubscriptionLatestActive(idCustomer),
      ])
      setSubscriptionData(subscriptionLatest.data)
      if (response.data.kind === 'institution' || response.data.kind === 'parent')
        setIdOrganization(Number(response.data.organization.id))
    }
  }

  const downloadListInvites = async () => {
    const params = {
      role: memberRole.roleName,
    }
    if (!IdOrganization) return
    setDownload(true)
    try {
      await classroomService.downloadMemberList(IdOrganization, params)
    } catch {
      onError('Hubo un error al descargar archivo de excel')
    }
    setDownload(false)
  }

  useEffect(() => {
    if (!listStatus) void getListStatus()
    void getOrganizationId()
  }, [])

  useEffect(() => {
    const isInstitution =
      !responseData?.content &&
      IdOrganization !== undefined &&
      subscriptionData?.customer.kind.name !== 'parent'
    const isParent =
      !responseData?.content &&
      IdOrganization !== undefined &&
      subscriptionData?.customer.kind.name === 'parent'

    if (isInstitution) {
      void getMembers(memberRole.roleName, 0)
    }
    if (isParent) {
      void getMembers('family-child', 0)
    }
  }, [IdOrganization])

  if (!responseData || !subscriptionData || !listStatus) return null
  return (
    <>
      <FormProvider {...methods}>
        <InstitutionComponent
          isLoading={isLoading}
          listStatus={listStatus}
          deleteUser={(id) => void deleteMember(id)}
          role={(rol: string, page: number) => {
            changeRole(rol, page)
          }}
          data={responseData}
          subscriptionData={subscriptionData}
          onSearch={handleSubmit(onSearch)}
          onDownload={() => downloadListInvites()}
        />
      </FormProvider>
      {download && <LoadingModal message="Descargando archivo, por favor espere..." />}
    </>
  )
}

export default InstitutionContainer
