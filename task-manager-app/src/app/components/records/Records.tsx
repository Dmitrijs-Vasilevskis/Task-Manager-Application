"use client";
import React from "react";
import styled from "styled-components";
import { useGlobalState } from "../../context/globalProvider";
import RecordItem from "./recordItem/RecordItem";
import Modal from "../modal/Modal";
import CreateRecord from "../modal/CreateRecord";
import { plus, add } from "../../utils/icons";
import { RecordInterface } from "../../types/prisma.types";

interface RecordProps {
  title: string;
  records: RecordInterface[];
}

export default function Records({ title, records }: RecordProps) {
  const { theme, modal, isLoading, openModal, closeModal } = useGlobalState();

  return (
    <StyledRecords theme={theme}>
      {modal && <Modal content={<CreateRecord />} closeModal={closeModal} />}
      <button className="btn-rounded" onClick={openModal}>
        {plus}
      </button>
      <h1>{title}</h1>
      <div className="records grid">
        {records.map((record) => (
          <RecordItem key={record.id} record={{ ...record }} />
        ))}
        <button className="create-record" onClick={openModal}>
          {add}
          Add New Task
        </button>
      </div>
    </StyledRecords>
  );
}

const StyledRecords = styled.main`
  position: relative;
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .btn-rounded {
    position: fixed;
    top: 4.9rem;
    right: 5.1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    background-color: ${(props) => props.theme.colorBg};
    border: 2px solid ${(props) => props.theme.borderColor2};
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
      top: 3rem;
      right: 3.5rem;
    }
  }

  .records {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    width: max-content;
    font-weight: 800;
    position: relative;
    margin-bottom: 1.5rem;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-record {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;
