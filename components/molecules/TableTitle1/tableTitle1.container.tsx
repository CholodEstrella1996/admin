import TableTitle1Component from './tableTitle1.component'
import { TableProps } from './tableTitle1.model'

const TableTitle1Container = ({ ...props }: TableProps) => <TableTitle1Component {...props} />

export default TableTitle1Container
