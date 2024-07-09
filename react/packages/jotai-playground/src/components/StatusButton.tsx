import { useSetAtom } from "jotai";
import { updateCountryAtom } from "../atom";
import { CountryFilter } from "../types";

const StatusButton = ({ id, status }: { id: string; status: CountryFilter }) => {
  const updateCountry = useSetAtom(updateCountryAtom);

  const handleStatusChange = () => {
    updateCountry({ id, status });
  };

  return <button onClick={handleStatusChange}>{status}</button>;
};

export default StatusButton;
