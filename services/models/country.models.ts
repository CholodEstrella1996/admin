export type Country = {
  id: number
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
