import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'

import { HeaderTitleStyles } from './headerTitle.styles'

type TitleProps = {
  title: string
  children?: React.ReactNode
}

const HeaderTitleComponent = ({ title, children }: TitleProps) => {
  const { colors } = theme
  const router = useRouter()
  return (
    <>
      <div className="header">
        <div>
          <Typography variant="s2" color={colors.neutrals[400]} className="header__sub__title">
            Suscripción
          </Typography>

          <button type="button" onClick={() => router.back()} className="header__back__arrow">
            <ArrowBackIcon sx={{ fontSize: 37 }} />
          </button>
          <Typography variant="h6" color={colors.primary[500]} className="header__title">
            {title}
          </Typography>
        </div>

        {children && <div className="header__buttons">{children}</div>}
      </div>
      <style jsx>{HeaderTitleStyles}</style>
    </>
  )
}

export default HeaderTitleComponent
