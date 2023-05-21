/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import router from 'next/router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { OptionProps } from 'components/atoms/inputs/InputSelectMulti/select.models'
import { User, ResponseMemberById } from 'services/models/member.model'
import { customerService } from 'services/modules/customers.module'
import memberService from 'services/modules/member'
import userService from 'services/modules/user.module'
import { useSubscriptionIdContext } from 'utils/contexts/subscriptionId.context'
import { memberDetail, memberRequest } from 'utils/helpers/member-detail'
import { useNotification } from 'utils/hooks/notification'

import { DetailUserComponent } from './detailEditUser.component'
import { MemberInputForm } from './detailEditUser.model'

type Props = {
  memberId: number
}

export const DetailEditUserContainer = ({ memberId }: Props) => {
  const [member, setMember] = useState<ResponseMemberById>()

  const [isSaving, setIsSaving] = useState(false)
  const [identitiesType, setIdentitiesType] = useState<OptionProps[]>([])
  const [gender, setGender] = useState<OptionProps[]>([])
  const [educationLevel, setEducationLevel] = useState<OptionProps[]>([])
  const [isEditable, setIsEditable] = useState(false)
  const idCustomer = useSubscriptionIdContext()
  const { onSuccess, onError } = useNotification()

  const [user, setUser] = useState<User>()

  const methods = useForm<MemberInputForm>()
  const { handleSubmit, reset } = methods

  const onSubmit: SubmitHandler<MemberInputForm> = async (successData) => {
    setIsSaving(true)
    const updateMember = memberRequest(successData, member?.user)

    try {
      if (member !== undefined) await userService.updateUser(updateMember, member.user.id)

      const itemEducationLevel = educationLevel.find(
        (item) => item.id === successData?.educationalLevel?.id && item,
      )
      const itemGender = gender.find((item) => item.id === successData?.gender?.id && item)
      if (setUser && user && itemEducationLevel && itemGender) {
        setUser({
          ...user,
          ...successData,
          identityType: {
            id: 0,
            value: String(successData.identityType),
            label: String(successData.identityType),
          },
          educationalLevel: {
            id: Number(successData.educationalLevel?.id),
            value: itemEducationLevel.value,
            label: itemEducationLevel.label,
          },
          gender: {
            id: Number(successData.gender?.id),
            value: itemGender?.value,
            label: itemGender?.label,
          },
          cityId: user.cityId,
          stateId: user.stateId,
          countryId: user.countryId,
          avatarUrl: successData.image ? String(successData.image) : '',
        })
      }
      onSuccess('Guardaste los cambios correctamente')
      void router.push(`/customer/${idCustomer}/members/${memberId}`)
    } catch {
      onError('No logramos guardar los cambios. Intenta nuevamente más tarde.')
    }
    setIsSaving(false)
  }

  const fetchMember = async () => {
    try {
      const customer = await customerService.getCustomer(idCustomer)
      if (customer.data.kind === 'institution' || customer.data.kind === 'parent') {
        const [dataMember, dataIdentitiesTypes, dataEducationLevel, dataGender] = await Promise.all(
          [
            memberService.getMemberById(Number(customer.data.organization.id), memberId),
            userService.getIdentitiesType(),
            userService.getEducationLevel(),
            userService.getGender(),
          ],
        )

        setMember(dataMember)
        setIdentitiesType(dataIdentitiesTypes)
        setEducationLevel(dataEducationLevel)
        setGender(dataGender)
        if (dataMember.user.firstName) {
          const detailMember = await memberDetail(dataMember.user)

          reset(detailMember)
        }
      }
    } catch {
      onError('No logramos cargar los datos del usuario. Intenta nuevamente más tarde.')
    }
  }

  useEffect(() => {
    if (idCustomer && memberId) void fetchMember()
  }, [])

  async function deleteMember(): Promise<void> {
    try {
      await memberService.deleteMember(Number(member?.user.organizationId), Number(memberId))
      onSuccess('Has eliminado el usuario correctamente.')
      void router.push(`/customer/${idCustomer}/members`)
    } catch {
      onError('No logramos eliminar el usuario. Intenta nuevamente más tarde.')
    }
  }

  if (!member) return null
  if (!member?.user) {
    void router.push('/institution')
    return null
  }

  return (
    <FormProvider {...methods}>
      <DetailUserComponent
        member={member}
        onSubmit={handleSubmit(onSubmit)}
        onDelete={() => void deleteMember()}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        isSaving={isSaving}
        identityOptions={identitiesType}
        educationLevelOptions={educationLevel}
        genderOptions={gender}
      />
    </FormProvider>
  )
}
