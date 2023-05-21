import { useState } from 'react'

import FormNewEditArea from 'components/molecules/FormNewEditArea'
import TableTitle1 from 'components/molecules/TableTitle1'
import { TableProps } from 'components/molecules/TableTitle1/tableTitle1.model'

const FormShowListArea = ({
  title,
  subtitle,
  columns,
  content,
  buttonText,
  onDetails,
  onDelete,
  pageChange,
  rowsPaginationChange,
}: TableProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [editId, setEditId] = useState<number>()
  const [openNewForm, setOpenNewForm] = useState(false)

  const editArea = (id: number) => {
    setEditId(id)
    setOpenNewForm(false)
    setIsOpen(true)
  }

  const onCreate = () => {
    setOpenNewForm(true)
    setIsOpen(true)
  }

  return (
    <>
      <TableTitle1
        title={title}
        subtitle={subtitle}
        buttonText={buttonText}
        columns={columns}
        content={content}
        onClick={onCreate}
        onEdit={editArea}
        onDelete={onDelete}
        onDetails={onDetails}
        pageChange={pageChange}
        rowsPaginationChange={rowsPaginationChange}
      />

      {isOpen && (
        <FormNewEditArea
          isNewForm={openNewForm}
          idEditArea={editId}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default FormShowListArea
