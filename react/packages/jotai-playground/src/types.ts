export type CountryFilter = "WANT" | "WENT" | "LIKE";

export interface Country {
  name: string;
  status: CountryFilter;
  id: string;
}
