import styled from "styled-components";
import { getRandomColor } from "./utils";
import { createElement, MouseEvent, useCallback, useEffect, useRef, useState } from "react";

export const COMPONENTS = {
  Div: "div",
  Span: "span",
  Paragraph: "p",
} as const;

export type ElementType = (typeof COMPONENTS)[keyof typeof COMPONENTS];

export interface Item {
  id: number;
  type: ElementType | "group";
  color: string;
  children?: number[];
  style?: React.CSSProperties;
  parent?: number;
}

const initialItems: Item[] = [
  { id: 0, type: "div", color: getRandomColor() },
  { id: 1, type: "div", color: getRandomColor() },
];

export default function DragAndDrop() {
  const [items, setItems] = useState(initialItems);
  const [selectedIds, setSelectedIds] = useState(new Set<number>());
  const [isAllVertically, setIsAllVertically] = useState(true);
  const [isGroupVertically, setIsGroupVertically] = useState(true);
  const [draggedId, setDraggedId] = useState<number | null>(null);

  const ctrlPressedRef = useRef(false);
  const shiftPressedRef = useRef(false);

  const groupSelectedElements = useCallback(() => {
    if (selectedIds.size < 2) return;

    const groupId = Date.now();
    const childIds = Array.from(selectedIds);

    const groupItem: Item = {
      id: groupId,
      type: "group",
      children: childIds,
      color: getRandomColor(),
      style: {
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        border: "2px dashed gray",
      },
    };

    setItems((prev) => {
      const updatedItems = prev.map((item) => {
        if (childIds.includes(item.id)) {
          return {
            ...item,
            parent: groupId,
            style: {
              ...item.style,
              position: "absolute" as React.CSSProperties["position"], // 그룹 내부에서 상대 위치
            },
          };
        }
        return item;
      });

      return [...updatedItems, groupItem];
    });

    setSelectedIds(new Set([groupId]));
  }, [selectedIds]);

  const ungroupSelectedElements = useCallback(() => {
    setItems((prev) => {
      let newItems = [...prev];
      const groups = newItems.filter((item) => item.type === "group" && selectedIds.has(item.id));

      groups.forEach((group) => {
        if (group.children && group.children.length > 0) {
          newItems = newItems.map((item) => {
            if (group.children?.includes(item.id)) {
              return { ...item, parent: undefined };
            }
            return item;
          });
          newItems = newItems.filter((i) => i.id !== group.id);
        }
      });

      return newItems;
    });
  }, [selectedIds]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") shiftPressedRef.current = true;
      if (e.key === "Control") ctrlPressedRef.current = true;
      console.log(e);

      if (ctrlPressedRef.current && e.code === "KeyG" && !shiftPressedRef.current) {
        groupSelectedElements();
      }

      if (ctrlPressedRef.current && shiftPressedRef.current && e.code === "KeyG") {
        ungroupSelectedElements();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") shiftPressedRef.current = false;
      if (e.key === "Control") ctrlPressedRef.current = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [groupSelectedElements, ungroupSelectedElements]);

  const handleChangeVertically = () => {
    setIsAllVertically(true);
  };
  const handleChangeHorizontally = () => {
    setIsAllVertically(false);
  };
  const handleChangeGroupVertically = () => {
    setIsGroupVertically(true);
  };
  const handleChangeGroupHorizontally = () => {
    setIsGroupVertically(false);
  };

  const handleAdd = (tag: ElementType) => {
    const newItem: Item = { id: Date.now(), type: tag, color: getRandomColor() };
    setItems((prev) => [...prev, newItem]);
  };

  const handleDragStart = (id: number) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (id: number) => {
    if (draggedId === null) return;

    setItems((prev) => {
      const draggedIndex = prev.findIndex((item) => item.id === draggedId);
      const dropIndex = prev.findIndex((item) => item.id === id);

      const updatedItems = [...prev];
      const [draggedItem] = updatedItems.splice(draggedIndex, 1);
      updatedItems.splice(dropIndex, 0, draggedItem);

      return updatedItems;
    });

    setDraggedId(null);
  };

  const handleSelect = (e: MouseEvent, itemId: number) => {
    e.preventDefault();
    const isShift = e.shiftKey;

    setSelectedIds((prev) => {
      if (!isShift) {
        return new Set([itemId]);
      }

      const newSelection = new Set(prev);
      if (newSelection.has(itemId)) {
        newSelection.delete(itemId);
      } else {
        newSelection.add(itemId);
      }
      return newSelection;
    });
  };

  const isSelected = (id: number) => selectedIds.has(id);

  const renderItemTree = (item: Item) => {
    const selected = isSelected(item.id);

    if (item.type === "group") {
      const childrenItems = items.filter((i) => i.parent === item.id);
      return (
        <ViewPortItem
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(item.id)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(item.id)}
          onClick={(e) => handleSelect(e, item.id)}
          $color={item.color}
          $isSelected={selected}
          style={{
            ...item.style,
            display: "flex",
            position: "relative",
            alignItems: "start",
            justifyContent: "start",
          }}>
          <span id="group-title">Group</span>
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              flexDirection: isGroupVertically ? "row" : "column",
              position: "relative",
              width: "100%",
              height: "100%",
            }}>
            {childrenItems.map((child) => renderItemTree(child))}
          </div>
        </ViewPortItem>
      );
    } else {
      return (
        <ViewPortItem
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(item.id)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(item.id)}
          onClick={(e) => handleSelect(e, item.id)}
          $color={item.color}
          $isSelected={selected}>
          {createElement(item.type, null, item.type)}
        </ViewPortItem>
      );
    }
  };

  const topLevelItems = items.filter((i) => i.parent === undefined);

  return (
    <Container>
      <LayPanel>
        <SectionContainer>
          <h3>Align</h3>
          <button onClick={handleChangeVertically}>All Vertically</button>
          <button onClick={handleChangeHorizontally}>All Horizontally</button>
          <button onClick={handleChangeGroupVertically}>Group Vertically</button>
          <button onClick={handleChangeGroupHorizontally}>Group Horizontally</button>
        </SectionContainer>
        <SectionContainer>
          <h3>Add</h3>
          {Object.entries(COMPONENTS).map(([componentName, componentTag]) => (
            <button type="button" key={componentName} onClick={() => handleAdd(componentTag as ElementType)}>
              {componentName}
            </button>
          ))}
        </SectionContainer>
        <div>
          {items.map((item) => (
            <PanelItem
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(item.id)}
              $isSelected={isSelected(item.id)}
              onClick={(e) => handleSelect(e, item.id)}>
              {item.type}
            </PanelItem>
          ))}
        </div>
      </LayPanel>
      <ViewPort $isAllVertically={isAllVertically}>{topLevelItems.map((item) => renderItemTree(item))}</ViewPort>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const LayPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: gray;
  padding: 3px;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  border: 1px solid gray;
  background-color: lightgray;
  gap: 3px;
  padding: 3px 1px;

  h3 {
    font-weight: 600;
    font-size: 20px;
  }

  button {
    width: 100%;
    background-color: white;
    border: 1px solid black;
    padding: 2px;
    margin: 3px 0;
  }
`;

const PanelItem = styled.div<{ $isSelected: boolean }>`
  width: 100%;
  border: ${(props) => (props.$isSelected ? "2px pink solid" : "none")};
  padding: 2px;
  margin-bottom: 3px;
  text-align: left;
  background-color: white;
  cursor: pointer;
`;

const ViewPort = styled.main<{ $isAllVertically: boolean }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.$isAllVertically ? "row" : "column")};
  position: relative;
`;

const ViewPortItem = styled.div<{ $color: string; $isSelected: boolean }>`
  width: 100px;
  height: 200px;
  background-color: ${(props) => props.$color};
  border: ${(props) => (props.$isSelected ? "2px pink solid" : "none")};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;

  #group-title {
    position: absolute;
    z-index: 10;
    font-weight: 600;
    color: pink;
  }
`;
