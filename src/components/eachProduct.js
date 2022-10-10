import React from "react";
import styled from "styled-components";
export default function Product({ item, addToSavedItems, language }) {
  return (
    <ul style={{ listStyle: "none" }}>
      <ItemButton onClick={() => addToSavedItems(item)}>
        {/* {item.name.de} */}
        {language === "de" ? item.name.de : item.name.en}
      </ItemButton>
    </ul>
  );
}

export const ItemButton = styled.button`
  margin: 10px;
  cursor: pointer;
`;
/* ми передаємо сюди функцію із App(навіть ше не створену) і в неї передаємо аргументб щоб його потім в App витягнути */
