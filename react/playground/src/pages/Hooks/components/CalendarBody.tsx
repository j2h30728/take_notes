import styled from "styled-components";
import useCalendarContext from "./useCalendarContext";

const CalendarBody = () => {
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const { daysInMonth, selectedDate, currentDate } = useCalendarContext();

  return (
    <Container>
      <DayWrapper>
        {weeks.map((week, index) => (
          <CalendarItem $isSunday={index === 0} key={week}>
            {week}
          </CalendarItem>
        ))}
      </DayWrapper>
      <DayWrapper>
        {daysInMonth.map((date) => (
          <Day
            onClick={() => selectedDate.selectDate(date.date)}
            $isCurrentMonth={currentDate.month === date.month}
            $isSelectedDate={selectedDate.date === date.date}
            $isSunday={date.dayIndexOfWeek === 0}
            className={date.month}
            key={date.date}>
            <span>{date.day}</span>
          </Day>
        ))}
      </DayWrapper>
    </Container>
  );
};

export default CalendarBody;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: white;
  padding: 25px 0;
  border-radius: 20px;
`;

const DayWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(50px, 1fr));
  grid-row-gap: 15px;
`;
const CalendarItem = styled.div<{ $isSunday: boolean }>`
  display: flex;
  justify-content: center;
  color: ${({ theme, $isSunday }) => ($isSunday ? theme.colors.error : theme.colors["accent-content"])};
`;

const Day = styled.div<{
  $isCurrentMonth?: boolean;
  $isSelectedDate: boolean;
  $isSunday: boolean;
}>`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ theme, $isCurrentMonth, $isSelectedDate, $isSunday }) =>
    $isSelectedDate
      ? theme.colors["base-100"]
      : !$isCurrentMonth
      ? theme.colors["neutral-content"]
      : $isSunday
      ? theme.colors.error
      : theme.colors["secondary-content"]};
  background-color: ${({ $isSelectedDate, theme }) => ($isSelectedDate ? theme.colors.primary : "transparent")};
`;
