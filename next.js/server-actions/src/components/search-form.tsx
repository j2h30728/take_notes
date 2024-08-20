import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import FormInput from "./form-input";
import FormButton from "./form-button";

export default function SearchForm() {
  const action = () => {};
  // const [] = useFormState();

  return (
    <form action={action} className="flex comment-form gap-3">
      <FormInput
        label={<MagnifyingGlassIcon className="size-6" />}
        name="search"
        type="text"
        placeholder="검색할 내용을 입력해주세요."
        required
      />
      <FormButton text="검색" />
    </form>
  );
}
