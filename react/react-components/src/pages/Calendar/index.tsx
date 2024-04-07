import styled from "styled-components";
import Calendar from "./components/index";

const CalendarComponents = () => {
  return (
    <Container>
      <Title>달력</Title>
      <Calendar>
        <Calendar.Header />
        <Calendar.Body />
        <Calendar.Footer />
      </Calendar>
    </Container>
  );
};

export default CalendarComponents;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.xl};
`;

const Container = styled.div`
  width: 500px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
