import { useState, useEffect } from 'react'

import { AlertModal } from 'components/atoms/AlertModal/alertModal.component'
import { GroupsByIdResponse, GroupsListResponse } from 'services/models/groups.model'
import { groupsService } from 'services/modules/groups.module'
import { Content } from 'utils/models/modelsBase'

import { useNotification } from '../../../utils/hooks/notification'
import CountryComponent from './formDetailsCountry.component'

type Props = {
  countryId: number
}

const FormDetailsCountryContainer = ({ countryId }: Props) => {
  const [dataApiStore, setDataApiStore] = useState<GroupsByIdResponse>()
  const [dataApiTabs, setDataApiTabs] = useState<Content[]>()
  const [dataApiCountryList, setDataApiCountryList] = useState<GroupsListResponse>()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openDialog, setOpenDialog] = useState(false)
  const [idDelete, setIdDelete] = useState(Number)

  const { onError, onSuccess } = useNotification()

  const [postReq, setPostReq] = useState({
    parentId: countryId,
    pageNumber: 0,
    pageSize: 10,
  })

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPostReq({
      parentId: countryId,
      pageNumber: newPage,
      pageSize: rowsPerPage,
    })
  }

  const handleChangePagination = (rowsPage: number) => {
    setRowsPerPage(rowsPage)
    setPostReq({
      parentId: countryId,
      pageNumber: 0,
      pageSize: rowsPage,
    })
  }

  useEffect(() => {
    async function getFrom() {
      try {
        const [resDataApiCountryList, resDataApiStore, resDataApiTabs] = await Promise.all([
          groupsService.getGroupsList(postReq),
          groupsService.getGroupsById(countryId),
          groupsService.getTranslations(countryId),
        ])

        setDataApiCountryList(resDataApiCountryList.data)
        setDataApiStore(resDataApiStore.data)
        setDataApiTabs(resDataApiTabs.data.content)
      } catch {
        onError('Error al cargar país')
      }
    }
    if (countryId) void getFrom()
  }, [countryId, onError, postReq])

  const deleteCurriculoElement = async (id: number) => {
    try {
      await groupsService.deleteById(id)
      onSuccess('Currículo eliminado correctamente')
      const country = await groupsService.getGroupsList(postReq)
      setDataApiCountryList(country.data)
      setOpenDialog(false)
    } catch {
      onError('Hubo un error al eliminar currículo')
      setOpenDialog(false)
    }
  }
  const totalElements = dataApiCountryList?.totalElements || 0
  const tableSubtitle =
    totalElements === 1 ? '1 currículo cargado' : `${totalElements} currículos cargados`

  return !!dataApiStore && !!dataApiTabs && !!dataApiCountryList ? (
    <>
      <CountryComponent
        serviceCountry={dataApiStore}
        dataTabs={dataApiTabs}
        dataTable={dataApiCountryList}
        onDeleteCountry={(id) => {
          setOpenDialog(true)
          setIdDelete(id)
        }}
        onPageChange={handleChangePage}
        onRowsPaginationChange={handleChangePagination}
        tableSubtitle={tableSubtitle}
        countryId={countryId}
      />
      <AlertModal
        titleText="¿Estás seguro de que deseas eliminar el currículo?"
        subtitleText="Esta acción no puede deshacerse."
        cancelActionText="Cancelar"
        onCancel={() => setOpenDialog(false)}
        continueActionText="Eliminar"
        onContinue={() => void deleteCurriculoElement(idDelete)}
        open={openDialog}
      />
    </>
  ) : null
}
export default FormDetailsCountryContainer
