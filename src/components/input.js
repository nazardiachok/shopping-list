export default function Form({ filteredList }) {
  return (
    <input type="text" onChange={(event) => filteredList(event.target.value)} />
  );
}
/* ми передаємо сюди функцію із App і в неї передаємо аргументб щоб його потім в App витягнути */
