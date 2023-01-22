import { useState } from "react";
import allergens from "../../allergens.json";

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedAllergens, setSelectedAllergenes] = useState([]);

  const filteredAllergens = allergens.tags.filter(
    (allergen) => allergen.name.indexOf(searchInput) === 0
  );

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const data = Object.fromEntries(formData);
          setSearchInput(data.list);
          const selectedAllergen = filteredAllergens.find(
            (allergen) => allergen.name === data.list
          );
          if (
            selectedAllergen &&
            !selectedAllergens.find(
              (item) => item.name === selectedAllergen.name
            )
          )
            setSelectedAllergenes([...selectedAllergens, selectedAllergen]);
        }}
      >
        <input
          name="list"
          type="text"
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>
      {filteredAllergens.length === 0 && searchInput.length > 0
        ? "No search results"
        : null}
      {searchInput.length > 0 && (
        <ul style={{ position: "relative" }}>
          {filteredAllergens
            .filter((allergen) => allergen.name.includes(searchInput))
            .map((allergen, name) => {
              return (
                <div
                  key={name}
                  style={{
                    position: "absolut",
                    marginLeft: "-40px",
                    color: "grey",
                    maxWidth: "150px",
                  }}
                  onClick={() => {
                    setSearchInput(allergen.name);
                  }}
                >
                  {allergen.name}
                </div>
              );
            })}
        </ul>
      )}
      <ul style={{ listStyle: "none" }}>
        {selectedAllergens.map((selectedAllergen, name) => {
          return <li key={name}>{selectedAllergen.name} </li>;
        })}
      </ul>
    </>
  );
}
