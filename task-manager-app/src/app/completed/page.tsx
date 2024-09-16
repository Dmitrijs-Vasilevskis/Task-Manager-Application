"use client";

import React from "react";
import Records from "../components/records/Records";
import { useGlobalState } from "../context/globalProvider";

export default function page() {
    const { theme, completedRecords } = useGlobalState();
  return (
    <Records title="Completed!" records={completedRecords} />
  );
}
