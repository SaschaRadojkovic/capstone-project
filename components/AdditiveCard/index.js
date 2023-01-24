import { atom, useAtom } from "jotai";
import { useState } from "react";
import additives from "../../additives.json";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const initialAdditives = atomWithStorage("additives", [], {
  ...createJSONStorage(() => localStorage),
  delayInit: true,
});

export default function AdditiveCard() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedAdditives, setSelectedAdditives] = useAtom(initialAdditives);

  const filteredAdditives = additives.tags.filter((additive) =>
    additive.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const data = Object.fromEntries(formData);
          setSearchInput("");
          const selectedAdditive = filteredAdditives.find(
            (additive) => additive.name === data.list
          );
          if (
            //makes reselection impossible
            selectedAdditive &&
            !selectedAdditives.find(
              (item) => item.name === selectedAdditive.name
            )
          )
            setSelectedAdditives([...selectedAdditives, selectedAdditive]);
        }}
      >
        {/* <div>{filteredAdditives.length}</div> */}
        <input
          name="search"
          type="text"
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>
      {filteredAdditives.length === 0 && searchInput.length > 0
        ? "No search results"
        : null}
      {searchInput.length > 0 && (
        <ul style={{ position: "relative" }}>
          {filteredAdditives.map((additive) => {
            return (
              <div
                key={additive.name}
                style={{
                  position: "absolut",
                  marginLeft: "-40px",
                  color: "grey",
                  maxWidth: "150px",
                }}
                onClick={() => {
                  setSearchInput(additive.name);
                }}
              >
                {additive.name}
              </div>
            );
          })}
        </ul>
      )}
      <ul style={{ listStyle: "none" }}>
        {selectedAdditives.map((selectedAdditive) => {
          return <li key={selectedAdditive.name}>{selectedAdditive.name} </li>;
        })}
      </ul>
    </>
  );
}
