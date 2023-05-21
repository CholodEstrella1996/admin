import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { PersonAddAlt1Outlined } from '@mui/icons-material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'

import { Customer } from 'utils/models/subscriptions.models'

import { InvitesStyles } from '../../invite.styles'

type NavigationProps = {
  customer: Customer
  onSubmit: () => void
}

const { colors } = theme

const Header = ({ customer, onSubmit }: NavigationProps) => {
  const router = useRouter()
  const role = router.pathname.split('/', 4)[3].split('_', 1).toString()

  const getRole = () => {
    if (role === 'family') return 'hijos'
    if (role === 'student') return 'estudiantes'
    if (role === 'teacher') return 'profesores'
    if (role === 'director') return 'directores'
    return null
  }

  return (
    <>
      <section className="header">
        <div className="header__button">
          <button type="button" onClick={() => router.back()} className="back__arrow">
            <ArrowBackIcon sx={{ fontSize: 37 }} />
          </button>
          <div className="header__label">
            <div className="header_label__title">
              <Typography variant="s2" color={colors.neutrals[400]}>
                Suscripción
              </Typography>
            </div>
            <Typography variant="h5" color={colors.primary[500]} weight="bold">
              {`# ${customer.id} - ${customer.name}`}
            </Typography>
          </div>
        </div>
        <div className="header__customer">
          <Typography variant="h3" color={colors.primary[500]} weight="bold">
            Invitar {getRole()}
          </Typography>
          <Button
            icon={<PersonAddAlt1Outlined />}
            onClick={onSubmit}
            type="button"
            size="medium"
            iconPosition="left">
            Enviar invitaciones
          </Button>
        </div>
      </section>
      <style jsx>{InvitesStyles}</style>
    </>
  )
}

export default Header
