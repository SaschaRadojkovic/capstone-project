import { useAtom, atom } from "jotai";
import { useState } from "react";
import allergens from "../../allergens.json";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const initialAllergenes = atomWithStorage("allergenes", [], {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});
export default function AllergenCard() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedAllergens, setSelectedAllergens] = useAtom(initialAllergenes);

  const filteredAllergens = allergens.tags.filter(
    (allergen) =>
      allergen.name.toLowerCase().indexOf(searchInput.toLowerCase()) === 0
  );

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const data = Object.fromEntries(formData);
          setSearchInput(data.list);
          setSearchInput("");
          const selectedAllergen = filteredAllergens.find(
            (allergen) => allergen.name === data.list
          );
          if (
            //makes reselection impossible
            selectedAllergen &&
            !selectedAllergens.find(
              (item) => item.name === selectedAllergen.name
            )
          )
            setSelectedAllergens([...selectedAllergens, selectedAllergen]);
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
          {filteredAllergens.map((allergen) => {
            return (
              <div
                key={allergen.name}
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
        {selectedAllergens.map((selectedAllergen) => {
          return <li key={selectedAllergen.name}>{selectedAllergen.name} </li>;
        })}
      </ul>
    </>
  );
}
