"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useGlobalState } from "../../context/globalProvider";
import Multiselect from "../multiselect/Multiselect";
import { xmark } from "../../utils/icons";
import { TagInterface } from "../../types/prisma.types";

export default function CreateRecord() {
  const { theme, getAllRecords, closeModal, tagList } = useGlobalState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [selectedTagOptions, setSelectedTagOptions] = useState<TagInterface[]>(
    []
  );

  const onSelectionChange = (selected: TagInterface[]) => {
    setSelectedTagOptions(selected);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const tags = selectedTagOptions.map((tag) => tag.value);

    const record = {
      title,
      description,
      date,
      isCompleted,
      isImportant,
      tags: tags,
    };

    try {
      const response = await axios.post("api/records", record);
      if (response.data.error) {
        toast.error(response.data.error);
      }

      if (!response.data.error) {
        toast.success("Task created successfully.");
        getAllRecords();
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong with:" + error);
    }
  };

  return (
    <CreateRecordStyled theme={theme} onSubmit={handleSubmit}>
      <div className="header">
        <h1>Create Record</h1>
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
          <span>Create record</span>
        </button>
      </div>
    </CreateRecordStyled>
  );
}

const CreateRecordStyled = styled.form`
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
