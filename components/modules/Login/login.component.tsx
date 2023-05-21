import React, { useState } from 'react'

import { EmailOutline, EyeOutline, EyeOffOutline } from '@easy-eva-icons/react'
import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import Link from 'next/link'
import { FormProvider, useForm } from 'react-hook-form'

import { InputText } from 'components/atoms/inputs/InputText'

import { Inputs as Form, LoginHandler } from './login.models'
import { LoginGlobalStyles, LoginLocalStyles } from './login.styles'

const { colors } = theme

export type LoginComponentProps = {
  onLogin: LoginHandler
}

export const LoginComponent = ({ onLogin }: LoginComponentProps) => {
  const methods = useForm<Form>()
  const { handleSubmit } = methods

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleShowPassword = () => setShowPassword((prev) => !prev)

  return (
    <div className="main-container">
      <div className="container">
        <Typography className="title" variant="h5" color={colors.primary[500]} weight="bold">
          Iniciar sesión
        </Typography>

        <FormProvider {...methods}>
          <form
            className="form"
            onSubmit={(e) => {
              setLoading(true)
              handleSubmit(onLogin)(e).finally(() => setLoading(false))
            }}>
            <div className="inputs-container">
              <InputText
                name="email"
                type="email"
                size="medium"
                placeholder="Correo Electrónico"
                icon={<EmailOutline />}
                iconPosition="right"
                className="input"
                rules={{ required: true }}
              />

              <InputText
                name="password"
                type={showPassword ? 'text' : 'password'}
                size="medium"
                placeholder="Contraseña"
                icon={
                  showPassword ? (
                    <EyeOutline onClick={handleShowPassword} />
                  ) : (
                    <EyeOffOutline onClick={handleShowPassword} />
                  )
                }
                iconPosition="right"
                className="input"
                rules={{ required: true }}
              />
            </div>

            <Link href="/forgot-password">
              <a hidden>
                <Typography
                  className="forgot-password-button"
                  variant="c1"
                  color={colors.primary[500]}>
                  ¿Olvidaste tu contraseña?
                </Typography>
              </a>
            </Link>

            <Button type="submit" className="button" disabled={loading}>
              Acceder
            </Button>
          </form>
        </FormProvider>
      </div>

      <style jsx>{LoginLocalStyles}</style>
      <style jsx global>
        {LoginGlobalStyles}
      </style>
    </div>
  )
}
