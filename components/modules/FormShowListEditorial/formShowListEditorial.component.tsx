import TableTitle1 from 'components/molecules/TableTitle1'
import { TableProps } from 'components/molecules/TableTitle1/tableTitle1.model'

const FormShowListEditorialComponent = ({
  title,
  subtitle,
  onClick,
  content,
  columns,
  buttonText,
  onEdit,
  onDelete,
  onDetails,
  pageChange,
  rowsPaginationChange,
}: TableProps) => (
  <TableTitle1
    title={title}
    subtitle={subtitle}
    buttonText={buttonText}
    content={content}
    onClick={onClick}
    columns={columns}
    onEdit={onEdit}
    onDelete={onDelete}
    onDetails={onDetails}
    pageChange={pageChange}
    rowsPaginationChange={rowsPaginationChange}
  />
)

export default FormShowListEditorialComponent
