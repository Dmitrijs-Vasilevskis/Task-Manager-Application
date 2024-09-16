"use client";

import React, { useState } from "react";
import { useGlobalState } from "../../context/globalProvider";
import styled from "styled-components";
import { xmark } from "../../utils/icons";
import { TagInterface } from "../../types/prisma.types";
import Multiselect from "../multiselect/Multiselect";

interface RecordProps {
  record: {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    isImportant: boolean;
    id: string;
    tags: string[];
  };
  closeModal: () => void;
}

export default function UpdateRecord({ record, closeModal }: RecordProps) {
  const { theme, updateRecord, tagList } = useGlobalState();

  const [title, setTitle] = useState(record.title);
  const [description, setDescription] = useState(record.description);
  const [date, setDate] = useState(record.date);
  const [isCompleted, setIsCompleted] = useState(record.isCompleted);
  const [isImportant, setIsImportant] = useState(record.isImportant);
  const [tags, setTags] = useState(record.tags);
  const [selectedTagOptions, setSelectedTagOptions] = useState<TagInterface[]>(
    tagList.filter((tag: TagInterface) => tags.includes(tag.value))
  );
  const { id } = record;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const updatedTags = selectedTagOptions.map((tag) => tag.value);

    updateRecord({
      id,
      title,
      description,
      date,
      isCompleted,
      isImportant,
      tags: updatedTags,
    });
    closeModal();
  };

  const onSelectionChange = (selected: TagInterface[]) => {
    setSelectedTagOptions(selected);
  };

  return (
    <UpdateRecordStyled theme={theme} onSubmit={handleSubmit}>
      <div className="header">
        <h1>Update Record</h1>
        <button onClick={closeModal}>{xmark}</button>
      </div>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <input
          type="textarea"
          id="decription"
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          name="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="input-control">
        <Multiselect
          options={tagList}
          selectedOptions={selectedTagOptions}
          onSelectionChange={onSelectionChange}
        />
      </div>
      <div className="input-container">
        <div className="input-control checkbox">
          <label htmlFor="isCompleted">Completed:</label>
          <input
            type="checkbox"
            id="isCompleted"
            value={isCompleted.toString()}
            name="isCompleted"
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
        </div>
        <div className="input-control checkbox">
          <label htmlFor="isImportant">Important:</label>
          <input
            type="checkbox"
            id="isImportant"
            value={isImportant.toString()}
            name="isImportant"
            onChange={(e) => setIsImportant(e.target.checked)}
          />
        </div>
      </div>
      <div className="submit-btn flex justify-end">
        <button type="submit" name="Create record">
          <span>Update record</span>
        </button>
      </div>
    </UpdateRecordStyled>
  );
}

const UpdateRecordStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-container {
    display: flex;
    .checkbox {
      display: flex;
      width: 50%;

      label {
        margin-bottom: 0;
      }

      input {
        align-self: center;
      }
    }
  }

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;
    padding: 0.4rem;
    border-radius: 1rem;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;
