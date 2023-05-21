import theme, { ThemeProvider } from '@folcode/clabs.others.theme-provider'
import { Modal } from '@mui/material'

import Spinner from 'components/atoms/Spinner'

const { colors } = theme

type LoadingModalProps = {
  message?: string
}

const LoadingModal = ({ message }: LoadingModalProps) => (
  <Modal open onClose={() => {}}>
    <div>
      <ThemeProvider>
        <div className="container">
          <div className="spinner-container">
            <Spinner withMessage message={message} />
          </div>
        </div>

        <style jsx>{`
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            user-select: none;
          }

          .spinner-container {
            display: flex;
            flex-direction: column;
            margin: auto;
            background-color: ${colors.neutrals[50]};
            border-radius: 1.5rem;
            width: 30vw;
            height: 30vh;
          }
        `}</style>
      </ThemeProvider>
    </div>
  </Modal>
)

export default LoadingModal
