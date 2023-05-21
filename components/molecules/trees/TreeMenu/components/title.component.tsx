import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { useRouter } from 'next/router'

import { useTreeMenuContext } from 'utils/contexts/treeMenu.context'

const { colors } = theme

export type TitleProps = {
  label: string
  link: string
}

export const Title = ({ link, label }: TitleProps) => {
  const router = useRouter()

  const { setSelectedNode } = useTreeMenuContext()

  const handleClick = () => {
    void router.push(link)
    setSelectedNode(null)
  }

  return (
    <div className="title">
      <button type="button" onClick={handleClick} className="button">
        <Typography variant="s1" color={colors.primary[500]}>
          {label}
        </Typography>
      </button>

      <style jsx>{`
        .title {
          padding: 0.5rem 1rem;
          margin-bottom: 1rem;
          text-transform: capitalize;
        }

        .button {
          all: unset;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
