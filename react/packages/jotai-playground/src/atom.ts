import { atom } from "jotai";
import { Country, CountryFilter } from "./types";
import { atomWithStorage } from "jotai/utils";

export const countriesAtom = atomWithStorage<Country[]>("countries", []);

export const addCountryAtom = atom(null, (get, set, country: Country) => {
  const countries = get(countriesAtom);
  const isExist = countries.find((existedCountry) => existedCountry.name === country.name);
  if (isExist) {
    throw new Error("이미 등록한 나라입니다.");
  }
  console.log(country.id);
  const updatedCountries = [...countries, country];
  set(countriesAtom, updatedCountries);
});

export const updateCountryAtom = atom(null, (get, set, { id, status }: { id: string; status: CountryFilter }) => {
  const countries = get(countriesAtom);
  const updatedCountries = countries.map((country) => (country.id === id ? { ...country, status } : country));
  set(countriesAtom, updatedCountries);
});
