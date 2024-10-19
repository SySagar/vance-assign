import { create } from 'zustand'

type CountryInfo = {
  countryCode: string
  name: string
  flagImage: string
}

export type CountryState = {
  countryInfo: CountryInfo
  setCountryInfo: (countryCode: string, flagImage: string, name:string) => void
  reset: () => void
}

const useCountry = create<CountryState>((set) => ({
  countryInfo: { countryCode: '', flagImage: '',name:'' },
  setCountryInfo: (countryCode: string, flagImage: string, name: string) =>
    set({ countryInfo: { countryCode, flagImage, name } }),
  reset: () => set({ countryInfo: { countryCode: '', flagImage: '', name:'' } })
}))

export default useCountry;
