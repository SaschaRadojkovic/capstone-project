import { useAtom } from "jotai";
import { useState } from "react";
import { RESET } from "jotai/utils";
import Swal from "sweetalert2";

export default function Card({ initialItems, items }) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedItems, setSelectedItems] = useAtom(initialItems);

  //   const filteredItems = items.tags.filter((item) =>
  //     item.name.toLowerCase().includes(searchInput.toLowerCase())
  //   );
  const filteredItems = items.tags.filter(
    (item) =>
      !item.name.match(/:.*/) &&
      item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  function deleteAllAlert() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        setSelectedItems(RESET);
        Swal.fire("Deleted!", "Your items has been deleted.", "success");
      }
    });
  }

  return (
    <>
      <button onClick={deleteAllAlert}>Delete All</button>
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
        <label htmlFor="searchBar">searchbar</label>
        <input
          id="searchBar"
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
              <li
                key={item.name}
                style={{
                  listStyle: "none",
                  color: "grey",
                  maxWidth: "150px",
                }}
                onClick={() => {
                  setSearchInput(item.name);
                }}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      )}

      <ul style={{ listStyle: "none" }}>
        {selectedItems.map((selectedItem, index) => {
          return (
            <li key={selectedItem.name}>
              {" "}
              <button
                type="button"
                onClick={() => {
                  const newSelectedItems = selectedItems.filter(
                    (item, i) => i !== index
                  );
                  setSelectedItems(newSelectedItems);
                }}
              >
                x
              </button>{" "}
              {selectedItem.name}{" "}
            </li>
          );
        })}
      </ul>
    </>
  );
}
