/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { PersonOutline, PhoneOutline, EmailOutline, PersonDoneOutline } from '@easy-eva-icons/react'
import { Avatar } from '@folcode/clabs.atoms.avatar'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { PersonOutlined } from '@mui/icons-material'
import { Chip } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'

import { InputDate } from 'components/atoms/inputs/InputDate'
import { InputFile } from 'components/atoms/inputs/InputFile'
import Select from 'components/atoms/inputs/InputSelectMulti'
import { InputTextComponent as InputText } from 'components/atoms/inputs/InputText/inputText.component'

import Header from './components/Header'
import { SubscriptionAssignmentForm } from './components/suscription'
import { MemberProps } from './detailEditUser.model'
import { DetailEditUserGlobalStyles, DetailEditUserLocalStyles } from './detailEditUser.styles'

export const DetailUserComponent = ({
  member,
  onDelete,
  onSubmit,
  setIsEditable,
  isEditable,
  isSaving,
  identityOptions,
  genderOptions,
  educationLevelOptions,
}: MemberProps) => {
  const {
    status: { name },
    role,
    user: { firstName, surname, email, avatarUrl },
  } = member
  const { colors } = theme

  const [isOpenForm, setIsOpenForm] = useState(false)

  const convertDateTo = (value: Dayjs | string | Date, format = 'DD/MM/YYYY') =>
    dayjs(value).format(format)

  const convertToDayjs = (value: Dayjs | number | Date) => dayjs(value)
  const rules = isEditable || isSaving ? { required: true, disabled: false } : { required: false }

  useEffect(() => {
    if (member.user.birthDate) convertDateTo(member.user.birthDate)
  }, [])

  return (
    <div
      style={{
        '--chip-font-color': name === 'active' ? colors.neutrals.white : colors.neutrals[500],
        '--chip-background-color':
          name === 'active' ? `${colors.semantic.success}` : colors.neutrals[50],
      }}>
      <Header
        onDelete={onDelete}
        email={email}
        isEditable={isEditable}
        isSaving={isSaving}
        onSubmit={onSubmit}
        title="Detalles de usuario"
        setIsEditable={setIsEditable}
      />

      <section className="userInfo__container">
        <div className="user__avatar">
          <section className="usernameAndAvatar">
            <Avatar
              name={name}
              size="medium"
              color={colors.neutrals.white}
              icon={
                !avatarUrl && <PersonOutlined sx={{ border: '4px solid' }} className="personIcon" />
              }
              image={String(avatarUrl)}
              className="avatar__image"
            />
            {(firstName || surname) && (
              <div className="user__avatar--text">
                <Typography variant="s1" weight="bold" color={colors.neutrals[500]}>
                  {firstName && firstName} {surname && surname}
                </Typography>
              </div>
            )}
            <Typography variant="s2" color={colors.neutrals[300]} className="user__role">
              {role[0].displayName}
            </Typography>
          </section>

          <Chip
            label={
              <Typography variant="s2" className="profile__chip--color">
                {name === 'active' ? 'Registrado' : 'invitado'}
              </Typography>
            }
            className="profile__chip"
          />
          <div className="user_suscription">
            <Typography variant="p2" color={colors.neutrals[900]} className="user__role">
              Suscripción A
            </Typography>
            {isEditable && (
              <button
                type="button"
                onClick={() => setIsOpenForm(true)}
                className="subs__button__actions">
                <Typography variant="s1" color={colors.primary[500]}>
                  Cambiar
                </Typography>
              </button>
            )}
          </div>
        </div>

        <div className="user__information">
          <div className="usernames">
            <InputText
              name="firstName"
              label="Nombre"
              placeholder={member.user.firstName}
              size="medium"
              icon={<PersonOutline fontSize={20} />}
              iconPosition="left"
              rules={rules}
              readOnly={!isEditable}
            />

            <InputText
              name="surname"
              label="apellido"
              placeholder={member.user.surname}
              size="medium"
              icon={<PersonOutline fontSize={20} />}
              iconPosition="left"
              rules={rules}
              readOnly={!isEditable}
            />
          </div>

          <InputText
            name="phoneNumber"
            label="Teléfono"
            placeholder={member.user.phoneNumber}
            size="medium"
            icon={<PhoneOutline fontSize={20} />}
            iconPosition="left"
            rules={rules}
            type="number"
            readOnly={!isEditable}
          />

          <InputText
            name="email"
            label="Correo electrónico"
            placeholder={member.user.email}
            size="medium"
            icon={<EmailOutline fontSize={20} />}
            iconPosition="left"
            rules={{ required: true, disabled: true }}
            readOnly={!isEditable}
          />
          <div className="id__data">
            <Select
              name="identityType"
              size="medium"
              options={identityOptions}
              label="Tipo de ID "
              placeholder={member.user.identityType?.name ?? 'Indique tipo de ID'}
              disabled={!isEditable}
            />

            <InputText
              className="input__identityNumber"
              name="identityNumber"
              label="id"
              size="medium"
              icon={<PersonDoneOutline fontSize={20} />}
              iconPosition="left"
              rules={rules}
              type="number"
              readOnly={!isEditable}
            />
          </div>
          <div className="extra__data">
            <InputDate
              name="birthDate"
              label="Fecha de nacimiento"
              fullWidth
              rules={{ required: false }}
              minDate={
                !isEditable ? convertToDayjs(member.user.birthDate as unknown as number) : undefined
              }
              maxDate={
                !isEditable ? convertToDayjs(member.user.birthDate as unknown as number) : undefined
              }
              placeholder="Fecha"
              isDisabled={!isEditable}
            />

            <Select
              name="gender"
              size="medium"
              options={genderOptions}
              label="Género"
              placeholder={member.user.gender?.displayName ?? 'Género'}
              disabled={!isEditable}
            />

            <Select
              name="educationalLevel"
              size="medium"
              options={educationLevelOptions}
              label="Nivel Educativo"
              placeholder={member.user.educationalLevel?.displayName ?? 'Nivel educativo'}
              disabled={!isEditable}
            />
          </div>
          {(avatarUrl || isEditable) && (
            <>
              <Typography
                variant="label"
                weight="bold"
                color={!isEditable || isSaving ? colors.neutrals[200] : colors.neutrals[400]}
                className="user__avatar--label">
                Foto de perfil
              </Typography>

              <InputFile
                maxUploads={1}
                size="medium"
                name="avatarUrl"
                accept="image/png, image/jpeg, image/jpg"
              />
            </>
          )}
        </div>
      </section>
      {isOpenForm && <SubscriptionAssignmentForm onClose={() => setIsOpenForm(false)} />}

      <style jsx>{DetailEditUserLocalStyles}</style>
      <style jsx global>
        {DetailEditUserGlobalStyles}
      </style>
    </div>
  )
}
