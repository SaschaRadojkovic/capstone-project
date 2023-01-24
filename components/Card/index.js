import { useAtom } from "jotai";
import { useState } from "react";

export default function Card({ initialItems, items }) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedItems, setSelectedItems] = useAtom(initialItems);

  const filteredItems = items.tags.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const data = Object.fromEntries(formData);
          setSearchInput("");
          const selectedItem = filteredItems.find(
            (item) => item.name === data.search
          );

          if (
            //makes reselection impossible
            selectedItem &&
            !selectedItems.find((item) => item.name === selectedItem.name)
          )
            setSelectedItems([...selectedItems, selectedItem]);
        }}
      >
        <input
          autoComplete="off"
          name="search"
          type="text"
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>
      {filteredItems.length === 0 && searchInput.length > 0
        ? "No search results"
        : null}
      {searchInput.length > 0 && (
        <ul style={{ position: "relative" }}>
          {filteredItems.map((item) => {
            return (
              <div
                key={item.name}
                style={{
                  position: "absolut",
                  marginLeft: "-40px",
                  color: "grey",
                  maxWidth: "150px",
                }}
                onClick={() => {
                  setSearchInput(item.name);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </ul>
      )}
      <ul style={{ listStyle: "none" }}>
        {selectedItems.map((selectedItem) => {
          return <li key={selectedItem.name}>{selectedItem.name} </li>;
        })}
      </ul>
    </>
  );
}
