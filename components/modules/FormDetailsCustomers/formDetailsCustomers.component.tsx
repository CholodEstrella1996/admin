import { useState } from 'react'

import { Button } from '@folcode/clabs.atoms.button'
import { Typography } from '@folcode/clabs.atoms.typography'
import { DropDownCard1 } from '@folcode/clabs.molecules.drop-down-card1'
import theme from '@folcode/clabs.others.theme-provider'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

import { CustomerForm } from 'components/molecules/FormNewEditCustomers'
import { SubscriptionForm } from 'components/molecules/forms/newAndEdit/Subscription'
import { InstitutionSelector } from 'components/molecules/InstitutionSelector'
import { ProgressBar } from 'components/molecules/ProgressBar'
import { ClassroomResponse } from 'services/models/classroom/response.model'
import { AnyCustomer, CustomerResponse } from 'services/models/customers/response.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import { CustomerParams } from 'services/modules/customers.module'

import { AssociatedInstitutions } from './components/associatedInstitutions.component'
import { OrganizationDetails } from './components/organizationDetails.components.component'
import TableSubscriptions, { DataRow } from './components/tableSubscriptions.component'
import { UserDetails } from './components/userDetails.components.component'
import {
  FormDetailCustomerGlobalStyles,
  FormDetailCustomerLocalStyles,
} from './formDetailsCustomers.styles'

const { colors } = theme

const formatData = (content: CustomerResponse['getCustomerSuscription']) => {
  const newData: DataRow[] = content.content.map((item) => ({
    id: item.id.toString(),
    code: item.code,
    type: item.kind.displayName,
    endDate: dayjs(item.endDate).isValid() ? dayjs(item.endDate).format('DD/MM/YYYY') : null,
    state: item.status,
  }))
  return newData
}

export type FormDetailCustomerProps = {
  data: {
    dataCustomer: AnyCustomer
    subscriptionData?: SubscriptionsResponse['getSubscription']
    organizationKind?: ClassroomResponse['getOrganizations']
    idOrganization?: number
  }

  dataSuscription?: {
    dataTable?: CustomerResponse['getCustomerSuscription']
    subtitles?: string
  }

  onDeleteCustomer: (id: number) => void
  onChangeFilters: (filters: CustomerParams) => void
  idCustomer: number
}

const FormDetailCustomerComponent = ({
  data,
  dataSuscription,
  onDeleteCustomer,

  onChangeFilters,
  idCustomer,
}: FormDetailCustomerProps) => {
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isOpenSuscr, setIsOpenSuscr] = useState(false)
  const { dataCustomer, organizationKind, idOrganization, subscriptionData } = data
  const [showModal, setShowModal] = useState(false)
  const [filters] = useState({
    pageNumber: 0,
    pageSize: 10,
  })

  const router = useRouter()

  const hasSubscriptionActive = dataSuscription?.dataTable?.content.find(
    (x) => x.status.name === 'active',
  )

  const userCount = subscriptionData?.userCount ?? 0

  return (
    <>
      <section className="formDetail__container">
        <section>
          <Button
            type="button"
            size="medium"
            variant="contained"
            className="header_button__edit"
            onClick={() => setIsOpenForm(true)}>
            Editar
          </Button>

          <Typography variant="s2" color={colors.neutrals[400]} className="header_label__title">
            {dataCustomer.displayName}
          </Typography>

          <button
            type="button"
            onClick={() => void router.push(`/customer`)}
            className="formDetail__customer__back__arrow">
            <ArrowBackIcon sx={{ fontSize: 37 }} />
          </button>

          <Typography
            variant="h5"
            color={colors.primary[500]}
            weight="bold"
            className="headerLabel__sub__title">
            {dataCustomer.kind === 'government' || dataCustomer.kind === 'institution'
              ? `${dataCustomer.organization.name}`
              : `${dataCustomer.user.firstName} ${dataCustomer.user.surname}`}
          </Typography>

          <div className="formDetail__user__actions">
            <Typography variant="s1" color={colors.primary[500]}>
              Acciones
            </Typography>

            {dataCustomer.kind === 'institution' && hasSubscriptionActive && (
              <button
                type="button"
                onClick={() => void router.push(`${idCustomer}/members`)}
                className="subs__button__actions">
                <Typography variant="s2" color={colors.primary[500]}>
                  Administrar usuarios relacionados
                </Typography>
              </button>
            )}

            {dataCustomer.kind === 'parent' && hasSubscriptionActive && (
              <button
                type="button"
                onClick={() => void router.push(`${idCustomer}/members`)}
                className="subs__button__actions">
                <Typography variant="s2" color={colors.primary[500]}>
                  Administrar Hijos
                </Typography>
              </button>
            )}

            <button
              type="button"
              onClick={() => onDeleteCustomer(dataCustomer.id)}
              className="formDetail__button__delete">
              <Typography variant="s2" color={colors.semantic.danger}>
                Eliminar cliente
              </Typography>
            </button>
          </div>

          {/* Sección detalles de usuario y organización */}
          {(dataCustomer.kind === 'government' || dataCustomer.kind === 'institution') && (
            <OrganizationDetails
              organization={dataCustomer.organization}
              kind={dataCustomer.kind}
            />
          )}

          {/* Sección detalles de usuario */}
          {dataCustomer.user && <UserDetails dataUser={dataCustomer} />}

          {/* Sección barra de progreso */}
          {(dataCustomer.kind === 'institution' || dataCustomer.kind === 'parent') &&
            hasSubscriptionActive &&
            userCount > 0 && (
              <div className="user__container">
                <DropDownCard1 title="Usuarios" colorTitle={colors.primary[500]} isOpen>
                  <div className="progress__installs">
                    <ProgressBar
                      progress={{
                        used: Number(subscriptionData?.activeMembers) ?? 0,
                        guest: Number(subscriptionData?.activeInvites) ?? 0,
                        available:
                          Number(subscriptionData?.userCount) -
                            (Number(subscriptionData?.activeMembers) +
                              Number(subscriptionData?.activeInvites)) ?? 0,
                        installation: Number(subscriptionData?.userCount) ?? 0,
                        textBadge: ['Registrados', 'Disponibles', 'Incluidos', 'Invitados'],
                      }}
                    />
                  </div>
                </DropDownCard1>
              </div>
            )}

          {/* Sección Tabla de suscripciones */}
          {dataCustomer.kind !== 'government' && dataSuscription?.dataTable && (
            <div className="user__container">
              <div className="subscription__padding">
                <Button
                  className="header_button__edit"
                  onClick={() => setIsOpenSuscr(true)}
                  icon={<AddIcon sx={{ fontSize: 30 }} />}
                  size="medium">
                  Agregar suscripción
                </Button>

                <div className="subscription__title">
                  <Typography color={colors.primary[500]} variant="h5" weight="bold">
                    Suscripciones
                  </Typography>
                </div>
                <Typography
                  color={colors.neutrals[400]}
                  className="countryName__subtitle"
                  variant="s1">
                  {dataSuscription?.subtitles}
                </Typography>
              </div>

              <div className="subscription__padding">
                <TableSubscriptions
                  rows={formatData(dataSuscription.dataTable)}
                  pageSize={dataSuscription.dataTable.size}
                  activePage={dataSuscription.dataTable.number}
                  totalElements={dataSuscription.dataTable.totalElements}
                  pageChange={(newPage: number) =>
                    onChangeFilters({ ...filters, pageNumber: newPage })
                  }
                />
              </div>
            </div>
          )}
        </section>
        {dataCustomer.kind === 'government' && (
          <div className="subs__container subs__client">
            <div className="subs__client__data selected__texts">
              <Typography variant="s1" color={colors.primary[500]}>
                Instituciones asociadas
              </Typography>
              <Button
                type="button"
                size="small"
                variant="contained"
                className="header_button__edit"
                onClick={() => setShowModal(true)}>
                Editar
              </Button>
              {showModal && (
                <InstitutionSelector
                  onClose={() => setShowModal(false)}
                  organizationId={idOrganization !== undefined ? idOrganization : 0}
                  customerId={dataCustomer.id}
                />
              )}
            </div>
            <AssociatedInstitutions
              listByOrganization={organizationKind !== undefined ? organizationKind : []}
            />
          </div>
        )}
      </section>

      {isOpenForm && (
        <CustomerForm
          isNewForm={false}
          onClose={() => setIsOpenForm(false)}
          idCustomer={dataCustomer.id}
        />
      )}

      {isOpenSuscr && (
        <SubscriptionForm isNewForm onClose={() => setIsOpenSuscr(false)} idCustomer={idCustomer} />
      )}

      <style jsx>{FormDetailCustomerLocalStyles}</style>
      <style jsx global>
        {FormDetailCustomerGlobalStyles}
      </style>
    </>
  )
}
export default FormDetailCustomerComponent
