"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalState } from "../../context/globalProvider";
import { arrowUp, arrowDown, check } from "../../utils/icons";
import { TagInterface } from "../../types/prisma.types";

interface MultiselectProps {
  options: TagInterface[];
  selectedOptions: TagInterface[];
  onSelectionChange: (selected: TagInterface[]) => void;
}

export default function Multiselect({
  options,
  selectedOptions,
  onSelectionChange,
}: MultiselectProps) {
  const { theme } = useGlobalState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option: TagInterface) => {
    if (selectedOptions.find((selected) => selected.value === option.value)) {
      onSelectionChange(
        selectedOptions.filter((selected) => selected.value !== option.value)
      );
    } else {
      onSelectionChange([...selectedOptions, option]);
    }
  };

  const removeOption = (option: TagInterface) => {
    const updatedSelectedOptions = selectedOptions.filter(
      (selected) => selected.value !== option.value
    );
    onSelectionChange(updatedSelectedOptions);
  };

  const isSelected = (option: TagInterface) => {
    return selectedOptions.some((selected) => selected.value === option.value);
  };

  return (
    <MultiselectStyled theme={theme}>
      <h3>Tags</h3>
      <div className="multiselect-header" onClick={toggleDropdown}>
        {selectedOptions.length > 0
          ? selectedOptions.map((option) => (
              <div className="selected-option" key={option.value}>
                {option.title}
                <span
                  className="remove-btn"
                  onClick={() => removeOption(option)}
                >
                  &times;
                </span>
              </div>
            ))
          : "Select items"}
        <span className="dropdown-icon">
          {isDropdownOpen ? arrowUp : arrowDown}
        </span>
      </div>

      {isDropdownOpen && (
        <ul className="option-list">
          {options.map((option) => (
            <DropdownListItem
              key={option.value}
              onClick={() => handleOptionClick(option)}
              selected={isSelected(option)}
            >
              {option.title}
              {isSelected(option) && <span className="checkmark">{check}</span>}
            </DropdownListItem>
          ))}
        </ul>
      )}
    </MultiselectStyled>
  );
}

const MultiselectStyled = styled.div`
  width: 100%;

  .multiselect-header {
    display: flex;
    padding: 1rem;
    resize: none;
    background-color: #131313;
    color: #b2becd;
    border-radius: 0.5rem;

    .dropdown-icon {
        position: absolute;
        right: 1.5rem;
    }
  }

  .selected-item {
    display: flex;
    align-items: center;
    background-color: #dfe6e9;
    margin-right: 8px;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .remove-btn {
    margin-left: 8px;
    cursor: pointer;
    color: red;
  }

  .option-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 200px;
    overflow-y: auto;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 10;
  }

  .selected-option {
    display: flex;
    align-items: center;
    background-color: #dfe6e9;
    margin-right: 8px;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .checkmark {
    float: right;
    color: green;
  }

  .
`;

const DropdownListItem = styled.li<{ selected: boolean }>`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#dfe6e9" : "transparent")};

  &:hover {
    background-color: #dfe6e9;
  }
`;
