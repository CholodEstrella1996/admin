import { TableProps } from '../TableTitle1/tableTitle1.model'
import BasicTableComponent from './basicTable.component'

const BasicTableContainer = ({ ...props }: TableProps) => <BasicTableComponent {...props} />

export default BasicTableContainer
