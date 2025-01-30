import styled from "styled-components";
import useInput from "../hooks/useInput";

const Input = () => {
  const maxLengthValidator = (value: string) => value.length <= 10;
  const name = useInput("default name", maxLengthValidator);

  return (
    <div>
      <Label htmlFor="input">
        USE INPUT
        <input id="input" placeholder="Name" onChange={name.onChange} value={name.value} />
      </Label>
      <Value>{name.value}</Value>
    </div>
  );
};

export default Input;

const Label = styled.label`
  display: flex;
  gap: 20px;
`;

const Value = styled.p`
  color: gray;
`;
