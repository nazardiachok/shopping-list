import React from "react";
import Product from "./eachProduct";

export default function AllProducts({ filteredData, addToSavedItems }) {
  return (
    <>
      <ul style={{}}>
        {filteredData.map((item) => (
          <Product
            item={item}
            key={item._id}
            id={item._id}
            addToSavedItems={addToSavedItems}
          />
        ))}
      </ul>
    </>
  );
}
/* ми передаємо сюди функцію із App і в неї передаємо аргументб щоб його потім в App витягнути */
