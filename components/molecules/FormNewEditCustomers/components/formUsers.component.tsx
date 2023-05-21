import { useState } from 'react'

import { EyeOffOutline, EyeOutline } from '@easy-eva-icons/react'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

import { InputFile } from 'components/atoms/inputs/InputFile'
import { InputSelect } from 'components/atoms/inputs/InputSelect'
import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { InputText } from 'components/atoms/inputs/InputText'

import {
  FormNewEditCustomersGlobalStyles,
  FormNewEditCustomersLocalStyles,
} from '../formNewEditCustomers.styles'

const { colors } = theme

type FormUserProps = {
  isNewForm: boolean | undefined
  optionCountries?: InputSelectOption[]
  optionCities?: InputSelectOption[]
  optionIdentity?: InputSelectOption[]
  optionStates?: InputSelectOption[]
}

const FormUsers = (props: FormUserProps) => {
  const { isNewForm, optionCountries, optionCities, optionStates, optionIdentity } = props

  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => setShowPassword((prev) => !prev)

  if (!optionCountries && !optionIdentity && !optionStates && !optionCities) return null

  return (
    <>
      <div className="container-user">
        <Typography color={colors.primary[500]} variant="s1">
          Datos del usuario
        </Typography>
        <div className="content-user">
          <div className="input-user2">
            <InputText
              name="user.firstName"
              label="Nombre"
              rules={{ required: true, maxLength: 50 }}
            />
          </div>
          <div className="input-user2">
            <InputText
              name="user.surname"
              label="Apellido"
              rules={{ required: true, maxLength: 50 }}
            />
          </div>
        </div>
        <div className="content-user">
          <div className="input-user1">
            <InputSelect
              name="user.country"
              options={optionCountries ?? []}
              label="País"
              className="select-width"
              rules={{ required: true }}
              withSearch
              size="small"
            />
          </div>
          <div className="input-user1">
            <InputSelect
              name="user.state"
              options={optionStates ?? []}
              label="Provincia/Estado"
              className="select-width"
              rules={{ required: true }}
              withSearch
              size="small"
            />
          </div>
          <div className="input-user1">
            <InputSelect
              name="user.city"
              options={optionCities ?? []}
              label="Ciudad"
              className="select-width"
              rules={{ required: true }}
              withSearch
              size="small"
            />
          </div>
        </div>
        <div className="content-user">
          <div className="input-user2">
            <InputText
              name="user.address"
              label="Domicilio"
              rules={{ required: true, maxLength: 100 }}
            />
          </div>
          <div className="input-user1">
            <InputText
              name="user.postalCode"
              label="Código postal"
              rules={{ required: true, maxLength: 10 }}
            />
          </div>
        </div>
        <div className="content-user">
          <div className="input-user1">
            <InputText name="user.phone" label="TELÉFONO" rules={{ required: true }} />
          </div>
          <div className="input-user1">
            <InputSelect
              name="user.identityType"
              options={optionIdentity ?? []}
              label="Tipo de id"
              className="select-width"
              rules={{ required: true }}
            />
          </div>
          <div className="input-user1">
            <InputText name="user.identityNumber" label="ID" rules={{ required: true }} />
          </div>
        </div>
        <div className="content-user">
          <div className="input-user2">
            <InputText
              name="user.email"
              type="email"
              size="medium"
              label="Correo electrónico"
              rules={{ required: true }}
            />
          </div>
          <div className="input-user2">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="passwordFake"
              autoComplete="new-password"
              hidden
            />
            <InputText
              name="user.password"
              type={showPassword ? 'text' : 'password'}
              size="medium"
              label="Contraseña"
              icon={
                showPassword ? (
                  <EyeOutline onClick={handleShowPassword} />
                ) : (
                  <EyeOffOutline onClick={handleShowPassword} />
                )
              }
              iconPosition="right"
              rules={isNewForm ? { required: true } : undefined}
            />
          </div>
        </div>
        <div className="content-avatar">
          <InputFile name="avatar" accept="image/*" maxUploads={1} label="Foto de perfil" />
        </div>
      </div>
      <style jsx>{FormNewEditCustomersLocalStyles}</style>
      <style jsx global>
        {FormNewEditCustomersGlobalStyles}
      </style>
    </>
  )
}

export default FormUsers
