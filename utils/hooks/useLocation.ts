import { InputSelectOption } from 'components/atoms/inputs/InputSelect/inputSelect.component'
import { CountryResponse } from 'services/models/country/response.model'
import { locationService } from 'services/modules/location.module'

// Types
type Place =
  | CountryResponse['getCities']
  | CountryResponse['getCountrys']
  | CountryResponse['getStates']

// Hook
export const useLocation = () => {
  const convertPlaceToSelectOption = (content: Place): InputSelectOption[] => {
    if (content === undefined) return []
    const options = content.content

    const convertedOptions = options.map(({ id, name }) => ({ id: Number(id), name }))
    return convertedOptions
  }

  const getCountries = async () => {
    const { data } = await locationService.getCountries()

    return convertPlaceToSelectOption(data)
  }

  const getStates = async (countryId: number) => {
    if (!countryId) return []

    const { data } = await locationService.getStates(countryId)

    return convertPlaceToSelectOption(data)
  }

  const getCities = async (stateId: number) => {
    if (!stateId) return []

    const { data } = await locationService.getCities(stateId)

    return convertPlaceToSelectOption(data)
  }

  return {
    getCountries,
    getStates,
    getCities,
  }
}
