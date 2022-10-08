import React from "react";
import styled from "styled-components";
export default function Product({ item, addToSavedItems }) {
  return (
    <ul style={{ listStyle: "none" }}>
      <ItemButton onClick={() => addToSavedItems(item)}>
        {item.name.de}
      </ItemButton>
    </ul>
  );
}

export const ItemButton = styled.button`
  margin: 10px;
  cursor: pointer;
`;
/* ми передаємо сюди функцію із App(навіть ше не створену) і в неї передаємо аргументб щоб його потім в App витягнути */
