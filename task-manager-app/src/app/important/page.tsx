"use client";

import React from "react";
import { useGlobalState } from "../context/globalProvider";
import styled from "styled-components";
import Records from "../components/records/Records";

function page() {
  const { theme, importantRecords } = useGlobalState();

  return <Records title="Important!" records={importantRecords} />;
}

const importantStyled = styled.div``;

export default page;
