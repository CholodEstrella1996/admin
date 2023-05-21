import React, { MouseEvent, useEffect, useState } from 'react'

import { LogOutOutline } from '@easy-eva-icons/react'
import { Avatar } from '@folcode/clabs.atoms.avatar'
import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Menu } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { HeaderAdminLocalStyles } from './headerAdmin.styles'

const menuStyles = {
  '& .MuiPaper-root': {
    borderRadius: '1rem',
    backgroundColor: theme.colors.neutrals.white,
    boxShadow: '0rem 0rem 1rem rgba(0, 0, 0, 0.08)',
    padding: '0.125rem 0.5rem',
  },
  '& .container .isColor, & .buttonIcon': {
    color: theme.colors.neutrals[400],
  },
}

export type HeaderAdminComponentProps = {
  logoIcon: React.ReactNode
  title: string
}

export const HeaderAdminComponent = ({ logoIcon, title }: HeaderAdminComponentProps) => {
  // Hooks
  const { data: session, status } = useSession()
  const router = useRouter()

  // States
  const [anchorElement, setAnchorEl] = useState<null | HTMLElement>(null)

  // Handlers
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  // Effects
  useEffect(() => {
    if (status === 'authenticated') handleClose()
  }, [status])

  // Render
  return (
    <div style={{ '--color': 'white' }}>
      <div className="headerAdmin__container">
        <div className="logo__icon">{logoIcon}</div>
        <div className="lineheader" />
        <div className="avatar__title">
          <Typography variant="p2" color={theme.colors.neutrals[300]}>
            {title}
          </Typography>

          {status === 'authenticated' && (
            <>
              <button
                type="button"
                onClick={handleClick}
                className={`avatar__button ${anchorElement ? 'avatar__button--hover' : ''}`}>
                <Avatar
                  name={session?.user?.name ?? ''}
                  image={session?.user?.image ?? undefined}
                  size="small"
                />
              </button>

              <Menu
                anchorEl={anchorElement}
                open={!!anchorElement}
                onClose={handleClose}
                elevation={0}
                sx={menuStyles}>
                <Button
                  icon={<LogOutOutline />}
                  variant="white"
                  onClick={() =>
                    void signOut({ redirect: false }).then(() => void router.push(`/login`))
                  }
                  size="medium">
                  Cerrar sesión
                </Button>
              </Menu>
            </>
          )}
        </div>
      </div>

      <style jsx>{HeaderAdminLocalStyles}</style>
    </div>
  )
}
