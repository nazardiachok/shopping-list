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
    "Saved data:",
    []
  );
  const [language, setLanguage] = useState("de");

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
      keySelector: (obj) => /* obj.name.de */ {
        return language === "de" ? obj.name.de : obj.name.en;
      },
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
    ]); /* beim löshen fügen wir diese gleichzeitig zum recently saved */
  }
  function deutch() {
    setLanguage("de");
  }
  function english() {
    setLanguage("en");
  }

  return (
    <div className="App">
      <ItemButton
        onClick={deutch}
        style={{ backgroundColor: `${language === "de" ? "green" : ""}` }}
      >
        DE
      </ItemButton>
      <ItemButton
        onClick={english}
        style={{ backgroundColor: `${language === "en" ? "green" : ""}` }}
      >
        {" "}
        EN
      </ItemButton>
      <h3>
        {language === "de"
          ? "Suche was du kaufen willst:"
          : "Find what you want:"}
      </h3>

      <Form filteredList={filteredList}></Form>

      <h3>{language === "de" ? "Gespeichert im Korb:" : "Saved to buy:"}</h3>
      <ul>
        {savedItems.map((oneItem) => (
          <ItemButton onClick={() => deleteItems(oneItem)} key={oneItem._id}>
            {/* {oneItem.name.de} */}{" "}
            {language === "de" ? oneItem.name.de : oneItem.name.en}
          </ItemButton>
        ))}
      </ul>

      <h3>{language === "de" ? "Vorher gespeichert:" : "Recently saved:"}</h3>

      {localStorageData.map((item) => (
        <ItemButton>
          {/* {item.name.de} */}
          {language === "de" ? item.name.de : item.name.en},
        </ItemButton>
      ))}

      <h3>{language === "de" ? "Gefilterte Liste:" : "Filtered List:"}</h3>
      <AllProducts
        language={language}
        filteredData={filteredData}
        addToSavedItems={addToSavedItems}
      />
    </div>
  );
}

export default App;
