import { GATEWAY_PLACE_SERVICE } from 'constants/api.constants'
import api from 'services/api.client'
import { CountryResponse } from 'services/models/country/response.model'

export const locationService = {
  getCountries: () => api.get<CountryResponse['getCountrys']>(`${GATEWAY_PLACE_SERVICE}/countries`),

  getStates: (id: number) =>
    api.get<CountryResponse['getStates']>(`${GATEWAY_PLACE_SERVICE}/countries/${id}/states`),

  getCities: (id: number) =>
    api.get<CountryResponse['getCities']>(`${GATEWAY_PLACE_SERVICE}/states/${id}/cities`),
}
