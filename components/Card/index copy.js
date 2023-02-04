import { useAtom } from "jotai";
import React, { useState } from "react";
import { RESET } from "jotai/utils";
import Swal from "sweetalert2";
import styled from "styled-components";
import { SVGIcon } from "../SVGIcon";
// import lbImg from "../../public/lb.jpg";

const StyledContainer = styled.div`
  display: flex;
`;

const StyledUl = styled.ul`
  // position: relative;
  // justify-content: flex-end;
  z-index: 0;

  padding: 10px;
  // margin: 1rem, 1rem;
  // margin-top: 1rem;
  margin: 2rem;
  // margin-left: 3.5rem;
  // margin-right: 3.5rem;

  list-style: none;
  background: white;
  overflow-y: scroll;
  max-height: 350px;
  width: 100%;
  min-width: 300px;
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
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.2);

  margin-right: 2rem;
  z-index: 2;
  position: absolute;
  border-radius: 0.2rem;
  width: 88%;
  margin-left: -4.9rem;
  margin-top: 3.2rem;
  background: white;
  max-height: 50vh;
  // width: 190px;
  overflow-y: scroll;
  //
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
  background: none;
  border: none;
  padding: 0;
`;

const StyledSearchList = styled.li`
  width: 100%;
  // grid-column: 1 / 3;
  margin: 5px;
  list-style: none;
  color: grey;

  background: white;
`;

const StyledInput = styled.input`
  margin-left: -3.8rem;
  width: 88%;
  border: 2px solid #ccc;
  border-radius: 0.4rem;
`;
const StyledSearchbar = styled.form`
  width: 100%;
  flex-grow: 1;
  justify-content: center;
  margin-left: 2rem;
  margin-right: 2rem;

  // margin-top: 6rem;
  display: flex;
  flex-direction: row;
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
          list="dliste"
          id="searchBar"
          autoComplete="off"
          name="search"
          type="text"
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
        />

        {searchInput.length > 0 && (
          // Search Preview
          <StyledSearchListUl id="dliste">
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

        <StyledAddButton type="submit">
          <SVGIcon variant="add" width="50px" />
        </StyledAddButton>
      </StyledSearchbar>

      {filteredItems.length === 0 && searchInput.length > 0
        ? "No search results"
        : null}
      <StyledContainer>
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
      </StyledContainer>

      <section>
        <button onClick={deleteAllAlert}>Alle Löschen</button>
      </section>
      <br />
    </>
  );
}
