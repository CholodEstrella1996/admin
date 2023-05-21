import { GATEWAY_ACCOUNTING_SERVICE, GATEWAY_CUSTOMER_SERVICE } from 'constants/api.constants'
import api from 'services/api.client'
import { CreateSuscription, SubscriptionRequest } from 'services/models/subscriptions/request.model'
import { InvoicingKind, SubscriptionsResponse } from 'services/models/subscriptions/response.model'

export type GetSubscriptionsParams = {
  pageSize?: number
  pageNumber?: number
  status?: string
  searchQuery?: string
  countryId?: number
  kind?: string
  clientKind?: string
  support?: string
  lti?: boolean
}

export const subscriptionsService = {
  getSubscriptions: (params: GetSubscriptionsParams) =>
    api.get<SubscriptionsResponse['getSubscriptions']>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions`,
      { params: { ...params, searchQuery: params.searchQuery || undefined } },
    ),

  getSubscriptionsLmsLti: (params: GetSubscriptionsParams) =>
    api.get<SubscriptionsResponse['getSubscriptionLmsLti']>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions`,
      { params: { ...params, searchQuery: params.searchQuery || undefined } },
    ),

  deleteSubscription: (id: number) =>
    api.delete<SubscriptionsResponse['getSubscriptions']>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions/${id}`,
    ),

  getInvoicingKind: () =>
    api.get<InvoicingKind>(`${GATEWAY_ACCOUNTING_SERVICE}/invoicing-data/kinds`),

  getSubcriptionKind: (id: number, params: GetSubscriptionsParams) =>
    api.get<SubscriptionsResponse['getSubscriptionKinds']>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions/kinds/${id}`,
      { params },
    ),

  getSubcriptionStatus: () =>
    api.get<SubscriptionsResponse['getKinds']>(`${GATEWAY_CUSTOMER_SERVICE}/subscriptions/status`),

  getSubscription: (id: number) =>
    api.get<SubscriptionsResponse['getSubscription']>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions/${id}`,
    ),

  getInvoincing: (id: number) =>
    api.get<SubscriptionsResponse['getBilling']>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions/${id}/invoicing-data`,
    ),

  getPackages: (id: number) =>
    api.get<SubscriptionsResponse['getPackages']>(
      `${GATEWAY_CUSTOMER_SERVICE}/packages/${id}/packages/list-by-kind`,
    ),

  getKinds: () =>
    api.get<SubscriptionsResponse['getKinds']>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions/kinds/all`,
    ),

  getStatus: () =>
    api.get<SubscriptionsResponse['getStatus']>(`${GATEWAY_CUSTOMER_SERVICE}/subscriptions/status`),

  putStatus: (id: number, status: { status: string }) =>
    api.put<SubscriptionsResponse['getStatus']>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions/${id}/status`,
      status,
    ),

  getSubscriptionDraft: (body: SubscriptionRequest['getSubscriptionDraft']) =>
    api.post<SubscriptionsResponse['getSubscriptionDraft']>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions/draft`,
      body,
    ),

  postSubscription: (body: SubscriptionRequest['postSubscription']) =>
    api.post<SubscriptionsResponse['postSubscription']>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions`,
      body,
    ),

  putSubscription: (id: number, body: SubscriptionRequest['postSubscription']) =>
    api.put<SubscriptionsResponse['postSubscription']>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions/${id}`,
      body,
    ),
  postSubscriptionClassRoom: (body: CreateSuscription) =>
    api.post<SubscriptionsResponse['postSubscription']>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions`,
      body,
    ),

  putSubscriptionClassRoom: (id: number, body: CreateSuscription) =>
    api.put<SubscriptionsResponse['postSubscription']>(
      `${GATEWAY_CUSTOMER_SERVICE}/subscriptions/${id}`,
      body,
    ),
}
