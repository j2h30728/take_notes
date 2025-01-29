import styled from "styled-components";

const HooksComponents = () => {
  return (
    <>
      <Title>Hooks</Title>
      <Body>내용</Body>
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
  justify-content: center;
  align-items: center;
`;
