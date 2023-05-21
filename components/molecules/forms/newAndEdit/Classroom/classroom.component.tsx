/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import dayjs, { Dayjs } from 'dayjs'
import { useFormContext } from 'react-hook-form'

import { InputDate } from 'components/atoms/inputs/InputDate'
import { InputSelect } from 'components/atoms/inputs/InputSelect'
import { InputText } from 'components/atoms/inputs/InputText'
import { CustomerResponse } from 'services/models/customers/response.model'
import { CustomerParams, customerService } from 'services/modules/customers.module'
import { useNotification } from 'utils/hooks/notification'

import { InputSelectOption } from '../../../../atoms/inputs/InputSelect/inputSelect.component'
import { FormLoad, FormLoadProps } from '../../components/FormLoad'
import { ClassRoomFormModel } from './classroom.models'
import { classroomStyles } from './classroom.styles'

type FormNewEditClassRoomProps = {
  formLoadProps: Omit<FormLoadProps, 'steps'>
  CustomerSelect: InputSelectOption[]
  customerStatus: InputSelectOption[]
  isNewForm: boolean
}

const convertDateTo = (value: Dayjs | number | Date, format = 'YYYY/MM/DD') =>
  dayjs(value).format(format)
const convertToDayjs = (value: Dayjs | number | Date) => dayjs(value)

const { colors } = theme
const today = new Date()

export const ClassRoomComponent = (props: FormNewEditClassRoomProps) => {
  const { formLoadProps, CustomerSelect, customerStatus, isNewForm } = props
  const [licence, Setlicence] = useState<InputSelectOption[]>()
  const [filters] = useState<CustomerParams>({
    ga: true,
  })
  const methods = useFormContext<ClassRoomFormModel>()
  const { onError } = useNotification()

  const convertedSelect = (_data: CustomerResponse['getCustomerSuscriptionClassRoom']) => {
    const convertedOptions: InputSelectOption[] = _data.content.map((item) => ({
      id: item.id,
      name: `${item.licenceNumber} `,
    }))
    return convertedOptions
  }

  const isCustomerSelect = methods.watch('customer')
  const isLicenceSelect = methods.watch('classroomLicence')
  const serverRules = isCustomerSelect
    ? { required: true, disabled: false }
    : { required: false, disabled: true }

  const offlineActivations = methods.watch('offlineActivations')
  const installations = methods.watch('installations')

  const setLicence = () => {
    if (isLicenceSelect && isLicenceSelect.name !== '' && isNewForm) {
      methods.setValue('licenceNumber', `GA-${isLicenceSelect.name}`)
    }
  }

  const getDataApiData = async () => {
    if (isCustomerSelect && isNewForm) {
      try {
        const suscription = await customerService.getSubscriptionsClassRoom(
          isCustomerSelect.id,
          filters,
        )
        Setlicence(convertedSelect(suscription.data))
      } catch {
        onError('Error al cargar las suscripción')
      }
    }
  }
  useEffect(() => {
    void getDataApiData()
  }, [isCustomerSelect])

  useEffect(() => {
    void setLicence()
  }, [isLicenceSelect])
  useEffect(() => {
    if (isNewForm) methods.setValue('startDate', convertDateTo(today))
  }, [])
  useEffect(() => {
    if (Number(offlineActivations) <= 0) {
      methods.setValue('offlineActivations', undefined)
    }
    if (Number(installations) <= 0) {
      methods.setValue('installations', undefined)
    }
  }, [offlineActivations, installations])

  const ClassRoomForm = (
    <div className="container-classroom ">
      <div className="title-subscription">
        <Typography color={colors.primary[500]} variant="s1">
          Datos de la licencia
        </Typography>
      </div>
      <div className="content-subscription">
        {isNewForm ? (
          <>
            <InputSelect
              name="customer"
              options={CustomerSelect ?? []}
              label="Cliente"
              size="small"
              withSearch
              rules={{ required: true }}
            />
            <InputSelect
              name="classroomLicence"
              options={licence ?? []}
              label="Licencia Aula"
              size="medium"
              rules={serverRules}
            />
          </>
        ) : (
          <>
            <InputText
              name="customer.name"
              label="Cliente"
              size="medium"
              type="text"
              rules={{ disabled: true }}
            />

            <InputText
              name="classroomLicence.name"
              label="Licencia Aula"
              size="medium"
              type="text"
              rules={{ disabled: true }}
            />
          </>
        )}
      </div>

      <div className="content-rows">
        <div className="content-rows-enabled">
          <InputText
            name="offlineActivations"
            label="ACTIVACIONES OFFLINE"
            size="medium"
            type="number"
            rules={{ required: true }}
          />

          <InputText
            name="installations"
            label="INSTALACIONES PERMITIDAS"
            size="medium"
            type="number"
            rules={{ required: true }}
          />
        </div>
        <InputText
          name="licenceNumber"
          label="NÚMERO DE LICENCIA"
          size="medium"
          type="text"
          rules={{ disabled: true }}
        />
      </div>

      <div className="content-rows">
        <div className="content-rows-enabled">
          <InputDate
            name="startDate"
            label="Fecha de inicio"
            maxDate={convertToDayjs(methods.watch('endDate') as unknown as number)}
            rules={{ required: true }}
          />
          <InputDate
            name="endDate"
            label="Fecha de finalización"
            minDate={convertToDayjs(methods.watch('startDate') as unknown as number)}
            rules={{ required: true }}
          />
        </div>
        <InputSelect
          name="status"
          options={customerStatus ?? []}
          label="Estado"
          size="medium"
          rules={{ required: true }}
        />
      </div>

      <style jsx>{classroomStyles}</style>
    </div>
  )
  const step = [{ id: 1, element: ClassRoomForm }]

  return <FormLoad steps={step} {...formLoadProps} />
}
