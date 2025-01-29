import styled from "styled-components";

import useCalendarContext from "./useCalendarContext";
import { LeftArrowIcon, LeftTriangle, RightArrowIcon, RightTriangle } from "../../../components/Icons";
import { theme } from "../../../styles/theme";

const CalendarHeader = () => {
  const { dispatch, currentDate } = useCalendarContext();

  return (
    <Container>
      <ChangeButton>
        <button onClick={dispatch.handlePrevYear}>
          <LeftTriangle width={19} height={13} color={theme.colors.accent} />
        </button>
        <span>{currentDate.year}</span>
        <button onClick={dispatch.handleNextYear}>
          <RightTriangle width={19} height={13} color={theme.colors.accent} />
        </button>
      </ChangeButton>
      <ChangeButton>
        <button onClick={dispatch.handlePrevMonth}>
          <LeftArrowIcon width={18} height={9.9} color={theme.colors.accent} />
        </button>
        <span>{currentDate.month}</span>
        <button onClick={dispatch.handleNextMonth}>
          <RightArrowIcon width={18} height={9.9} color={theme.colors.accent} />
        </button>
      </ChangeButton>
    </Container>
  );
};

export default CalendarHeader;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChangeButton = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  font-size: 20px;
  line-height: 25.6px;
`;
