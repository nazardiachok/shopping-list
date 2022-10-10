import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/input";
import AllProducts from "./components/allProducts";
import { search } from "fast-fuzzy";
import { ItemButton } from "./components/eachProduct";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [allData, setallData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [localStorageData, setLocalStorageData] = useLocalStorage(
    "Saved data",
    []
  );

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://fetch-me.vercel.app/api/shopping/items"
      );
      const loadData = await response.json();
      setallData(loadData.data);
    }
    fetchData();
  }, []);

  function filteredList(value) {
    let filtered = search(value, allData, {
      keySelector: (obj) => obj.name.de,
    });
    setFilteredData(filtered);
    console.log(filteredData.map((obj) => obj.name.de));
  }
  function addToSavedItems(item) {
    setSavedItems([...savedItems, item]);
    console.log(savedItems);
    setFilteredData(
      filteredData.filter(
        (savedItem) => savedItem._id !== item._id
      ) /*nachdem wir diese in savedItems gespeichert haben müssen wir sie as filteredData löshen */
    );
    /*  setLocalStorageData([...savedItems, item]); das alte */
  }
  function deleteItems(oneItem) {
    setSavedItems(
      savedItems.filter((savedItem) => savedItem._id !== oneItem._id)
    ); /* "oneItem" ist das gleiche was "savedItem" */
    setFilteredData(
      [
        oneItem,
        ...filteredData,
      ] /*nachdem wir diese aus savedItems gelöscht haben müssen wir sie wieder zurück ins filteredData bringen */
    );
    setLocalStorageData([
      ...localStorageData,
      oneItem,
      /* ${oneItem.id === (localStorageData.map(item => item.id) ? "" : oneItem} */
    ]); /* beim löshen fügen wir diese gleichzeitig zum recently saved */
  }

  return (
    <div className="App">
      <h3>Find what you like!</h3>

      <Form filteredList={filteredList}></Form>

      <h3>Saved to buy:</h3>
      <ul>
        {savedItems.map((oneItem) => (
          <ItemButton onClick={() => deleteItems(oneItem)} key={oneItem._id}>
            {oneItem.name.de}
          </ItemButton>
        ))}
      </ul>

      <h3>Recently saved:</h3>
      {localStorageData.map((item) => (
        <ItemButton>{item.name.de}</ItemButton>
      ))}

      <h3>Filtered List:</h3>
      <AllProducts
        filteredData={filteredData}
        addToSavedItems={addToSavedItems}
      />
    </div>
  );
}

export default App;
