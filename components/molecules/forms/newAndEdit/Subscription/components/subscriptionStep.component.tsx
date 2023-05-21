/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import dayjs, { Dayjs } from 'dayjs'
import { useFormContext } from 'react-hook-form'

import { InputCheckbox } from 'components/atoms/inputs/InputCheckbox'
import { InputDate } from 'components/atoms/inputs/InputDate'
import { InputSelect } from 'components/atoms/inputs/InputSelect'
import { InputText } from 'components/atoms/inputs/InputText'
import { useInputSelectContext } from 'utils/contexts/inputSelect.context'

import { SubscriptionFormModel } from '../subscription.models'
import { subscriptionStyles } from '../subscription.styles'

const { colors } = theme

const MILLISECONDS_TO_DAY = 1000 * 60 * 60 * 24

const convertDateTo = (value: Dayjs | number | Date, format = 'YYYY/MM/DD') =>
  dayjs(value).format(format)

const convertToDayjs = (value: Dayjs | number | Date) => dayjs(value)

export const SubscriptionStep = () => {
  // Hooks
  const methods = useFormContext<SubscriptionFormModel>()

  const { options } = useInputSelectContext()

  // Data
  const kindSelected = methods.watch('step3.kind')
  const installationCount = methods.watch('step3.installationCount')
  const startDate = methods.watch('step3.startDate')
  const dayCount = methods.watch('step3.dayCount')
  const endDate = methods.watch('step3.endDate') as string
  const userCount = methods.watch('step3.userCount')
  const accessCount = methods.watch('step3.accessCount')
  const checkServerLMS = methods.watch('step3.isLtiServerExternal')
  const ltiSupportForAndroid = methods.watch('step3.ltiSupportForAndroid')
  const allowedAccess = methods.watch('step3.allowedAccess')

  // calcular diferencias de días en el inputDate
  const initialTime = new Date(startDate).getTime()
  const endTime = new Date(endDate).getTime()

  const resultDifference = endTime - initialTime ?? null

  // Calcular diferencias de días con el contador
  const difference = Number(dayCount) * MILLISECONDS_TO_DAY

  const newCountDate = initialTime + difference
  const newDateConverted = convertDateTo(newCountDate)

  // Effects
  const [prevValues, setPrevValues] = useState({
    'step3.endDate': '',
    'step3.startDate': '',
    'step3.dayCount': 0,
  })

  const isEqual = (a: typeof prevValues, b: SubscriptionFormModel) =>
    a['step3.dayCount'] === b.step3.dayCount &&
    a['step3.endDate'] === b.step3.endDate &&
    a['step3.startDate'] === b.step3.startDate

  const customerKind =
    options?.customerKind[0] !== undefined ? options?.customerKind[0].name : undefined

  const isDemoOrMonoUser =
    kindSelected?.name === 'monouser-shared' ||
    kindSelected?.name === 'monouser-individual' ||
    kindSelected?.name === 'demo-individual' ||
    kindSelected?.name === 'demo-shared'

  const contentSubs = kindSelected?.name === 'lms-lti' ? 'lms-subscription' : 'content-subscription'

  const isShared =
    customerKind === 'institution' ||
    customerKind === 'parent' ||
    kindSelected?.name === 'monouser-shared' ||
    kindSelected?.name === 'demo-shared'

  const contentSubsMonouser =
    isShared && isDemoOrMonoUser ? 'content-monouser-institution-parent' : ''

  const isCheckedServer = checkServerLMS && checkServerLMS.length > 0

  const isSupport = ltiSupportForAndroid && ltiSupportForAndroid.name === 'si'

  const serverRules = isCheckedServer
    ? { required: true, disabled: false }
    : { required: false, disabled: true }

  const supportRules = !isSupport
    ? { required: true, disabled: false }
    : { required: false, disabled: true }

  useEffect(() => {
    if (!dayCount) return
    setPrevValues((prevState) => ({ ...prevState, dayCount }))
    if (isEqual(prevValues, methods.getValues())) return
    if (dayCount <= 0) {
      methods.setValue('step3.dayCount', undefined)
      methods.setValue('step3.endDate', undefined)
      return
    }
    if (startDate) {
      setTimeout(() => {
        methods.setValue('step3.endDate', newDateConverted)
      }, 0)
    }
  }, [dayCount])

  useEffect(() => {
    setPrevValues((prevState) => ({ ...prevState, startDate }))

    const days = resultDifference / MILLISECONDS_TO_DAY
    const daysFixed = days.toFixed()
    if (isEqual(prevValues, methods.getValues())) return
    if (endDate) {
      methods.setValue('step3.dayCount', Number(daysFixed))
    }
  }, [startDate])

  useEffect(() => {
    if (!endDate) return
    setPrevValues((prevState) => ({ ...prevState, endDate }))
    const days = resultDifference / MILLISECONDS_TO_DAY
    const daysFixed = days.toFixed()

    if (isEqual(prevValues, methods.getValues())) return
    if (startDate) {
      methods.setValue('step3.dayCount', Number(daysFixed))
    }
  }, [endDate])

  useEffect(() => {
    if (Number(installationCount) <= 0) {
      methods.setValue('step3.installationCount', undefined)
    }
    if (Number(userCount) <= 0) {
      methods.setValue('step3.userCount', undefined)
    }
    if (Number(accessCount) <= 0) {
      methods.setValue('step3.accessCount', undefined)
    }
    if (Number(allowedAccess) <= 0) {
      methods.setValue('step3.allowedAccess', undefined)
    }
  }, [installationCount, userCount, accessCount, allowedAccess])

  useEffect(() => {
    if (kindSelected?.name === 'multiuser-permanent') {
      methods.setValue('step3.dayCount', undefined)
      methods.setValue('step3.endDate', undefined)
    }
  }, [kindSelected])

  useEffect(() => {
    if (ltiSupportForAndroid?.name === 'si') {
      methods.setValue('step3.ltiErrorMessage', '')
    }
  }, [ltiSupportForAndroid])

  const minAdditionalUsers = options?.limitAdditionalusers
    ? options?.limitAdditionalusers[0]?.id
    : 0

  // Render
  return (
    <div className="container-subscription">
      <div className="title-subscription">
        <Typography color={colors.primary[500]} variant="s1">
          Datos de la suscripción
        </Typography>
      </div>

      <div className={`${contentSubs} ${contentSubsMonouser}`}>
        <InputSelect
          name="step3.kind"
          options={options?.subscriptionKinds ?? []}
          label="Tipo de suscripción"
          size="medium"
          rules={{ required: true }}
        />
        {isDemoOrMonoUser && (
          <>
            {kindSelected?.name === 'monouser-shared' && (
              <>
                <InputText
                  name="step3.userCount"
                  type="number"
                  label="Cantidad de usuarios adic."
                  size="medium"
                  rules={
                    !kindSelected
                      ? { disabled: true }
                      : {
                          required: true,
                          max: { value: 2000000, message: 'El máximo es de 2000000' },
                        }
                  }
                />
                <InputText
                  name="step3.allowedAccess"
                  type="number"
                  label="Cantidad de accesos"
                  size="medium"
                  rules={
                    !kindSelected
                      ? { disabled: true }
                      : {
                          required: true,
                          max: { value: 2000000, message: 'El máximo es de 2000000' },
                        }
                  }
                />
              </>
            )}
            {kindSelected?.name === 'demo-shared' && (
              <>
                <InputText
                  name="step3.userCount"
                  type="number"
                  label="Cantidad de usuarios adic."
                  size="medium"
                  rules={
                    !kindSelected
                      ? { disabled: true }
                      : {
                          required: true,
                          max: { value: 30, message: 'El máximo es de 30' },
                          min: {
                            value: minAdditionalUsers,
                            message: `Cuenta con ${minAdditionalUsers} usuarios invitados. Si deseas reducir la cantidad, elimina usuarios relacionados.`,
                          },
                        }
                  }
                />
                <InputText
                  name="step3.allowedAccess"
                  type="number"
                  label="Cantidad de accesos"
                  size="medium"
                  rules={
                    !kindSelected
                      ? { disabled: true }
                      : {
                          required: true,
                          max: { value: 30, message: 'El máximo es de 30' },
                        }
                  }
                />
              </>
            )}
            {(kindSelected?.name === 'monouser-individual' ||
              kindSelected?.name === 'demo-individual') && (
              <InputText
                name="step3.allowedAccess"
                type="number"
                label="Cantidad de accesos"
                size="medium"
                rules={
                  !kindSelected
                    ? { disabled: true }
                    : {
                        required: true,
                        max: { value: 30, message: 'El máximo es de 30' },
                      }
                }
              />
            )}
          </>
        )}

        {kindSelected?.name === 'lms-lti' && (
          <>
            <InputText
              name="step3.userCount"
              type="number"
              label="Cantidad de usuarios"
              size="medium"
              rules={
                !kindSelected
                  ? { disabled: true }
                  : {
                      required: true,
                      max: { value: 2000000, message: 'El máximo es de 2000000' },
                    }
              }
            />

            <div className="content-lms-msj">
              <InputCheckbox
                name="step3.isLtiServerExternal"
                options={[
                  { id: 1, name: 'Servidor LMS externo', displayName: 'Servidor LMS externo' },
                ]}
                titlePosition="right"
              />
            </div>

            <InputSelect
              name="step3.ltiServerLocation"
              options={[
                { id: 1, name: 'Turquía', displayName: 'Turquía' },
                { id: 2, name: 'Estados Unidos', displayName: 'Estados Unidos' },
                { id: 3, name: 'Colombia', displayName: 'Colombia' },
                { id: 4, name: 'Brasil', displayName: 'Brasil' },
              ]}
              label="ubicación del servidor"
              size="medium"
              rules={serverRules}
            />
          </>
        )}

        {(!kindSelected ||
          kindSelected.name === 'multiuser-temporary' ||
          kindSelected.name === 'multiuser-permanent') && (
          <InputText
            name="step3.installationCount"
            type="number"
            label="Cantidad de instalaciones"
            size="medium"
            rules={{
              required: true,
              max: { value: 2000000, message: 'El máximo es de 2000000' },
            }}
          />
        )}
      </div>

      <div className="content-invoicingData1">
        <InputDate
          name="step3.startDate"
          label="Fecha de inicio"
          rules={{ required: true }}
          maxDate={
            kindSelected.name !== 'multiuser-permanent'
              ? convertToDayjs(methods.watch('step3.endDate') as unknown as number)
              : undefined
          }
        />
        {kindSelected.name === 'multiuser-permanent' && (
          <>
            <InputText
              name="step"
              label="Duración en días"
              size="medium"
              type="number"
              rules={{ disabled: true }}
            />
            <InputDate name="step" label="Fecha de finalización" rules={{ disabled: true }} />
          </>
        )}
        {kindSelected.name !== 'multiuser-permanent' && (
          <>
            <InputText
              name="step3.dayCount"
              label="Duración en días"
              size="medium"
              type="number"
              rules={{ required: true }}
            />
            <InputDate
              name="step3.endDate"
              label="Fecha de finalización"
              rules={{ required: true }}
              minDate={convertToDayjs(methods.watch('step3.startDate') as unknown as number)}
            />
          </>
        )}

        <InputSelect
          name="step3.status"
          options={options?.subscriptionStatus ?? []}
          label="Estado"
          size="medium"
          menuPosition="top"
          rules={{ required: true }}
        />
      </div>

      {kindSelected?.name === 'lms-lti' && (
        <div className="content-lms">
          <div className="content-support">
            <InputSelect
              name="step3.ltiSupportForAndroid"
              options={[
                { id: 1, name: 'si', displayName: 'Si' },
                { id: 2, name: 'no', displayName: 'No' },
              ]}
              label="¿Soporte?"
              size="medium"
              menuPosition="top"
              rules={{ required: true }}
            />
          </div>
          <InputText
            name="step3.ltiErrorMessage"
            label="Mensaje de error"
            size="medium"
            type="text"
            rules={{ ...supportRules, maxLength: 100 }}
          />
        </div>
      )}

      {kindSelected?.name === 'multiuser-permanent' && (
        <div className="label-subscription">
          <Typography color={colors.primary[500]} variant="s2">
            La suscripción no tiene fecha de finalización
          </Typography>
        </div>
      )}

      <style jsx>{subscriptionStyles}</style>
    </div>
  )
}
