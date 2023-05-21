import HeaderTitleComponent from './headerTitle.component'

type TitleProps = {
  title: string
  children?: React.ReactNode
}
const HeaderTitleContainer = ({ title, children }: TitleProps) => (
  <HeaderTitleComponent title={title}>{children}</HeaderTitleComponent>
)

export default HeaderTitleContainer
