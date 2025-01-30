import styled from "styled-components";
import Input from "./components/Input";
import Tabs from "./components/Tabs";
import useTitle from "./hooks/useTitle";
import ClickButton from "./components/ClickButton";

const HooksComponents = () => {
  const titleUpdate = useTitle("Loading...");
  setTimeout(() => titleUpdate("hooks"), 5000);

  return (
    <>
      <Title>Hooks</Title>
      <Body>
        <Input />
        <Tabs />
        <ClickButton />
      </Body>
    </>
  );
};

export default HooksComponents;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.xl};
`;

const Body = styled.div`
  width: 500px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 20px;

  & > div {
    border: 1px solid gray;
    padding: 10px;
    border-radius: 10px;
  }
`;
