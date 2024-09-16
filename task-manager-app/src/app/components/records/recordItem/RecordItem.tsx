"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import formatDate from "../../../utils/formatDate";
import { useGlobalState } from "../../../context/globalProvider";
import { edit, trash, tag } from "../../../utils/icons";
import UpdateRecord from "../../modal/UpdateRecord";
import Modal from "../../modal/Modal";
import { RecordInterface, TagInterface } from "../../../types/prisma.types";
import axios from "axios";

interface Props {
  record: RecordInterface;
}

export default function RecordItem({ record }: Props) {
  const { id, title, description, date, isCompleted, tags } = record;
  const { updateRecord, deleteRecord, theme, tagList } = useGlobalState();
  const [tagIsLoaded, setTagIsLoaded] = useState(false);
  const [recordTags, setRecordTags] = useState<TagInterface[]>([]);

  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const getRecordTags = async () => {
    try {
      const params = new URLSearchParams();
      tags.forEach((tag) => params.append("tag", tag));

      const response = await axios.get(`api/tags?${params}`);

      if (response.data) {
        setRecordTags(response.data);
        setTagIsLoaded(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (newState: boolean) => () =>
    updateRecord({ ...record, isCompleted: newState });

  const handleDelete = () => deleteRecord(id);

  useEffect(() => {
    if (tags.length) getRecordTags();
  }, [tagIsLoaded]);

  return (
    <RecordItemStyled theme={theme}>
      {modal && (
        <Modal
          closeModal={closeModal}
          content={<UpdateRecord record={record} closeModal={closeModal} />}
        />
      )}
      <h3>{title}</h3>
      <p className="main-content">{description}</p>
      <div className="secondary-content">
        <div className="tags">
          {tagIsLoaded &&
            recordTags.map((recordTag) => (
              <span key={recordTag.id}>
                {tag} {recordTag.title}
              </span>
            ))}
        </div>
        <p className="date">{formatDate(date)}</p>
      </div>
      <div className="footer">
        <button
          className={isCompleted ? "completed" : "incomplete"}
          onClick={handleClick(!isCompleted)}
        >
          {isCompleted ? "Complete" : "Incomplete"}
        </button>
        <button className="edit" onClick={openModal}>
          {edit}
        </button>
        <button className="delete" onClick={handleDelete}>
          {trash}
        </button>
      </div>
    </RecordItemStyled>
  );
}

const RecordItemStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colorBg};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .main-content {
    flex: 1;
  }

  .secondary-content {
    display: flex;
    flex-direction: row;
    padding: 0.5rem 0;
    justify-content: space-between;
    align-items: center;

    .tags {
      flex: 1;

      span {
        border: 2px solid ${(props) => props.theme.colorBg};
        border-radius: 1rem;
        padding: 0.2rem 0.5rem;
        margin-right: 0.5rem;
        font-size: 1rem;
        font-weight: 400;
        color: ${(props) => props.theme.colorGrey2};
      }
    }
  }

  .date {
  }

  > h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`;
