import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/input";
import AllProducts from "./components/allProducts";
import { search } from "fast-fuzzy";
import { ItemButton } from "./components/eachProduct";

function App() {
  const [allData, setallData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

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
  }
  function deleteItems(oneItem) {
    setSavedItems(
      savedItems.filter((savedItem) => savedItem._id !== oneItem._id)
    ); /* "oneItem" ist das gleiche was "savedItem" */
  }

  return (
    <div className="App">
      <h3>Find what you like</h3>
      <ul>
        {savedItems.map((oneItem) => (
          <ItemButton onClick={() => deleteItems(oneItem)} key={oneItem._id}>
            {oneItem.name.de}
          </ItemButton>
        ))}
      </ul>

      <Form filteredList={filteredList}></Form>
      <AllProducts
        filteredData={filteredData}
        addToSavedItems={addToSavedItems}
      />
    </div>
  );
}

export default App;
