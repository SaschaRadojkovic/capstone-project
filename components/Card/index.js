import { useAtom } from "jotai";
import React, { useState } from "react";
import { RESET } from "jotai/utils";
import Swal from "sweetalert2";
import styled from "styled-components";
// import lbImg from "../../public/lb.jpg";
const StyledUl = styled.ul`
  padding: 10px;
  padding-top: 10px;
  margin: 10px;
  list-style: none;
  background: white;
  overflow-y: scroll;
  max-height: 350px;
  max-width: 610px;
  min-width: 550px;
  border-radius: 5px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.2);
`;

const Line = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #ddd;
  border: none;
`;
const StyledSearchListUl = styled.ul`
  margin-top: 0;
  background: white;
  height: 100px;
  width: 190px;
  overflow-y: scroll;
  opacity: 0.8;
`;
const StyledSearchList = styled.li`
  margin-left: -40px;
  list-style: none;
  color: grey;
  width: 150px;
  background: white;
`;

const StyledInput = styled.input``;

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
      <p>Wähle deine Allergene und Additive</p>

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
        {/* input section */}
        <label htmlFor="searchBar"></label>
        <input
          placeholder="🔍"
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
        {searchInput.length > 0 && (
          // Search Preview
          <StyledSearchListUl>
            {filteredItems.map((item) => {
              return (
                <StyledSearchList
                  key={item.name}
                  onClick={() => {
                    setSearchInput(
                      item.name.includes(":") ? item.name.slice(3) : item.name
                    );
                  }}
                >
                  {item.name.includes(":") ? item.name.slice(3) : item.name}
                </StyledSearchList>
              );
            })}
          </StyledSearchListUl>
        )}
      </form>
      {filteredItems.length === 0 && searchInput.length > 0
        ? "No search results"
        : null}

      <StyledUl>
        {selectedItems.map((selectedItem, index) => {
          return (
            <div key={selectedItem.name}>
              <li key={selectedItem.name}>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedItems.length === 1) {
                      setSelectedItems(RESET);
                    } else {
                      const newSelectedItems = selectedItems.filter(
                        (item) => item.name !== selectedItem.name
                      );
                      setSelectedItems(newSelectedItems);
                    }
                  }}
                >
                  x
                </button>
                {selectedItem.name}
              </li>
              {index !== items.length - 1 && <Line />}
            </div>
          );
          {
          }
        })}
      </StyledUl>
      <section>
        <button onClick={deleteAllAlert}>Delete All</button>
      </section>
      <br />
    </>
  );
}
