"use client";
import React, { createContext, useEffect } from "react";
import { GlobalProvider } from "../context/globalProvider";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return null;
  }


  return (
    <GlobalProvider>
      <Toaster />
      {children}
    </GlobalProvider>
  );
}

export default ContextProvider;
