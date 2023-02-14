import React, { useState } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import { SVGIcon } from "../SVGIcon";
import useSWR from "swr";

const StyledUl = styled.ul`
  padding: 10px;
  margin-top: 10px;
  list-style: none;
  background: white;
  overflow-y: scroll;
  max-height: 25vh;
  width: 100%;
  min-width: 300px;
  border-radius: 0.4rem;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
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
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
`;

const StyledDiv = styled.li`
  display: flex;
  flex-direction: column;
`;
const StyledDeleteButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  cursor: pointer;
  color: inherit;
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
`;

const StyledText = styled.div`
  margin-top: 0.5rem;
  width: 96%;
`;

const StyledButtonWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.div`
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  cursor: pointer;
  color: inherit;
`;

export { StyledDeleteButton };

export default function Card({ items, alertOptions, alertSuccess, model }) {
  const [searchInput, setSearchInput] = useState("");

  const { data: storedModel, mutate: changeModel } = useSWR(`/api/${model}`);

  async function handleSaveItem(item) {
    try {
      await fetch(`/api/${model}`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      });
      changeModel();
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleDeleteItem(id) {
    try {
      await fetch(`/api/${model}/${id}`, {
        method: "DELETE",
      });
      changeModel();
    } catch (error) {
      console.error(error.message);
    }
  }
  async function handleDeleteAll(model) {
    try {
      await fetch(`/api/${model}`, {
        method: "DELETE",
      });
      changeModel();
    } catch (error) {
      console.error(error.message);
    }
  }

  const filteredItems = items.tags.filter(
    (item) =>
      !item.name.match(/:.*/) &&
      item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  function deleteAllAlert() {
    Swal.fire({
      title: "Sind Sie sicher?",
      text: "Sie können das nicht rückgängig machen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ja, löschen!",
      cancelButtonText: "abbrechen",
      ...alertOptions,
    }).then((result) => {
      if (result.value) {
        handleDeleteAll(model);
        Swal.fire({
          title: "Gelöscht!",
          text: "Your items have been deleted.",
          icon: "success",
          ...alertSuccess,
        });
      }
    });
  }

  return (
    <>
      <StyledContent>
        <p>Wählen Sie Ihre Allergene und Additive</p>

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
              !storedModel.find((item) => item.name === selectedItem.name)
            )
              handleSaveItem(selectedItem);
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

          <StyledAddButton aria-label="add" type="submit">
            +
          </StyledAddButton>
        </StyledSearchbar>

        {filteredItems.length === 0 && searchInput.length > 0
          ? "No search results"
          : null}
        <div>
          {storedModel && storedModel.length > 0 && (
            <StyledUl>
              {storedModel.map((selectedItem, index) => {
                return (
                  <StyledDiv key={selectedItem.name}>
                    <StyledRow>
                      <StyledText>{selectedItem.name}</StyledText>
                      <StyledDeleteButton
                        aria-label="delete items"
                        variant="delete"
                        width="30px"
                        type="button"
                        onClick={() => {
                          handleDeleteItem(selectedItem._id);
                        }}
                      >
                        <SVGIcon variant="delete" width="26px" />
                      </StyledDeleteButton>
                    </StyledRow>

                    {index !== storedModel.length - 1 && <Line />}
                  </StyledDiv>
                );
                {
                }
              })}
            </StyledUl>
          )}
        </div>

        <StyledButtonWrapper>
          <StyledButton
            aria-label="delete all"
            type="button"
            onClick={deleteAllAlert}
          >
            <SVGIcon variant="deleteAll" width="60px" />
          </StyledButton>
        </StyledButtonWrapper>
      </StyledContent>
    </>
  );
}
