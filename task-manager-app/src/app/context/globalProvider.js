"use client";

import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectedTheme];
  
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [tagList, setTagList] = useState([]);
  const { user } = useUser();
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const getTagList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/tags");

      setTagList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRecords = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/records");

      const sortedRecords = response.data.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setRecords(sortedRecords);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRecord = async (record) => {
    try {
      const response = await axios.put("/api/records", record);
      if (response) {
        toast.success("Record updated successfully");
        getAllRecords();
      }
    } catch (error) {
      toast.error("Something went wrong updating record");
      console.log(error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const response = await axios.delete(`/api/records/${id}`);
      if (response) {
        toast.success("Record deleted successfully");
        getAllRecords();
      }
    } catch (error) {
      toast.error("Something went wrong deleting record", error);
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (user) {
      getAllRecords();
      getTagList();
    }
  }, [user]);

  const completedRecords = records.filter((record) => record.isCompleted);
  const importantRecords = records.filter((record) => record.isImportant);
  const upcomingRecords = records.filter((record) => !record.isCompleted);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        records,
        openModal,
        closeModal,
        completedRecords,
        importantRecords,
        upcomingRecords,
        updateRecord,
        deleteRecord,
        isLoading,
        modal,
        getAllRecords,
        tagList,
      }}
    >
      <GlobalUpdateContext.Provider value={{ setSelectedTheme }}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdateState = () => useContext(GlobalUpdateContext);
