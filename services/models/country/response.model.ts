import { City, Country, State } from 'utils/models/country.models'
import { Pagination } from 'utils/models/modelsBase'

export type CountryResponse = {
  getCountrys: GetCountries
  getStates: GetStates
  getCities: GetCities
}

type GetCountries = Pagination & {
  content: Country[]
}
type GetStates = Pagination & {
  content: State[]
}
type GetCities = Pagination & {
  content: City[]
}
