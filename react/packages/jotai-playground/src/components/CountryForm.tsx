import { useSetAtom } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";
import { addCountryAtom } from "../atom";
import { Country } from "../types";

const CountryForm = () => {
  const addCountry = useSetAtom(addCountryAtom);

  const { register, handleSubmit, setValue } = useForm<Country>();
  const onSubmit: SubmitHandler<Country> = (data) => {
    addCountry({ name: data.name, status: "WANT", id: data.name + Date.now().toString() });
    setValue("name", "");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} />
      <button>가자!</button>
    </form>
  );
};

export default CountryForm;
