import { useAtom } from "jotai";
import { useState } from "react";
import { RESET } from "jotai/utils";
import Swal from "sweetalert2";
import styled from "styled-components";

const StyledUl = styled.ul`
  list-style: none;
`;

const StyledSearchList = styled.li`
  list-style: none;
  color: grey;
  max-width: 150px;
`;

export default function Card({ initialItemList, items }) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedItems, setSelectedItems] = useAtom(initialItemList);

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
        Swal.fire("Deleted!", "Your items have been deleted.", "success");
      }
    });
  }

  return (
    <>
      <p>
        Here you can set your allergens and additives you want to avoid in your
        food
      </p>

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
        <ul>
          {filteredItems.map((item) => {
            return (
              <StyledSearchList
                key={item.name}
                onClick={() => {
                  setSearchInput(item.name);
                }}
              >
                {item.name}
              </StyledSearchList>
            );
          })}
        </ul>
      )}

      <StyledUl>
        {selectedItems.map((selectedItem) => {
          return (
            <li key={selectedItem.name}>
              <button
                type="button"
                onClick={() => {
                  const newSelectedItems = selectedItems.filter(
                    (item) => item.name !== selectedItem.name
                  );
                  setSelectedItems(newSelectedItems);
                }}
              >
                x
              </button>
              {selectedItem.name}
            </li>
          );
        })}
      </StyledUl>
      <section>
        <button onClick={deleteAllAlert}>Delete All</button>
      </section>
      <br />
    </>
  );
}
