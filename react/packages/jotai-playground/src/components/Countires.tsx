import { useAtom } from "jotai";
import { CountryFilter } from "../types";
import { countriesAtom } from "../atom";
import CountryStatusButton from "./CountryStatusButton";

const Countries = ({ filter }: { filter: CountryFilter }) => {
  const [countries] = useAtom(countriesAtom);

  return (
    <ul>
      {countries
        .filter((country) => country.status === filter)
        .map((country) => (
          <li key={country.id}>
            <span>{country.name}</span>
            <CountryStatusButton id={country.id} currentStatus={filter} />
          </li>
        ))}
    </ul>
  );
};
export default Countries;
