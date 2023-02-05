import { useAtom } from "jotai";
import React, { useState } from "react";
import { RESET } from "jotai/utils";
import Swal from "sweetalert2";
import styled from "styled-components";
import { SVGIcon } from "../SVGIcon";

const StyledContainer = styled.div``;

const StyledUl = styled.ul`
  padding: 10px;
  margin-top: 10px;

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
  width: 200rem;
  height: 1px;
  background-color: #ddd;
  border: none;
`;
const StyledSearchListUl = styled.ul`
  overflow-y: scroll;
  max-height: 50vh;
  position: absolute;
  top: 12.3rem;
  border-radius: 0.4rem;

  width: calc(100vw - 3rem);
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.2);
`;

const StyledDiv = styled.li`
  display: flex;
  flex-direction: column;
`;
const StyledDeleteButton = styled.button`
  // margin-top: -0.4rem;
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  cursor: pointer;
  color: inherit;
  // position: absolute;
  right: 0;
`;
const StyledAddButton = styled.button`
  border: none;
  font-size: 2rem;
  color: white;
  background: black;
  font-weight: bold;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  border-radius: 0.4rem;
`;

const StyledSearchList = styled.li`
  padding: 0.3rem;
  color: gray;
  background: white;
`;

const StyledInput = styled.input`
  width: calc(100vw - 6rem);
  border: 2px solid #ccc;
  border-radius: 0.4rem;
  height: 2.5rem;
  font-size: 1rem;
`;
const StyledSearchbar = styled.form`
  display: flex;
`;

const StyledContent = styled.div`
  margin: 1.5rem;
  margin-top: 8rem;
`;

const StyledAutoComplete = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledText = styled.div`
  margin-top: 0.5rem;
  width: 96%;
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
      <StyledContent>
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
          <StyledAutoComplete>
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
                          item.name.includes(":")
                            ? item.name.slice(3)
                            : item.name
                        );
                      }}
                    >
                      {item.name.includes(":") ? item.name.slice(3) : item.name}
                    </StyledSearchList>
                  );
                })}
              </StyledSearchListUl>
            )}
          </StyledAutoComplete>

          <StyledAddButton type="submit">+</StyledAddButton>
        </StyledSearchbar>

        {filteredItems.length === 0 && searchInput.length > 0
          ? "No search results"
          : null}
        <StyledContainer>
          <StyledUl>
            {selectedItems.map((selectedItem, index) => {
              return (
                <StyledDiv key={selectedItem.name}>
                  <StyledRow>
                    <StyledText>{selectedItem.name}</StyledText>
                    <StyledDeleteButton
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
                    </StyledDeleteButton>
                  </StyledRow>

                  {index !== items.length - 1 && <Line />}
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
      </StyledContent>
    </>
  );
}
