import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import BasicTable from '../Table'
import { TableProps } from './tableTitle1.model'
import { TableTitleGlobalStyles, TableTitleStyles } from './tableTitle1.styles'

const TableTitle1Component = ({
  title,
  subtitle,
  buttonText,
  onClick,
  content,
  columns,
  onDelete,
  onDetails,
  onEdit,
  activePage,
  pageChange,
  rowsPaginationChange,
  colorArea,
}: TableProps) => {
  const { colors } = theme
  return (
    <>
      <div className="tableTitle_container">
        <div className="titleButton_container">
          <Typography variant="h5" color={colors.primary[500]} weight="bold">
            {title}
          </Typography>
          {buttonText && (
            <Button
              size="medium"
              className="titleButton"
              onClick={onClick}
              icon={<AddOutlinedIcon />}>
              {buttonText}
            </Button>
          )}
        </div>
        {subtitle && (
          <Typography variant="s1" color={colors.neutrals[400]}>
            {subtitle}
          </Typography>
        )}
        <div className="tableContainer">
          <BasicTable
            columns={columns}
            content={content}
            onEdit={onEdit}
            onDelete={onDelete}
            onDetails={onDetails}
            activePage={activePage}
            pageChange={pageChange}
            rowsPaginationChange={rowsPaginationChange}
            colorArea={colorArea}
          />
        </div>
      </div>
      <style jsx>{TableTitleStyles}</style>
      <style jsx global>
        {TableTitleGlobalStyles}
      </style>
    </>
  )
}

export default TableTitle1Component
