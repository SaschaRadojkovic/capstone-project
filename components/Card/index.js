import { useAtom } from "jotai";
import React, { useState } from "react";
import { RESET } from "jotai/utils";
import Swal from "sweetalert2";
import styled from "styled-components";
import { SVGIcon } from "../SVGIcon";
// import lbImg from "../../public/lb.jpg";
const StyledUl = styled.ul`
  z-index: 2;
  padding: 0;
  padding-top: 10px;
  // margin: 1rem, 1rem;
  // margin-top: 1rem;
  margin-left: 3rem;
  // margin-right: -3rem;
  list-style: none;
  background: white;
  overflow-y: scroll;
  max-height: 350px;
  width: 100%;
  min-width: 320px;
  border-radius: 0.4rem;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.2);
  overflow-x: hidden;
`;

const Line = styled.hr`
  // margin-top: 0rem;
  width: 200rem;
  height: 1px;
  background-color: #ddd;
  border: none;
`;
const StyledSearchListUl = styled.ul`
  border-radius: 0.2rem;
  width: 79.5%;
  margin-left: -0.1rem;
  margin-top: 0.4rem;
  background: white;
  height: 100px;
  // width: 190px;
  overflow-y: scroll;
  opacity: 0.8;
`;
const StyledSearchList = styled.li`
  margin-left: -40px;
  list-style: none;
  color: grey;
  width: 20rem;
  background: white;
`;

const StyledDiv = styled.div`
  display: flex;
  gap: 14px;
  grid-template-columns: 1fr 1fr;
  position: relative;
`;
const StyledButton = styled.button`
  margin-top: -0.4rem;
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  cursor: pointer;
  color: inherit;
  position: absolute;

  right: 0;
`;
const StyledAddButton = styled.button`
  margin-left: 11rem;
  margin-top: -2rem;
`;

const StyledInput = styled.input`
  width: 80%;
  padding: 12px 20px;

  border: 2px solid #ccc;
  border-radius: 0.4rem;
  font-size: 16px;
`;
const StyledSearchbar = styled.form`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
      <p>Wähle deine Allergene und Additive</p>

      <StyledSearchbar
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

        <StyledInput
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
        <StyledAddButton type="submit">
          <span>➕</span>
        </StyledAddButton>
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
      </StyledSearchbar>

      {filteredItems.length === 0 && searchInput.length > 0
        ? "No search results"
        : null}

      <StyledUl>
        {selectedItems.map((selectedItem, index) => {
          return (
            <StyledDiv key={selectedItem.name}>
              <li key={selectedItem.name}></li>
              <li>
                {selectedItem.name} {index !== items.length - 1 && <Line />}
              </li>

              <StyledButton
                variant="delete"
                width="30px"
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
                <SVGIcon variant="delete" width="26px" />
              </StyledButton>
            </StyledDiv>
          );
          {
          }
        })}
      </StyledUl>
      <section>
        <button onClick={deleteAllAlert}>Alle Löschen</button>
      </section>
      <br />
    </>
  );
}
