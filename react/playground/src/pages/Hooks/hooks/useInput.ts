import { useState } from "react";

const useInput = (initialValue: string, validator: (value: string) => boolean) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof validator !== "function") {
      return;
    }
    let willUpdate = false;
    const { value } = event.target;
    if (validator(value)) {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  };

  return { value, onChange };
};

export default useInput;
