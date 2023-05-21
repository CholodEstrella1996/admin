/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import FormNewEditCountry from 'components/molecules/FormNewEditCountry'
import { GroupsListResponse } from 'services/models/groups.model'
import { groupsService } from 'services/modules/groups.module'
import { useNotification } from 'utils/hooks/notification'

import FormShowListCountry from './formShowListCountry.component'

export const FormShowListCountryContainer = () => {
  const [isOpenCountry, setIsOpenCountry] = useState(false)
  const [openNewForm, setOpenNewForm] = useState(false)
  const [idCountry, setIdCountry] = useState<number>()
  const [dataCountry, setDataCountry] = useState<GroupsListResponse>()
  const [openDialog, setOpenDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(Number)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [postReq, setPostReq] = useState({
    pageNumber: 0,
    pageSize: 10,
  })

  const { onError, onSuccess } = useNotification()
  const router = useRouter()

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPostReq({
      pageNumber: newPage,
      pageSize: rowsPerPage,
    })
  }
  const handleChangePagination = (rowsPage: number) => {
    setRowsPerPage(rowsPage)
    setPostReq({
      pageNumber: 0,
      pageSize: rowsPage,
    })
  }

  useEffect(() => {
    const getCountryApiData = async () => {
      try {
        const respApiCountry = await groupsService.getGroupsList({ kind: 'country', ...postReq })
        setDataCountry(respApiCountry.data)
      } catch {
        onError('Error al cargar los datos de países')
      }
    }
    void getCountryApiData()
  }, [postReq])

  const amountCountrysLoaded =
    dataCountry !== undefined && dataCountry.content ? dataCountry.totalElements : 0
  const subtitle =
    amountCountrysLoaded === 1 ? '1 país cargado' : `${amountCountrysLoaded} países cargados`

  const handleDeleteCountry = async (id: number) => {
    try {
      await groupsService.deleteById(id)
      onSuccess('País eliminado correctamente')
      setOpenDialog(false)
      void router.push(`/country`)
    } catch {
      onError('Hubo un error al eliminar país')
      setOpenDialog(false)
    }
  }
  return (
    <>
      <FormShowListCountry
        title="Países"
        subtitle={subtitle}
        buttonText="Agregar nuevo país"
        onClick={() => {
          setIsOpenCountry(true)
          setOpenNewForm(true)
        }}
        onEdit={(id) => {
          setIsOpenCountry(true)
          setOpenNewForm(false)
          setIdCountry(id)
        }}
        onDelete={(id) => {
          setOpenDialog(true)
          setIdDelete(id)
        }}
        onDetails={(id: number) => {
          void router.push(`/country/${id}`)
        }}
        content={dataCountry}
        columns={[
          { id: 'iconUrl', label: '', width: '5%' },
          { id: 'name', label: 'Nombre', width: '80%' },
        ]}
        pageChange={handleChangePage}
        rowsPaginationChange={handleChangePagination}
      />

      <AlertModal
        titleText="¿Estás seguro de que deseas eliminar el país?"
        subtitleText="Esta acción no puede deshacerse."
        cancelActionText="Cancelar"
        onCancel={() => setOpenDialog(false)}
        continueActionText="Eliminar"
        onContinue={() => void handleDeleteCountry(idDelete)}
        open={openDialog}
      />

      {isOpenCountry && (
        <FormNewEditCountry
          isNewForm={openNewForm}
          countryId={idCountry}
          onClose={() => setIsOpenCountry(false)}
        />
      )}
    </>
  )
}
