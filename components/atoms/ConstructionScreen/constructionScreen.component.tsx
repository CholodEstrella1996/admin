/* eslint-disable @next/next/no-img-element */
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'

export const ConstructionScreen = () => (
  <>
    <div className="container_build">
      <img
        src="https://cdn.discordapp.com/attachments/882961326194954280/1047128829006729226/Group_89.png"
        alt="img"
      />
      <div className="title_build">
        <Typography color={theme.colors.primary[500]} variant="h1">
          Función no disponible
        </Typography>
        <Typography color={theme.colors.neutrals[600]} variant="h5">
          Aún estamos trabajando en esta funcionalidad, en el futuro podrás utilizarla.
        </Typography>
      </div>
    </div>
    <style jsx>{`
      .container_build {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        height: 35rem;
      }
      .title_build {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
        width: 35%;
      }
    `}</style>
  </>
)
