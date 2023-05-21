export type Country = {
  id: string
  name: string
  iso3: string
  iso2: string
  numericCode: string
  phoneCode: string
  capital: string
  currency: string
  currencyName: string
  currencySymbol: string
  tld: string
  region: string
  subregion: string
  latitude: number
  longitude: number
  emoji: string
  emojiU: string
  native: null | string
  timezones: Timezones
}

type Timezones = {
  zoneName: string
  gmtOffset: string
  gmtOffsetName: string
  abbreviation: string
  tzName: string
}

export type State = {
  id: number
  name: string
  countryId: number
  countryCode: string
  countryName: string
  stateCode: string
  latitude: number
  longitude: number
}

export type City = {
  id: number
  name: string
  stateId: number
  stateCode: string
  stateName: string
  countryId: number
  countryCode: string
  countryName: string
  latitude: number
  longitude: number
  wikiDataId: string
}
