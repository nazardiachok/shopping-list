import React from "react";
import Product from "./eachProduct";

export default function AllProducts({
  language,
  filteredData,
  addToSavedItems,
}) {
  return (
    <>
      <ul style={{}}>
        {filteredData.map((item) => (
          <Product
            item={item}
            key={item._id}
            id={item._id}
            addToSavedItems={addToSavedItems}
            language={language}
          />
        ))}
      </ul>
    </>
  );
}
/* ми передаємо сюди функцію із App і в неї передаємо аргументб щоб його потім в App і eachProducts витягнути */
