import styled from "styled-components";
import useTab, { contents } from "../hooks/useTab";

const Tabs = () => {
  const tab = useTab(0, contents);

  return (
    <ButtonsContainer>
      <Buttons>
        {contents.map((content, index) => (
          <button key={JSON.stringify(content)} onClick={() => tab.changeItem(index)}>
            {content.tab}
          </button>
        ))}
      </Buttons>
      <div>{tab.currentItem.content}</div>
    </ButtonsContainer>
  );
};

export default Tabs;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Buttons = styled.div`
  display: flex;
  gap: 10px;

  & > button {
    border: 1px dashed gray;
    padding: 2px;
  }
`;
