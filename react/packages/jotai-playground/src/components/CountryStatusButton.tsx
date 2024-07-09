import { CountryFilter } from "../types";
import StatusButton from "./StatusButton";

const allStatus: CountryFilter[] = ["LIKE", "WANT", "WENT"];

const CountryStatusButton = ({ id, currentStatus }: { id: string; currentStatus: CountryFilter }) => {
  return (
    <>
      {allStatus
        .filter((status) => status !== currentStatus)
        .map((status) => (
          <StatusButton key={status} id={id} status={status} />
        ))}
    </>
  );
};

export default CountryStatusButton;
