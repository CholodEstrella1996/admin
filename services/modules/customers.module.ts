import { GATEWAY_CUSTOMER_SERVICE, GATEWAY_USER_SERVICE } from 'constants/api.constants'
import api from 'services/api.client'
import { CustomerRequest, InvoicingDataRequest } from 'services/models/customers/request.model'
import { CustomerResponse } from 'services/models/customers/response.model'
import { SubscriptionsResponse } from 'services/models/subscriptions/response.model'
import convertToMultipart from 'utils/helpers/convertToMultipart'
import { downloadBlob } from 'utils/helpers/downloadBlob'

export type CustomerParams = {
  pageNumber?: number
  pageSize?: number
  kind?: string
  category?: string
  countryId?: number
  searchQuery?: string
  ga?: boolean
  institution?: boolean
}

export const customerService = {
  getCustomers: (params: CustomerParams) =>
    api.get<CustomerResponse['getCustomers']>(`${GATEWAY_CUSTOMER_SERVICE}/customers`, {
      params: { ...params, searchQuery: params.searchQuery || undefined },
    }),
  getCustomer: (id: number) =>
    api.get<CustomerResponse['getCustomer']>(`${GATEWAY_CUSTOMER_SERVICE}/customers/${id}`),

  getKinds: () =>
    api.get<CustomerResponse['getKinds']>(`${GATEWAY_CUSTOMER_SERVICE}/customers/kinds`),

  getStatus: (params?: CustomerParams) =>
    api.get<CustomerResponse['getKinds']>(`${GATEWAY_CUSTOMER_SERVICE}/subscriptions/status`, {
      params,
    }),

  getCustomerList: (params: CustomerParams) =>
    api.get<CustomerResponse['getCustomerList']>(`${GATEWAY_CUSTOMER_SERVICE}/customers/list`, {
      params,
    }),

  getsCustomerListClassroom: () =>
    api.get<CustomerResponse['getCustomerList']>(
      `${GATEWAY_CUSTOMER_SERVICE}/customers/list?institution=true&ga=true`,
    ),

  getIdentityType: () =>
    api.get<CustomerResponse['getIdentity']>(`${GATEWAY_USER_SERVICE}/identity-types`),

  getSubscriptions: (id: number, params?: CustomerParams) =>
    api.get<CustomerResponse['getCustomerSuscription']>(
      `${GATEWAY_CUSTOMER_SERVICE}/customers/${id}/subscriptions`,
      { params },
    ),

  getSubscriptionsClassRoom: (id: number, params?: CustomerParams) =>
    api.get<CustomerResponse['getCustomerSuscriptionClassRoom']>(
      `${GATEWAY_CUSTOMER_SERVICE}/customers/${id}/subscriptions`,
      { params },
    ),

  getSubscriptionLatestActive: (id: number) =>
    api.get<SubscriptionsResponse['getSubscription']>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions/latest-active/${id}`,
    ),

  getPackageDetail: (id: number) =>
    api.get<CustomerResponse['getPackageDetail']>(
      `${GATEWAY_CUSTOMER_SERVICE}/packages/${id}/detail`,
    ),

  createCustomer: (body: CustomerRequest['createCustomer']) =>
    api.post<CustomerResponse['createCustomer']>(
      `${GATEWAY_CUSTOMER_SERVICE}/customers`,
      convertToMultipart(body),
    ),

  updateCustomer: (id: number, body: CustomerRequest['updateCustomer']) =>
    api.put<CustomerResponse['updateCustomer']>(
      `${GATEWAY_CUSTOMER_SERVICE}/customers/${id}`,
      convertToMultipart(body),
    ),

  deleteCustomer: (id: number) =>
    api.delete<CustomerResponse['deleteCustomer']>(`${GATEWAY_CUSTOMER_SERVICE}/customers/${id}`),

  postInvoicingData: (id: number, body: InvoicingDataRequest) =>
    api.post<CustomerResponse['getCustomerInvoicing']>(
      `${GATEWAY_CUSTOMER_SERVICE}/customers/${id}/invoicing-data/draft`,
      body,
    ),
  downloadSubscriptionProducts: async (id: number) => {
    const { data } = await api.get<Blob>(`${GATEWAY_CUSTOMER_SERVICE}/subscriptions/${id}/pdf`, {
      responseType: 'blob',
    })
    downloadBlob(data, 'technicalDetails', 'pdf')
  },
  downloadSubscriptionList: async (type: string, params?: CustomerParams) => {
    const { data } = await api.get<Blob>(`${GATEWAY_CUSTOMER_SERVICE}/subscriptions/excel`, {
      params,
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      responseType: 'blob',
    })
    downloadBlob(data, `Lista de Suscripciones ${type}`, 'xlsx')
  },
  downloadCustomerList: async (params?: CustomerParams) => {
    const { data } = await api.get<Blob>(`${GATEWAY_CUSTOMER_SERVICE}/customers/excel`, {
      params,
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      responseType: 'blob',
    })
    downloadBlob(data, 'Lista de clientes', 'xlsx')
  },
}
